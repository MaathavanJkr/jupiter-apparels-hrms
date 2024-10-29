// src/controllers/usedLeavesView.controller.ts
import { Request, Response } from "express";
import {
  getEmployeesByDepartmentIDModel,
  getReportsByGroupModel,
  getTotalLeavesByDepartmentForPeriodModel,
  reportGroups,
} from "../models/report.model";
import { validateDateString } from "../utils/validateData";

export const getEmployeesByDepartment = async (req: Request, res: Response) => {
  const { id } = req.params;

  await getEmployeesByDepartmentIDModel(id)
    .then((result) => {
      if (!result.data) {
        return res
          .status(404)
          .json({ error: "Used leaves information not found" });
      }
      return res.status(200).json(result);
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};

export const getTotalLeavesByDepartmentForPeriod = async (
  req: Request,
  res: Response
) => {
  const start_date = req.query.start_date as string;
  const end_date = req.query.end_date as string;

  if (
    !start_date ||
    !end_date ||
    !validateDateString(start_date) ||
    !validateDateString(end_date)
  ) {
    return res
      .status(400)
      .json({ error: "Invalid date format. Please use YYYY-MM-DD." });
  }

  await getTotalLeavesByDepartmentForPeriodModel(start_date, end_date)
    .then((result) => {
      if (!result.data) {
        return res
          .status(404)
          .json({ error: "Used leaves information not found" });
      }
      return res.status(200).json(result);
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};

export const getReportByGroup = async (req: Request, res: Response) => {
  const group = req.query.group as string;
  if (!group || !reportGroups.includes(group)) {
    return res.status(400).json({
      error: "Invalid group. Please use Department, JobTitle, or PayGrade.",
    });
  }

  await getReportsByGroupModel(group)
    .then((result) => {
      if (!result.data) {
        return res
          .status(404)
          .json({ error: "Report By Group Data not found" });
      }
      return res.status(200).json(result);
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};
