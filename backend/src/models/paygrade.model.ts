import { RowDataPacket } from "mysql2";
import db from "../database/database";
import { v4 as uuidv4 } from "uuid";
import { Output } from "./output.model";

export interface PayGrade extends RowDataPacket {
  pay_grade_id?: string;
  paygrade: number;
  grade_name: string;
}

export const createPayGradeModel = async (
    payGrade: PayGrade
): Promise<Output> => {
  const { paygrade, grade_name } = payGrade;

  payGrade.pay_grade_id = uuidv4();

  if (!paygrade || !grade_name) {
    return { error: "Missing required fields", data: null, message: null };
  }

  try {
    await db
        .promise()
        .query("CALL CreatePayGrade(?, ?, ?)", [payGrade.pay_grade_id, paygrade, grade_name]);
    return {
      data: payGrade,
      message: "Pay grade created successfully",
      error: null,
    };
  } catch (error) {
    return { error: error, message: "Database Query Failed", data: null };
  }
};

export const getPayGradeByIDModel = async (id: string): Promise<Output> => {
  try {
    const [result] = await db
        .promise()
        .query("CALL GetPayGradeByID(?)", [id]);

    if (Array.isArray(result) && result.length === 0) {
      return { data: null, error: "Pay grade not found", message: null };
    } else {
      return {
        data: (result as PayGrade[])[0],
        error: null,
        message: null,
      };
    }
  } catch (error) {
    return {
      data: null,
      error: error,
      message: "Database Query Failed",
    };
  }
};

export const getAllPayGradesModel = async (): Promise<Output> => {
  try {
    const [result] = await db.promise().query("CALL GetAllPayGrades()");
    return { data: result as PayGrade[], error: null, message: null };
  } catch (error) {
    return {
      data: null,
      error,
      message: "Database Query Failed",
    };
  }
};

export const updatePayGradeModel = async (
    payGrade: PayGrade
): Promise<Output> => {
  const { pay_grade_id, paygrade, grade_name } = payGrade;

  if (!pay_grade_id || !paygrade || !grade_name) {
    return { error: "Missing required fields", data: null, message: null };
  }

  try {
    await db
        .promise()
        .query("CALL UpdatePayGrade(?, ?, ?)", [pay_grade_id, paygrade, grade_name]);
    return {
      message: "Pay grade updated successfully",
      error: null,
      data: payGrade,
    };
  } catch (error) {
    return { error, message: "Database Query Failed", data: null };
  }
};

export const deletePayGradeModel = async (
    pay_grade_id: string
): Promise<Output> => {
  if (!pay_grade_id) {
    return { error: "Missing required fields", data: null, message: null };
  }

  try {
    await db
        .promise()
        .query("CALL DeletePayGrade(?)", [pay_grade_id]);
    return {
      message: "Pay grade deleted successfully",
      error: null,
      data: { id: pay_grade_id },
    };
  } catch (error) {
    return { error, message: "Database Query Failed", data: null };
  }
};
