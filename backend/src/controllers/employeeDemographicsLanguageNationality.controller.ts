// src/controllers/employeeDemographicsLanguageNationality.controller.ts
import { Request, Response } from "express";
import {
    getEmployeeDemographicsModel,
    getEmployeeDemographicsByLangAndNatModel,
} from "../models/employeeDemographicsLanguageNationality.model";

// Get employee demographics for all employees
export const getEmployeeDemographics = async (req: Request, res: Response) => {
    await getEmployeeDemographicsModel()
        .then((result) => {
            return res.status(200).json(result);
        })
        .catch((error) => {
            return res.status(500).json({ error });
        });
};

// Get employee demographics by nationality and preferred language
export const getEmployeeDemographicsByLangAndNat = async (req: Request, res: Response) => {
    const { nationality, language } = req.params;

    await getEmployeeDemographicsByLangAndNatModel(nationality, language)
        .then((result) => {
            if (!result.data) {
                return res.status(404).json({ error: "Demographics not found" });
            }
            return res.status(200).json(result);
        })
        .catch((error) => {
            return res.status(500).json({ error });
        });
};
