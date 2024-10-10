// src/controllers/userController.ts
import { Request, Response } from "express";
import {
  AllocatedLeaves,
  createAllocatedLeavesModel,
  deleteAllocatedLeavesModel,
  getAllAllocatedLeavesModel,
  getAllocatedLeavesByPayGradeModel,
  updateAllocatedLeavesModel,
} from "../models/allocatedleaves.model";

export const createAllocatedLeaves = async (req: Request, res: Response) => {
    const { annual_leaves,casual_leaves,maternity_leaves,no_pay_leaves } = req.body;
    
    if(!annual_leaves || !casual_leaves || !maternity_leaves || !no_pay_leaves ){
      return res.status(400).json({error : "Missing required fields "});
    }

    const allocatedLeaves: AllocatedLeaves = {
      annual_leaves: annual_leaves as number,
      casual_leaves: casual_leaves as number,
      maternity_leaves: maternity_leaves as number,
      no_pay_leaves: no_pay_leaves as number,
    } as AllocatedLeaves;

    await createAllocatedLeavesModel (allocatedLeaves)
      .then((result) => {
        return res.status(201).json(result);
      })
      .catch((error) => {
        return res.status(500).json({error});
      });
};

export const getAllocatedLeaves = async (req: Request, res: Response) => {
  await getAllAllocatedLeavesModel()
    .then((result)=>{
      return res.status(200).json(result);
    })
    .catch((error)=>{
      return res.status(500).json({error});
    });
};

export const getAllocatedLeavesByPayGrade = async (req: Request, res: Response) => {
    const { id } = req.params;
    
    await getAllocatedLeavesByPayGradeModel(id)
      .then((result)=>{
        return res.status(200).json(result);
      })
      .catch((error)=>{
        return res.status(500).json({error});
      });
};

export const updateAllocatedLeaves = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { annual_leaves,casual_leaves,maternity_leaves,no_pay_leaves  } = req.body;

  await getAllocatedLeavesByPayGradeModel(id)
    .then(async (result) => {
      if (!result.data) {
        return res.status(404).json(result);
      }
      const allocatedLeaves = result.data;
      if (annual_leaves) allocatedLeaves.annual_leaves = annual_leaves;
      if (casual_leaves) allocatedLeaves.casual_leaves = casual_leaves;
      if (maternity_leaves) allocatedLeaves.maternity_leaves = maternity_leaves;
      if (no_pay_leaves) allocatedLeaves.no_pay_leaves = no_pay_leaves;

      await updateAllocatedLeavesModel(allocatedLeaves)
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


export const deleteAllocatedLeaves = async (req: Request, res: Response) => {
  const { id } = req.params;

  await getAllocatedLeavesByPayGradeModel(id)
    .then(async (result) => {
      if (!result.data) {
        return res.status(404).json(result);
      }
      await deleteAllocatedLeavesModel(id)
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
