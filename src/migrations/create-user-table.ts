// migrations/20241222_create_users_table.ts

import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Your database URL from .env
});

async function runMigration() {
  const client = await pool.connect();

  try {
    await client.query('BEGIN'); // Start a transaction

    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        firstName VARCHAR(100) NOT NULL,
        lastName VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        address TEXT,
        phone VARCHAR(20)
      );
    `;

    // Run the SQL query
    await client.query(createTableQuery);

    // Commit the transaction
    await client.query('COMMIT');
    console.log('Migration ran successfully!');
  } catch (err) {
    await client.query('ROLLBACK'); // Rollback on error
    console.error('Error running migration:', err);
  } finally {
    client.release(); // Release the database client
  }
}

runMigration().catch((err) => console.error('Error:', err));
