// src/controllers/userController.ts
import { Request, Response } from "express";
import {
  JobTitle,
  createJobTitleModel,
  deleteJobTitleModel,
  getAllJobTitlesModel,
  getJobTitleByIDModel,
  updateJobTitleModel,
} from "../models/jobtitle.model";

export const createJobTitle = async (req: Request, res: Response) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const jobTitle: JobTitle = {
    title: title as string,
  } as JobTitle;

  await createJobTitleModel(jobTitle)
    .then((result) => {
      return res.status(201).json(result);
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};

export const getAllJobTitles = async (req: Request, res: Response) => {
  await getAllJobTitlesModel()
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};

export const getJobTitleByID = async (req: Request, res: Response) => {
  const { id } = req.params;

  await getJobTitleByIDModel(id)
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};

export const updateJobTitle = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title } = req.body;

  await getJobTitleByIDModel(id)
    .then(async (result) => {
      if (!result.data) {
        return res.status(404).json(result);
      }
      const jobTitle = result.data;
      if (title) jobTitle.title = title;

      await updateJobTitleModel(jobTitle)
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

export const deleteJobTitle = async (req: Request, res: Response) => {
  const { id } = req.params;

  await getJobTitleByIDModel(id)
    .then(async (result) => {
      if (!result.data) {
        return res.status(404).json(result);
      }
      await deleteJobTitleModel(id)
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
