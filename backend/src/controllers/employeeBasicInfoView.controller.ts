import { Request, Response } from "express";
import {
  getEmployeeBasicInfoByIDModel,
  getAllEmployeesBasicInfoModel,
} from "../models/employeeBasicInfoView.model";

export const getEmployeeBasicInfoByID = async (req: Request, res: Response) => {
  const { id } = req.params;

  await getEmployeeBasicInfoByIDModel(id)
    .then((result) => {
      if (!result.data) {
        return res.status(404).json({ message: "Employee not found" });
      }
      return res.status(200).json(result);
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};

export const getAllEmployeesBasicInfo = async (req: Request, res: Response) => {
  await getAllEmployeesBasicInfoModel()
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};
