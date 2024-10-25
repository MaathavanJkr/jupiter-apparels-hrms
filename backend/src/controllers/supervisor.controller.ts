// src/controllers/usedLeavesView.controller.ts
import { Request,Response } from "express";
import { getAllSupervisorIDModel } from "../models/supervisor.model";


export const getAllSupervisorID = async (  req: Request,res: Response) => {
  
    await getAllSupervisorIDModel()
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