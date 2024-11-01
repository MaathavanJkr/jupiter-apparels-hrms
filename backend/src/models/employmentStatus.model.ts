import { RowDataPacket } from "mysql2";
import db from "../database/database";
import { Output } from "./output.model";

enum EmployementStatus {
  Intern_Fulltime = "Intern-Fulltime",
  Intern_Parttime = "Intern-Parttime",
  Contract_Fulltime = "Contract-Fulltime",
  Contract_Parttime = "Contract-Parttime",
  Parttime = "Permanent",
  Freelance = "Freelance",
}

export interface EmploymentStatus extends RowDataPacket {
  employment_status_id: string;
  status: EmployementStatus;
}

export const getEmploymentStatusByIDModel = async (
  id: string
): Promise<Output> => {
  try {
    const [result] = await db
      .promise()
      .query<RowDataPacket[][]>("CALL GetEmploymentStatusByID(?)", [id]);

    if (Array.isArray(result) && result.length === 0) {
      throw {
        data: null,
        error: "Employment status not found",
        message: null,
      };
    } else {
      return {
        data: (result[0] as EmploymentStatus[])[0],
        error: null,
        message: null,
      };
    }
  } catch (error) {
    throw {
      data: null,
      error: error,
      message: "Database Query Failed",
    };
  }
};

export const getAllEmploymentStatusesModel = async (): Promise<Output> => {
  try {
    const [result] = await db
      .promise()
      .query<RowDataPacket[][]>("CALL GetAllEmploymentStatuses()");
    return {
      data: result[0] as EmploymentStatus[],
      error: null,
      message: null,
    };
  } catch (error) {
    throw {
      data: null,
      error,
      message: "Database Query Failed",
    };
  }
};
