import { RowDataPacket } from "mysql2";
import db from "../database/database";
import { hashPassword } from "../utils/hashPassword";
import { Output } from "./output.model";
import { v4 as uuidv4 } from "uuid";

export interface User extends RowDataPacket {
  user_id: string;
  employee_id: string;
  role: string;
  username: string;
  password: string;
}

// Some Procedures are not implemented in the database
// Some Procedures are not implemented in the database
// Some Procedures are not implemented in the database
// Some Procedures are not implemented in the database

export const createUserModel = async (user: User): Promise<Output> => {
  const { employee_id, role, username, password } = user;
  user.user_id = uuidv4();

  if (!employee_id || !role || !username || !password) {
    throw { error: "Missing required fields", data: null, message: null };
  }

  const hashedPassword = await hashPassword(password);

  try {
    await db
      .promise()
      .query("CALL CreateUser(?, ?, ?, ?, ?)", [
        user.user_id,
        employee_id,
        role,
        username,
        hashedPassword || "password",
      ]);
    return {
      message: "User created successfully",
      error: null,
      data: user,
    };
  } catch (error) {
    console.log(error)
    throw { error, message: "Database Query Failed", data: null };
  }
};

export const getUserByIDModel = async (id: string): Promise<Output> => {
  try {
    const [result] = await db
      .promise()
      .query<RowDataPacket[][]>("CALL GetUserByID(?)", [id]);

    if (Array.isArray(result) && result.length === 0) {
      return { data: null, error: "User not found", message: null };
    } else {
      return {
        data: (result[0] as User[])[0],
        error: null,
        message: null,
      };
    }
  } catch (error) {
    throw { data: null, error, message: "Database Query Failed" };
  }
};

export const getUserByUsernameModel = async (
  username: string
): Promise<Output> => {
  try {
    const [result] = await db
      .promise()
      .query<RowDataPacket[][]>("CALL GetUserByUsername(?)", [username]);
    if (Array.isArray(result) && result.length === 0) {
      return { data: null, error: "User not found", message: null };
    } else {
      return {
        data: (result[0] as User[])[0],
        error: null,
        message: null,
      };
    }
  } catch (error) {
    throw { data: null, error, message: "Database Query Failed" };
  }
};

export const getAllUsersModel = async (): Promise<Output> => {
  try {
    const [result] = await db
      .promise()
      .query<RowDataPacket[][]>("CALL GetAllUsers()");

    if (Array.isArray(result) && result.length === 0) {
      return { data: null, error: "No users found", message: null };
    } else {
      return {
        data: result[0] as User[],
        error: null,
        message: null,
      };
    }
  } catch (error) {
    throw { data: null, error, message: "Database Query Failed" };
  }
};

export const updateUserModel = async (user: User): Promise<Output> => {
  const { user_id, role, username } = user;

  if (!user_id  || !role || !username) {
    throw { error: "Missing required fields", data: null, message: null };
  }

  try {
    await db
      .promise()
      .query("CALL UpdateUser(?, ?, ?)", [
        user_id,
        role,
        username,
      ]);
    return {
      message: "User updated successfully",
      error: null,
      data: user,
    };
  } catch (error) {
    throw { error, message: "Database Query Failed", data: null };
  }
};

export const deleteUserModel = async (id: string): Promise<Output> => {
  try {
    await db.promise().query("CALL DeleteUser(?)", [id]);
    return { data: null, error: null, message: "User deleted successfully" };
  } catch (error) {
    throw { data: null, error, message: "Database Query Failed" };
  }
};

export const ChangePasswordModel = async (id: string, new_password: string): Promise<Output> => {
  if (!new_password) {
    throw { error: "Missing required fields", data: null, message: null };
  }
  try {
    await db
    .promise()
    .query("CALL ChangePassword(?, ?)", [id, new_password]);
    return {
      message: "Password changed successfully",
      error: null,
      data: null,
    };
  } catch (error) { 
    throw { error, message: "Database Query Failed", data: null };
  }
}

