// src/controllers/pendingLeaveApplicationsView.controller.ts
import { Request, Response } from "express";
import {
  getAllPendingLeaveApplicationsModel,
  getPendingLeaveApplicationByIdModel,
} from "../models/pendingLeaveApplicationsView.model";

export const getAllPendingLeaveApplications = async (
  req: Request,
  res: Response
) => {
  await getAllPendingLeaveApplicationsModel()
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};

export const getPendingLeaveApplicationById = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  await getPendingLeaveApplicationByIdModel(id)
    .then((result) => {
      if (!result.data) {
        return res.status(404).json(result);
      }
      return res.status(200).json(result);
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};
