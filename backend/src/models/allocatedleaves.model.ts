import { RowDataPacket } from "mysql2";
import db from "../database/database";
import { Output } from "./output.model";

export interface AllocatedLeaves extends RowDataPacket {
  pay_grade_id?: string;
  annual_leaves: number;
  casual_leaves: number;
  maternity_leaves: number;
  no_pay_leaves: number;
}

export const createAllocatedLeavesModel = async (
  allocatedLeaves: AllocatedLeaves
): Promise<Output> => {
  const { annual_leaves, casual_leaves, maternity_leaves, no_pay_leaves } =
    allocatedLeaves;

  if (
    annual_leaves == null ||
    casual_leaves == null ||
    maternity_leaves == null ||
    no_pay_leaves == null
  ) {
    throw { error: "Missing required fields", data: null, message: null };
  }

  try {
    await db
      .promise()
      .query("CALL createAllocatedLeaves(?, ?, ?, ?)", [
        annual_leaves,
        casual_leaves,
        maternity_leaves,
        no_pay_leaves,
      ]);
    return {
      data: allocatedLeaves,
      message: "Allocated leaves created successfully",
      error: null,
    };
  } catch (error) {
    throw { error, message: "Database Query Failed", data: null };
  }
};

export const getAllocatedLeavesByPayGradeModel = async (
  pay_grade_id: string
): Promise<Output> => {
  try {
    const [result] = await db
      .promise()
      .query<RowDataPacket[][]>("CALL getAllocatedLeavesByPayGrade(?)", [
        pay_grade_id,
      ]);

    if (Array.isArray(result) && result.length === 0) {
      return { data: null, error: "Allocated leaves not found", message: null };
    } else {
      return {
        data: (result[0] as AllocatedLeaves[])[0],
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

export const getAllAllocatedLeavesModel = async (): Promise<Output> => {
  try {
    const [result] = await db
      .promise()
      .query<RowDataPacket[][]>("CALL getAllAllocatedLeaves()");
    return { data: result[0] as AllocatedLeaves[], error: null, message: null };
  } catch (error) {
    return {
      data: null,
      error,
      message: "Database Query Failed",
    };
  }
};

export const updateAllocatedLeavesModel = async (
  allocatedLeaves: AllocatedLeaves
): Promise<Output> => {
  const {
    pay_grade_id,
    annual_leaves,
    casual_leaves,
    maternity_leaves,
    no_pay_leaves,
  } = allocatedLeaves;

  if (
    !pay_grade_id ||
    annual_leaves == null ||
    casual_leaves == null ||
    maternity_leaves == null ||
    no_pay_leaves == null
  ) {
    throw { error: "Missing required fields", data: null, message: null };
  }

  try {
    await db
      .promise()
      .query("CALL updateAllocatedLeaves(?, ?, ?, ?, ?)", [
        pay_grade_id,
        annual_leaves,
        casual_leaves,
        maternity_leaves,
        no_pay_leaves,
      ]);
    return {
      message: "Allocated leaves updated successfully",
      error: null,
      data: allocatedLeaves,
    };
  } catch (error) {
    throw { error, message: "Database Query Failed", data: null };
  }
};

export const deleteAllocatedLeavesModel = async (
  pay_grade_id: string
): Promise<Output> => {
  if (!pay_grade_id) {
    throw { error: "Missing required fields", data: null, message: null };
  }

  try {
    await db.promise().query("CALL deleteAllocatedLeaves(?)", [pay_grade_id]);
    return {
      message: "Allocated leaves deleted successfully",
      error: null,
      data: { id: pay_grade_id },
    };
  } catch (error) {
    throw { error, message: "Database Query Failed", data: null };
  }
};
