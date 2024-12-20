import pool from "../database";
import { USER } from "../type/user.type";

export const createUser = async (user: USER): Promise<void> => {
  const query = ` INSERT INTO users(first_name,last_name,address,email,phone)
                VALUES ($1,$2,$3,$4,$5)`;
  const values = [
    user.firstName,
    user.lastName,
    user.address,
    user.email,
    user.phone,
  ];
  await pool.query(query, values);
};

export const getAllUser = async (): Promise<USER[]> => {
  const query = `SELECT * from users`;
  const result = await pool.query(query);
  return result.rows;
};
