// src/controllers/usedLeavesView.controller.ts
import { Request, Response } from "express";
import {
    getAllUsedLeavesModel,
    getUsedLeavesByEmployeeIDModel,
} from "../models/usedLeavesView.model";

export const getAllUsedLeaves = async (req: Request, res: Response) => {
    await getAllUsedLeavesModel()
        .then((result) => {
            return res.status(200).json(result);
        })
        .catch((error) => {
            return res.status(500).json({ error });
        });
};

export const getUsedLeavesByEmployeeID = async (req: Request, res: Response) => {
    const { id } = req.params;

    await getUsedLeavesByEmployeeIDModel(id)
        .then((result) => {
            if (!result.data) {
                return res.status(404).json({ error: "Used leaves information not found" });
            }
            return res.status(200).json(result);
        })
        .catch((error) => {
            return res.status(500).json({ error });
        });
};
