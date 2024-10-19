import { RowDataPacket } from "mysql2";
import db from "../database/database";
import { hashPassword } from "../utils/hashPassword";
import { Output } from "./output.model";

export interface User extends RowDataPacket {
  user_id: string;
  employee_id: string;
  role: string;
  username: string;
  password: string;
}

export const createUserModel = async (user: User): Promise<Output> => {
  const { employee_id, role, username, password } = user;

  if (!employee_id || !role || !username || !password) {
    return { error: "Missing required fields", data: null, message: null };
  }
  const hashedPassword = hashPassword(password);

  try {
    await db
      .promise()
      .query("CALL CreateUser(?, ?, ?, ?)", [
        employee_id,
        role,
        username,
        hashedPassword,
      ]);
    return {
      message: "User created successfully",
      error: null,
      data: user,
    };
  } catch (error) {
    return { error, message: "Database Query Failed", data: null };
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
    return { data: null, error, message: "Database Query Failed" };
  }
};
