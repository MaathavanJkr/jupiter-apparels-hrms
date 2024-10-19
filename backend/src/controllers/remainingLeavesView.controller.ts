import { Request, Response } from "express";
import {
  getAllRemainingLeavesModel,
  getRemainingLeavesByEmployeeIDModel,
} from "../models/remainingLeavesView.model";

export const getAllRemainingLeaves = async (req: Request, res: Response) => {
  await getAllRemainingLeavesModel()
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};

export const getRemainingLeavesByEmployeeID = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  await getRemainingLeavesByEmployeeIDModel(id)
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
