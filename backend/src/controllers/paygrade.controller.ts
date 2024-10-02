// src/controllers/userController.ts
import { Request, Response } from "express";
import db from "../database/database";
import { PayGrade } from "../models/paygrade.model";
import { ResultSetHeader } from "mysql2";

export const createPayGrade = async (req: Request, res: Response) => {
    const { pay_grade_id,paygrade,grade_name } = req.body;
    try {
        const [result] = await db
          .promise()
          .query(
            "INSERT INTO pay_grades (pay_grade_id,paygrade,grade_name) VALUES (?, ?, ?)",
            [pay_grade_id,paygrade,grade_name]
          );
        res.status(201).json({ id: (result as ResultSetHeader).insertId, message: "Pay grade created" });
      } catch (error) {
        res.status(500).json({ error: "Database query failed", message: error });
      }
}

export const getPayGrade = async (req: Request, res: Response) => {
  try {
    const [paygrade] = await db
      .promise()
      .query<PayGrade[]>("SELECT * FROM pay_grades");
    res.status(200).json(paygrade);
  } catch (error) {
    res.status(500).json({ error: "Database query failed", message: error });
  }
};

export const getPayGradeByID = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const [paygrade] = await db
          .promise()
          .query<PayGrade[]>("SELECT * FROM pay_grades WHERE id = ?", id);

        res.status(200).json(paygrade[0]);
      } catch (error) {
        res.status(500).json({ error: "Database query failed", message: error });
      }
}

export const updatePayGrade = async (req: Request, res: Response) => {
    const id = req.params.id;
    const { pay_grade_id,paygrade,grade_name } = req.body;
    try {
        await db
          .promise()
          .query(
            "UPDATE pay_grades SET pay_grade_id = ?, paygrade = ?, grade_name = ? WHERE id = ?",
            [pay_grade_id,paygrade,grade_name, id]
          );
        res.status(200).json({ message: "Pay grade updated" });
      } catch (error) {
        res.status(500).json({ error: "Database query failed", message: error });
      }
}


export const deletePayGrade = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const [result] = await db
          .promise()
          .query("DELETE FROM pay_grades WHERE id = ?", id);
        res.status(200).json({ id: result, message: `Pay grade with id: ${id} deleted` });
      } catch (error) {
        res.status(500).json({ error: "Database query failed", message: error });
      }
}
