// src/controllers/employeesGroupedByJobTitleDepartmentPayGradeView.controller.ts
import { Request, Response } from "express";
import {
  getEmployeesGroupedByJobTitleModel,
  getEmployeesGroupedByJobTitleIDModel,
} from "../models/employeesGroupedByJobTitleDepartmentPayGradeView.model";

// Get employees grouped by job title, department, and pay grade
export const getEmployeesGroupedByJobTitle = async (
  req: Request,
  res: Response
) => {
  await getEmployeesGroupedByJobTitleModel()
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};

// Get employees grouped by specific job title
export const getEmployeesGroupedByJobTitleID = async (
  req: Request,
  res: Response
) => {
  const { jobTitle } = req.params;

  await getEmployeesGroupedByJobTitleIDModel(jobTitle)
    .then((result) => {
      if (!result.data) {
        return res.status(404).json({ error: "Job title not found" });
      }
      return res.status(200).json(result);
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};
