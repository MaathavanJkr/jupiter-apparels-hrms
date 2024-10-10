import { Request, Response } from "express";
import {
    getAllEmploymentStatusesModel,
    getEmploymentStatusByIDModel,
} from "../models/employmentStatus.model";

export const getAllEmploymentStatuses = async (req: Request, res: Response) => {
    await getAllEmploymentStatusesModel()
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};


export const getEmploymentStatusByID = async (req:Request, res:Response) => {
    const { id } = req.params;

  await getEmploymentStatusByIDModel(id)
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};
