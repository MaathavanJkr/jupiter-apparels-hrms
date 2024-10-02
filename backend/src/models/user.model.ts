import { ResultSetHeader, RowDataPacket } from "mysql2";
import db from "../database/database";
import { hashPassword } from "../utils/hashPassword";

export interface User extends RowDataPacket {
  user_id: string;
  employee_id: string;
  role: string;
  username: string;
  password: string;
}

export const createUserModel = async (user: User) => {
  const { employee_id, role, username, password } = user;

  if (!employee_id || !role || !username || !password) {
    return { error: "Missing required fields" };
  }
  const hashedPassword = hashPassword(password);

  try {
    const [result] = await db
      .promise()
      .query(
        "INSERT INTO users (user_id, employee_id, role, username, password) VALUES(UUID(),?,?,?,?)",
        [employee_id, role, username, hashedPassword]
      );
    return {
      id: (result as ResultSetHeader).insertId,
      message: "User created successfully",
      error: null,
    };
  } catch (error) {
    return { error: "Database Query Failed", message: error };
  }
};

export const getUserByUsernameModel = async (username: string) => {
  try {
    const [result] = await db
      .promise()
      .query("SELECT * FROM users WHERE username = ?", [username]);
    return { user: (result as User[])[0], error: null };
  } catch (error) {
    return { user: null, error: "Database Query Failed", message: error };
  }
};
