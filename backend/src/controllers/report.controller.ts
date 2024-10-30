// src/controllers/usedLeavesView.controller.ts
import { Request, Response } from "express";
import {
  getEmployeesByDepartmentIDModel,
  getEmployeesByEmploymentStatusIDModel,
  getEmployeesByJobTitleIDModel,
  getEmployeesByPayGradeIDModel,
  getReportsByCustomAttributeModel,
  getTotalLeavesByDepartmentForPeriodModel,
  reportGroups,
} from "../models/report.model";
import { validateDateString } from "../utils/validateData";
import { getAllDepartmentsModel } from "../models/department.model";
import { getAllJobTitlesModel } from "../models/jobtitle.model";
import { getAllPayGradesModel } from "../models/paygrade.model";
import { getAllEmploymentStatusesModel } from "../models/employmentStatus.model";

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
      error:
        "Invalid group. Please use Department, JobTitle, EmploymentStatus or PayGrade.",
    });
  }

  if (group == "Department") {
    await getAllDepartmentsModel()
      .then(async (result) => {
        const departments = result.data;

        const departmentReports = await Promise.all(
          departments.map(
            async (department: { department_id: string; name: string }) => {
              const employees = await getEmployeesByDepartmentIDModel(
                department.department_id
              );
              return {
                name: department.name,
                employees: employees.data,
              };
            }
          )
        );

        return res.status(200).json({
          data: departmentReports,
          error: null,
          message: null,
        });
      })
      .catch((error) => {
        return res.status(500).json({ error });
      });
  } else if (group == "JobTitle") {
    await getAllJobTitlesModel()
      .then(async (result) => {
        const jobTitles = result.data;
        console.log(jobTitles)
        const jobTitleReports = await Promise.all(
          jobTitles.map(
            async (jobTitle: { job_title_id: string; title: string }) => {
              const employees = await getEmployeesByJobTitleIDModel(
                jobTitle.job_title_id
              );
              return {
                name: jobTitle.title,
                employees: employees.data,
              };
            }
          )
        );

        return res.status(200).json({
          data: jobTitleReports,
          error: null,
          message: null,
        });
      })
      .catch((error) => {
        return res.status(500).json({ error });
      });
  } else if (group == "PayGrade") {
    await getAllPayGradesModel()
      .then(async (result) => {
        const payGrades = result.data;

        const payGradeReports = await Promise.all(
          payGrades.map(
            async (payGrade: { pay_grade_id: string; grade_name: string }) => {
              const employees = await getEmployeesByPayGradeIDModel(
                payGrade.pay_grade_id
              );
              return {
                name: payGrade.grade_name,
                employees: employees.data,
              };
            }
          )
        );

        return res.status(200).json({
          data: payGradeReports,
          error: null,
          message: null,
        });
      })
      .catch((error) => {
        return res.status(500).json({ error });
      });
  } else if (group == "EmploymentStatus") {
    await getAllEmploymentStatusesModel()
      .then(async (result) => {
        const employmentStatuses = result.data;

        const employmentStatusReports = await Promise.all(
          employmentStatuses.map(
            async (status: { employment_status_id: string; status: string }) => {
              const employees = await getEmployeesByEmploymentStatusIDModel(
                status.employment_status_id
              );
              return {
                name: status.status,
                employees: employees.data,
              };
            }
          )
        );

        return res.status(200).json({
          data: employmentStatusReports,
          error: null,
          message: null,
        });
      })
      .catch((error) => {
        return res.status(500).json({ error });
      });
  }
  else {
    return res.status(400).json({
      error: "Invalid group. Please use Department, JobTitle, or PayGrade.",
    });
  }
};

export const getReportByCustomAttribute = async (req: Request, res: Response) => {
  const {attribute_number, attribute_value} = req.body;
  if (!attribute_number || !attribute_value) {
    return res.status(400).json({ error: "Missing attribute number or value" });
  }
  if (attribute_number < 1 || attribute_number > 3) {
    return res.status(400).json({
      error: "Invalid attribute number. Please use 1, 2, 3",
    });
  }

  await getReportsByCustomAttributeModel(attribute_number, attribute_value)
    .then((result) => {
      if (!result.data) {
        return res
          .status(404)
          .json({ error: "Information not foud" });
      }
      return res.status(200).json(result);
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
}
