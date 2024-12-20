import { Router } from "express";
import { addUser, getUsers } from "../controllers/user.controller";

const router = Router();

router.post("/user", addUser); // POST /user
router.get("/users", getUsers); // GET /users

export default router;
