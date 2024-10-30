import { Request, Response } from "express";
import {
    getAllPendingLeaveApplicationsModel,
    getPendingLeaveApplicationByIdModel,
    getPendingLeaveCountByEmployeeIdModel
} from "../models/pendingLeaveApplicationsView.model";


export const getAllPendingLeaveApplications = async (
    req: Request,
    res: Response
) => {
    await getAllPendingLeaveApplicationsModel()
        .then((result) => {
            return res.status(200).json(result);
        })
        .catch((error) => {
            return res.status(500).json({ error });
        });
};

export const getPendingLeaveApplicationById = async (
    req: Request,
    res: Response
) => {
    const { id } = req.params;

    await getPendingLeaveApplicationByIdModel(id)
        .then((result) => {
            if (!result.data) {
                return res.status(404).json(result);
            }
            return res.status(200).json(result);
        })
        .catch((error) => {
            return res.status(500).json({ error });
        });
};

// New controller function to get pending leave count by type for a specific employee
export const getPendingLeaveCountByEmployeeId = async (
    req: Request,
    res: Response
) => {
    const { emp_id } = req.params;

    await getPendingLeaveCountByEmployeeIdModel(emp_id)
        .then((result) => {
            if (!result.data) {
                return res.status(404).json({ error: "Employee not found or no pending leaves" });
            }
            return res.status(200).json(result);
        })
        .catch((error) => {
            return res.status(500).json({ error });
        });
};
