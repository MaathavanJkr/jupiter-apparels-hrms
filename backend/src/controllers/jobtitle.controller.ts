// src/controllers/userController.ts
import { Request, Response } from "express";
import db from "../database/database";
import { JobTitle } from "../models/jobtitle.model";
import { ResultSetHeader } from "mysql2";

export const createJobTitle = async (req: Request, res: Response) => {
    const { job_title_id,title } = req.body;
    try {
        const [result] = await db
          .promise()
          .query(
            "INSERT INTO job_titles (job_title_id,title) VALUES (?, ?)",
            [job_title_id,title]
          );
        res.status(201).json({ id: (result as ResultSetHeader).insertId, message: "Job title created" });
      } catch (error) {
        res.status(500).json({ error: "Database query failed", message: error });
      }
}

export const getJobTitle = async (req: Request, res: Response) => {
  try {
    const [jobtitle] = await db
      .promise()
      .query<JobTitle[]>("SELECT * FROM job_titles");
    res.status(200).json(jobtitle);
  } catch (error) {
    res.status(500).json({ error: "Database query failed", message: error });
  }
};

export const getJobTitleByID = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const [jobtitle] = await db
          .promise()
          .query<JobTitle[]>("SELECT * FROM job_titles WHERE id = ?", id);

        res.status(200).json(jobtitle[0]);
      } catch (error) {
        res.status(500).json({ error: "Database query failed", message: error });
      }
}

export const updateJobTitle = async (req: Request, res: Response) => {
    const id = req.params.id;
    const { job_title_id,title } = req.body;
    try {
        await db
          .promise()
          .query(
            "UPDATE job_titles SET job_title_id = ?, title = ? WHERE id = ?",
            [job_title_id,title, id]
          );
        res.status(200).json({ message: "Job title updated" });
      } catch (error) {
        res.status(500).json({ error: "Database query failed", message: error });
      }
}


export const deleteJobTitle = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const [result] = await db
          .promise()
          .query("DELETE FROM job_titles WHERE id = ?", id);
        res.status(200).json({ id: result, message: `Organization with id: ${id} deleted` });
      } catch (error) {
        res.status(500).json({ error: "Database query failed", message: error });
      }
}
