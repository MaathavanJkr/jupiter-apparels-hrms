import { Request, Response } from "express";
import bcrypt from "bcryptjs";


// Need to Implement the below functions

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

export const getUsers = async (req: Request, res: Response) => {
  res.status(200).json({ message: "All users found" });
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
 
