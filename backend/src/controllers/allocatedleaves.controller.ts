// src/controllers/userController.ts
import { Request, Response } from "express";
import db from "../database/database";
import { AllocatedLeaves } from "../models/allocatedleaves.model";
import { ResultSetHeader } from "mysql2";

export const createAllocatedLeaves = async (req: Request, res: Response) => {
    const { pay_grade_id,annual_leaves,casual_leaves,maternity_leaves,no_pay_leaves } = req.body;
    try {
        const [result] = await db
          .promise()
          .query(
            "INSERT INTO allocated_leaves (pay_grade_id,annual_leaves,casual_leaves,maternity_leaves,no_pay_leaves) VALUES (?, ?, ?, ?, ?)",
            [pay_grade_id,annual_leaves,casual_leaves,maternity_leaves,no_pay_leaves]
          );
        res.status(201).json({ id: (result as ResultSetHeader).insertId, message: "Allocated leave record created" });
      } catch (error) {
        res.status(500).json({ error: "Database query failed", message: error });
      }
}

export const getAllocatedLeaves = async (req: Request, res: Response) => {
  try {
    const [allocatedleaves] = await db
      .promise()
      .query<AllocatedLeaves[]>("SELECT * FROM allocated_leaves");
    res.status(200).json(allocatedleaves);
  } catch (error) {
    res.status(500).json({ error: "Database query failed", message: error });
  }
};

export const getAllocatedLeavesByID = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const [allocatedleaves] = await db
          .promise()
          .query<AllocatedLeaves[]>("SELECT * FROM allocated_leaves WHERE id = ?", id);

        res.status(200).json(allocatedleaves[0]);
      } catch (error) {
        res.status(500).json({ error: "Database query failed", message: error });
      }
}

export const updateAllocatedLeaves = async (req: Request, res: Response) => {
    const id = req.params.id;
    const { pay_grade_id,annual_leaves,casual_leaves,maternity_leaves,no_pay_leaves } = req.body;
    try {
        await db
          .promise()
          .query(
            "UPDATE allocated_leaves SET pay_grade_id = ? ,annual_leaves = ? ,casual_leaves = ? ,maternity_leaves = ? ,no_pay_leaves = ? WHERE id = ?",
            [pay_grade_id,annual_leaves,casual_leaves,maternity_leaves,no_pay_leaves,id]
          );
        res.status(200).json({ message: "Allocated leave record updated" });
      } catch (error) {
        res.status(500).json({ error: "Database query failed", message: error });
      }
}


export const deleteAllocaedLeaves = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const [result] = await db
          .promise()
          .query("DELETE FROM allocated_leaves WHERE id = ?", id);
        res.status(200).json({ id: result, message: `Allocated leave record with id: ${id} deleted` });
      } catch (error) {
        res.status(500).json({ error: "Database query failed", message: error });
      }
}