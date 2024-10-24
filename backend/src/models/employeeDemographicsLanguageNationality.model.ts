// src/models/employeeDemographicsLanguageNationality.model.ts
import { RowDataPacket } from "mysql2";
import db from "../database/database";
import { Output } from "./output.model";

export interface EmployeeDemographics extends RowDataPacket {
  cust_attr_1_value: string;
  cust_attr_3_value: string;
  employee_count: number;
}

// Function to get employee demographics grouped by nationality and preferred language
export const getEmployeeDemographicsModel = async (): Promise<Output> => {
  try {
    const [result] = await db
      .promise()
      .query<RowDataPacket[][]>("CALL GetEmployeeDemographics()");
    return {
      data: result[0] as EmployeeDemographics[],
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

// Function to get employee demographics by nationality and preferred language
export const getEmployeeDemographicsByLangAndNatModel = async (
  nationality: string,
  language: string
): Promise<Output> => {
  try {
    const [result] = await db
      .promise()
      .query<RowDataPacket[][]>(
        "CALL GetEmployeeDemographicsByLangAndNat(?, ?)",
        [nationality, language]
      );
    return {
      data: result[0] as EmployeeDemographics[],
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
