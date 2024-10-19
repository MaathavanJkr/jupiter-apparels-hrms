// src/controllers/payrollInfoView.controller.ts
import { Request, Response } from "express";
import {
  getAllPayrollInfoModel,
  getPayrollInfoByEmployeeIDModel,
} from "../models/payrollInfoView.model";

export const getAllPayrollInfo = async (req: Request, res: Response) => {
  await getAllPayrollInfoModel()
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};

export const getPayrollInfoByEmployeeID = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  await getPayrollInfoByEmployeeIDModel(id)
    .then((result) => {
      if (!result.data) {
        return res.status(404).json({ error: "Payroll information not found" });
      }
      return res.status(200).json(result);
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};
