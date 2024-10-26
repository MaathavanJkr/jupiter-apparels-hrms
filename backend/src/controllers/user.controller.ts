import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import {getAllUsersModel} from "../models/user.model";



export const createUser = async (req: Request, res: Response) => {
  const { employee_id, role, username, password } = req.body;

  if (!employee_id || !role || !username || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  console.log(hashedPassword);

  res.status(200).json({ message: "User created successfully" });
};

export const getUserByID = async (req: Request, res: Response) => {
  const id = req.params.id;

  res.status(200).json({ message: `User with id: ${id} found` });
};



export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await getAllUsersModel(); // Fetch the user data from the model

    // Check if the result is in the expected format
    if (Array.isArray(result.data)) {
      res.status(200).json({ users: result.data }); // Send the users as response
    } else {
      res.status(404).json({ error: "Users not found" });
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};



export const updateUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { employee_id, role, username, password } = req.body;

  if (!employee_id || !role || !username || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  res.status(200).json({ message: `User with id: ${id} updated successfully` });
};

export const deleteUser = async (req: Request, res: Response) => {
  const id = req.params.id;

  res.status(200).json({ message: `User with id: ${id} deleted successfully` });
};

export const changePassword = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { old_password, new_password } = req.body;

  if (!old_password || !new_password) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  res.status(200).json({ message: `Password changed successfully for ${id}` });
};

// Need to Implement the above functions
 
