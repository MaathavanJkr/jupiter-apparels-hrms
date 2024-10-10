// src/controllers/employeesGroupedByDepartmentView.controller.ts
import { Request, Response } from "express";
import {
    getAllEmployeesGroupedByDepartmentModel,
    getEmployeesGroupedByDepartmentIDModel,
} from "../models/employeesGroupedByDepartmentView.model";

// Get all employees grouped by department
export const getAllEmployeesGroupedByDepartment = async (req: Request, res: Response) => {
    await getAllEmployeesGroupedByDepartmentModel()
        .then((result) => {
            return res.status(200).json(result);
        })
        .catch((error) => {
            return res.status(500).json({ error });
        });
};

// Get employees grouped by department ID
export const getEmployeesGroupedByDepartmentID = async (req: Request, res: Response) => {
    const { departmentId } = req.params;

    await getEmployeesGroupedByDepartmentIDModel(departmentId)
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
