// src/controllers/userController.ts
import { Request, Response } from "express";
import db from "../database/database";
import { LeaveApplication } from "../models/leaveapplication.model";
import { ResultSetHeader } from "mysql2";

export const createLeaveApplication = async (req: Request, res: Response) => {
    const {application_id,employee_id,leave_type,start_date,end_date,reason,submission_date,status,response_date } = req.body;
    try {
        const [result] = await db
          .promise()
          .query(
            "INSERT INTO leave_applications (application_id,employee_id,leave_type,start_date,end_date,reason,submission_date,status,response_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [application_id,employee_id,leave_type,start_date,end_date,reason,submission_date,status,response_date]
          );
        res.status(201).json({ id: (result as ResultSetHeader).insertId, message: "Leave application created" });
      } catch (error) {
        res.status(500).json({ error: "Database query failed", message: error });
      }
}

export const getLeaveApplications = async (req: Request, res: Response) => {
  try {
    const [leaveapplication] = await db
      .promise()
      .query<LeaveApplication[]>("SELECT * FROM leave_applications");
    res.status(200).json(leaveapplication);
  } catch (error) {
    res.status(500).json({ error: "Database query failed", message: error });
  }
};

export const getLeaveApplicationByID = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const [leaveapplication] = await db
          .promise()
          .query<LeaveApplication[]>("SELECT * FROM leave_applications WHERE id = ?", id);

        res.status(200).json(leaveapplication[0]);
      } catch (error) {
        res.status(500).json({ error: "Database query failed", message: error });
      }
}

export const updateLeaveApplication = async (req: Request, res: Response) => {
    const id = req.params.id;
    const { application_id,employee_id,leave_type,start_date,end_date,reason,submission_date,status,response_date } = req.body;
    try {
        await db
          .promise()
          .query(
            "UPDATE leave_applications SET application_id = ?, employee_id = ?, leave_type = ?, start_date = ?, end_date = ?, reason = ?, submission_date = ?, status = ?, response_date = ? WHERE id = ?",
            [application_id,employee_id,leave_type,start_date,end_date,reason,submission_date,status,response_date, id]
          );
        res.status(200).json({ message: "Leave application updated" });
      } catch (error) {
        res.status(500).json({ error: "Database query failed", message: error });
      }
}


export const deleteLeaveApplication = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const [result] = await db
          .promise()
          .query("DELETE FROM leave_applications WHERE id = ?", id);
        res.status(200).json({ id: result, message: `Leave application with id: ${id} deleted` });
      } catch (error) {
        res.status(500).json({ error: "Database query failed", message: error });
      }
}
