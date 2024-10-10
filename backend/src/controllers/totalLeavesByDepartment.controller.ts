// src/controllers/totalLeavesByDepartmentView.controller.ts
import { Request, Response } from "express";
import {
    getTotalLeavesByDepartmentModel,
    getTotalLeavesByDepartmentIDModel,
} from "../models/totalLeavesByDepartmentView.model";

// Get total leaves by department
export const getTotalLeavesByDepartment = async (req: Request, res: Response) => {
    await getTotalLeavesByDepartmentModel()
        .then((result) => {
            return res.status(200).json(result);
        })
        .catch((error) => {
            return res.status(500).json({ error });
        });
};

// Get total leaves by department ID
export const getTotalLeavesByDepartmentID = async (req: Request, res: Response) => {
    const { departmentId } = req.params;

    await getTotalLeavesByDepartmentIDModel(departmentId)
        .then((result) => {
            if (!result.data) {
                return res.status(404).json({ error: "Department not found" });
            }
            return res.status(200).json(result);
        })
        .catch((error) => {
            return res.status(500).json({ error });
        });
};
