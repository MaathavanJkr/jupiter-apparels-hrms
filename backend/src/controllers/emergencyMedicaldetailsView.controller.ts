// src/controllers/emergencyMedicalDetailsView.controller.ts
import { Request, Response } from "express";
import {
  getEmergencyMedicalDetailsModel,
  getEmergencyMedicalDetailsByIDModel,
} from "../models/emergencyMedicaldetailsView.model";

// Get emergency medical details for all employees
export const getEmergencyMedicalDetails = async (
  req: Request,
  res: Response
) => {
  await getEmergencyMedicalDetailsModel()
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};

// Get emergency medical details by employee ID
export const getEmergencyMedicalDetailsByID = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  await getEmergencyMedicalDetailsByIDModel(id)
    .then((result) => {
      if (!result.data) {
        return res.status(404).json({ error: "Employee not found" });
      }
      return res.status(200).json(result);
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};
