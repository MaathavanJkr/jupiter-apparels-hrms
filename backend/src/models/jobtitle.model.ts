import { RowDataPacket } from "mysql2";
import db from "../database/database";
import { v4 as uuidv4 } from "uuid";
import { Output } from "./output.model";

export interface JobTitle extends RowDataPacket {
  job_title_id?: string;
  title: string;
}

export const createJobTitleModel = async (
  jobTitle: JobTitle
): Promise<Output> => {
  const { title } = jobTitle;

  jobTitle.job_title_id = uuidv4();

  if (!title) {
    return { error: "Missing required fields", data: null, message: null };
  }

  try {
    await db
      .promise()
      .query("CALL CreateJobTitle(?, ?)", [jobTitle.job_title_id, title]);
    return {
      data: jobTitle,
      message: "Job title created successfully",
      error: null,
    };
  } catch (error) {
    return { error: error, message: "Database Query Failed", data: null };
  }
};

export const getJobTitleByIDModel = async (id: string): Promise<Output> => {
  try {
    const [result] = await db
      .promise()
      .query<RowDataPacket[][]>("CALL GetJobTitleByID(?)", [id]);

    if (Array.isArray(result) && result.length === 0) {
      return { data: null, error: "Job title not found", message: null };
    } else {
      return {
        data: (result[0] as JobTitle[])[0],
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

export const getAllJobTitlesModel = async (): Promise<Output> => {
  try {
    const [result] = await db
      .promise()
      .query<RowDataPacket[][]>("CALL GetAllJobTitles()");
    return { data: result[0] as JobTitle[], error: null, message: null };
  } catch (error) {
    return {
      data: null,
      error,
      message: "Database Query Failed",
    };
  }
};

export const updateJobTitleModel = async (
  jobTitle: JobTitle
): Promise<Output> => {
  const { job_title_id, title } = jobTitle;

  if (!job_title_id || !title) {
    return { error: "Missing required fields", data: null, message: null };
  }

  try {
    await db
      .promise()
      .query("CALL UpdateJobTitle(?, ?)", [job_title_id, title]);
    return {
      message: "Job title updated successfully",
      error: null,
      data: jobTitle,
    };
  } catch (error) {
    return { error, message: "Database Query Failed", data: null };
  }
};

export const deleteJobTitleModel = async (
  job_title_id: string
): Promise<Output> => {
  if (!job_title_id) {
    return { error: "Missing required fields", data: null, message: null };
  }

  try {
    await db.promise().query("CALL DeleteJobTitle(?)", [job_title_id]);
    return {
      message: "Job title deleted successfully",
      error: null,
      data: { id: job_title_id },
    };
  } catch (error) {
    return { error, message: "Database Query Failed", data: null };
  }
};
