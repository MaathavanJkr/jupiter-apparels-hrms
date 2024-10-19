// src/models/payrollInfoView.model.ts
import { RowDataPacket } from "mysql2";
import db from "../database/database";
import { Output } from "./output.model";

export interface PayrollInfo extends RowDataPacket {
  employee_id: string;
  employee_name: string;
  job_title: string;
  pay_grade: string;
  number_of_dependents: number;
}

export const getAllPayrollInfoModel = async (): Promise<Output> => {
  try {
    const [result] = await db
      .promise()
      .query<RowDataPacket[][]>("CALL GetAllPayrollInfo()");
    return { data: result[0] as PayrollInfo[], error: null, message: null };
  } catch (error) {
    return {
      data: null,
      error,
      message: "Database Query Failed",
    };
  }
};

export const getPayrollInfoByEmployeeIDModel = async (
  employee_id: string
): Promise<Output> => {
  try {
    const [result] = await db
      .promise()
      .query<RowDataPacket[][]>("CALL GetPayrollInfoByEmployeeID(?)", [
        employee_id,
      ]);
    return {
      data: (result[0] as PayrollInfo[])[0],
      error: null,
      message: null,
    };
  } catch (error) {
    return {
      data: null,
      error,
      message: "Database Query Failed",
    };
  }
};
