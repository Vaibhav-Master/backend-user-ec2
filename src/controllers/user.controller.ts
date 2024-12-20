import { Request, Response } from "express";
import { USER } from "../type/user.type";
import { createUser, getAllUser } from "../models/user.model";

export const addUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { firstName, lastName, address, email, phone } = req.body;

    // Validation
    if (!firstName || !lastName || !address || !email || !phone) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      res.status(400).json({ message: "Invalid email format" });
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      res.status(400).json({ message: "Phone number must be 10 digits" });
      return;
    }

    const user: USER = { firstName, lastName, address, email, phone };
    await createUser(user);

    res.status(201).json({ message: "User added successfully" });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUsers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const users = await getAllUser();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
