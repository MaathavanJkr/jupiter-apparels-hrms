// src/controllers/userController.ts
import { Request, Response } from "express";
import {
  Department,
  createDepartmentModel,
  deleteDepartmentModel,
  getAllDepartmentsModel,
  getDepartmentByIDModel,
  updateDepartmentModel,
} from "../models/department.model";

export const createDepartment = async (req: Request, res: Response) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const department: Department = {
    name: name as string,
  } as Department;

  await createDepartmentModel(department)
    .then((result) => {
      return res.status(201).json(result);
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};

export const getAllDepartments = async (req: Request, res: Response) => {
  await getAllDepartmentsModel()
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};

export const getDepartmentByID = async (req: Request, res: Response) => {
  const { id } = req.params;

  await getDepartmentByIDModel(id)
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};

export const updateDepartment = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;

  await getDepartmentByIDModel(id)
    .then(async (result) => {
      if (!result.data) {
        return res.status(404).json(result);
      }
      const department = result.data;
      if (name) department.name = name;

      await updateDepartmentModel(department)
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

export const deleteDepartment = async (req: Request, res: Response) => {
  const { id } = req.params;

  await getDepartmentByIDModel(id)
    .then(async (result) => {
      if (!result.data) {
        return res.status(404).json(result);
      }
      await deleteDepartmentModel(id)
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
