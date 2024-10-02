import { ResultSetHeader, RowDataPacket } from "mysql2";
import bcrypt from "bcryptjs";
import db from "../database/database";

export interface User extends RowDataPacket {
  user_id: string;
  employee_id: string;
  role: string;
  username: string;
  password: string;
}

const createUserModel = async (user: User) => {
  const { employee_id, role, username, password } = user;

  if (!employee_id || !role || !username || !password) {
    return { error: "Missing required fields" };
  }
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

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
      error: null
    };
  } catch (error) {
    return { error: "Database Query Failed", message: error };
  }
};
