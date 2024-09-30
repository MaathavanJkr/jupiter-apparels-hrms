// src/controllers/userController.ts
import { Request, Response } from "express";
import db from "../database/database";
import { Organization } from "../models/organization.model";
import { ResultSetHeader } from "mysql2";

export const createOrganization = async (req: Request, res: Response) => {
    const { name, address, reg_no } = req.body;
    try {
        const [result] = await db
          .promise()
          .query(
            "INSERT INTO organizations (organization_id,name, address, reg_no) VALUES (UUID(),?, ?, ?)",
            [name, address, reg_no]
          );
        res.status(201).json({ id: (result as ResultSetHeader).insertId, message: "Organization created" });
      } catch (error) {
        res.status(500).json({ error: "Database query failed", message: error });
      }
}

export const getOrganizations = async (req: Request, res: Response) => {
  try {
    const [organizations] = await db
      .promise()
      .query<Organization[]>("SELECT * FROM organizations");
    res.status(200).json(organizations);
  } catch (error) {
    res.status(500).json({ error: "Database query failed", message: error });
  }
};

export const getOrganizationByID = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const [organizations] = await db
          .promise()
          .query<Organization[]>("SELECT * FROM organizations WHERE id = ?", id);

        res.status(200).json(organizations[0]);
      } catch (error) {
        res.status(500).json({ error: "Database query failed", message: error });
      }
}

export const updateOrganization = async (req: Request, res: Response) => {
    const id = req.params.id;
    const { name, address, reg_no } = req.body;
    try {
        await db
          .promise()
          .query(
            "UPDATE organizations SET name = ?, address = ?, reg_no = ? WHERE id = ?",
            [name, address, reg_no, id]
          );
        res.status(200).json({ message: "Organization updated" });
      } catch (error) {
        res.status(500).json({ error: "Database query failed", message: error });
      }
}


export const deleteOrganization = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const [result] = await db
          .promise()
          .query("DELETE FROM organizations WHERE id = ?", id);
        res.status(200).json({ id: result, message: `Organization with id: ${id} deleted` });
      } catch (error) {
        res.status(500).json({ error: "Database query failed", message: error });
      }
}