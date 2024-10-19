// src/controllers/userController.ts
import { Request, Response } from "express";
import {
  PayGrade,
  createPayGradeModel,
  deletePayGradeModel,
  getAllPayGradesModel,
  getPayGradeByIDModel,
  updatePayGradeModel,
} from "../models/paygrade.model";

export const createPayGrade = async (req: Request, res: Response) => {
  const { paygrade, grade_name } = req.body;

  if (!paygrade || !grade_name) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const payGrade: PayGrade = {
    paygrade: paygrade as number,
    grade_name: grade_name as string,
  } as PayGrade;

  await createPayGradeModel(payGrade)
    .then((result) => {
      return res.status(201).json(result);
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};

export const getAllPayGrade = async (req: Request, res: Response) => {
  await getAllPayGradesModel()
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};

export const getPayGradeByID = async (req: Request, res: Response) => {
  const { id } = req.params;

  await getPayGradeByIDModel(id)
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};

export const updatePayGrade = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { paygrade, grade_name } = req.body;

  await getPayGradeByIDModel(id)
    .then(async (result) => {
      if (!result.data) {
        return res.status(404).json(result);
      }
      const payGrade = result.data;
      if (paygrade) payGrade.paygrade = paygrade;
      if (grade_name) payGrade.grade_name = grade_name;

      await updatePayGradeModel(payGrade)
        .then((result) => {
          return res.status(200).json(result);
        })
        .catch((error) => {
          return res.status(500).json({ error });
        });
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};

export const deletePayGrade = async (req: Request, res: Response) => {
  const { id } = req.params;

  await getPayGradeByIDModel(id)
    .then(async (result) => {
      if (!result.data) {
        return res.status(404).json(result);
      }
      await deletePayGradeModel(id)
        .then((result) => {
          return res.status(200).json(result);
        })
        .catch((error) => {
          return res.status(500).json({ error });
        });
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};
