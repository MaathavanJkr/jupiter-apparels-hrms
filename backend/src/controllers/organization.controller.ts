// src/controllers/userController.ts
import { Request, Response } from "express";
import {
  Organization,
  createOrganizationModel,
  deleteOrganizationModel,
  getAllOrganizationsModel,
  getOrganizationByIDModel,
  updateOrganizationModel,
} from "../models/organization.model";

export const createOrganization = async (req: Request, res: Response) => {
  const { name, address, reg_no } = req.body;

  if (!name || !address || !reg_no) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const organization: Organization = {
    name: name as string,
    address: address as string,
    reg_no: reg_no as number,
  } as Organization;

  await createOrganizationModel(organization)
    .then((result) => {
      return res.status(201).json(result);
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};

export const getOrganizationByID = async (req: Request, res: Response) => {
  const { id } = req.params;

  await getOrganizationByIDModel(id)
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};

export const getAllOrganizations = async (req: Request, res: Response) => {
  await getAllOrganizationsModel()
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};

export const updateOrganization = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, address, reg_no } = req.body;

  await getOrganizationByIDModel(id)
    .then(async (result) => {
      if (!result.data) {
        return res.status(404).json(result);
      }
      const organization = result.data;
      if (name) organization.name = name;
      if (address) organization.address = address;
      if (reg_no) organization.reg_no = reg_no;

      await updateOrganizationModel(organization)
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

export const deleteOrganization = async (req: Request, res: Response) => {
  const { id } = req.params;

  await getOrganizationByIDModel(id)
    .then(async (result) => {
      if (!result.data) {
        return res.status(404).json(result);
      }
      await deleteOrganizationModel(id)
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
