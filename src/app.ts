import express, { Application } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import userRoutes from "./routes/user.route";

const app: Application = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mount routes
app.use("/", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
