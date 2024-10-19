// src/controllers/userController.ts
import { Request, Response } from "express";
import {
  Branch,
  createBranchModel,
  deleteBranchModel,
  getAllBranchesModel,
  getBranchByIDModel,
  updateBranchModel,
} from "../models/branch.model";

export const createBranch = async (req: Request, res: Response) => {
  const { name, address, contact_number, manager_id } = req.body;

  if (!name || !address || !contact_number) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const branch: Branch = {
    name: name as string,
    address: address as string,
    contact_number: contact_number as string,
    manager_id: manager_id as string,
  } as Branch;

  await createBranchModel(branch)
    .then((result) => {
      return res.status(201).json(result);
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};

export const getAllBranches = async (req: Request, res: Response) => {
  await getAllBranchesModel()
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};

export const getBranchByID = async (req: Request, res: Response) => {
  const { id } = req.params;

  await getBranchByIDModel(id)
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};

export const updateBranch = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, address, contact_number, manager_id } = req.body;

  await getBranchByIDModel(id)
    .then(async (result) => {
      if (!result.data) {
        return res.status(404).json(result);
      }
      const branch = result.data;
      if (name) branch.name = name;
      if (address) branch.address = address;
      if (contact_number) branch.contact_number = contact_number;
      if (manager_id) branch.manager_id = manager_id;

      await updateBranchModel(branch)
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

export const deleteBranch = async (req: Request, res: Response) => {
  const { id } = req.params;

  await getBranchByIDModel(id)
    .then(async (result) => {
      if (!result.data) {
        return res.status(404).json(result);
      }
      await deleteBranchModel(id)
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
