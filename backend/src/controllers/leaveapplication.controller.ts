// src/controllers/userController.ts
import { Request, Response } from "express";

import {
    LeaveApplication,
    createLeaveApplicationModel,
    deleteLeaveApplicationModel,
    getAllLeaveApplicationsModel,
    getLeaveApplicationByIDModel,
    updateLeaveApplicationModel, getLeaveApplicationsByEmployeeIDModel,
} from "../models/leaveapplication.model";

export const createLeaveApplication = async (req: Request, res: Response) => {
  const { employee_id, leave_type, start_date, end_date, reason } = req.body;

  if (!employee_id || !leave_type || !start_date || !end_date || !reason) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const leaveApplication: LeaveApplication = {
    employee_id: employee_id as string,
    leave_type: leave_type as string,
    start_date: start_date as Date,
    end_date: end_date as Date,
    reason: reason as string,
  } as LeaveApplication;

  await createLeaveApplicationModel(leaveApplication)
    .then((result) => {
      return res.status(201).json(result);
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};

export const getAllLeaveApplications = async (req: Request, res: Response) => {
  await getAllLeaveApplicationsModel()
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};

export const getLeaveApplicationByID = async (req: Request, res: Response) => {
    const { application_id } = req.params;

    if (!application_id) {
        return res.status(400).json({ error: "Missing application ID"  });
    }

    try {
        const result = await getLeaveApplicationByIDModel(application_id);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ error });
    }
};


export const getLeaveApplicationsByEmployeeID = async (req: Request, res: Response) => {
    const { employee_id } = req.params;

    if (!employee_id) {
        return res.status(400).json({ error: "Missing employee ID" });
    }

    try {
        const result = await getLeaveApplicationsByEmployeeIDModel(employee_id);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ error });
    }
};

// export const updateLeaveApplication = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const {
//     employee_id,
//     leave_type,
//     start_date,
//     end_date,
//     reason,
//     submission_date,
//     status,
//     response_date,
//   } = req.body;
//
//   await getLeaveApplicationByIDModel(id)
//     .then(async (result) => {
//       if (!result.data) {
//         return res.status(404).json(result);
//       }
//       const leaveApplication = result.data;
//       if (employee_id) leaveApplication.employee_id = employee_id;
//       if (leave_type) leaveApplication.leave_type = leave_type;
//       if (start_date) leaveApplication.start_date = start_date;
//       if (end_date) leaveApplication.end_date = end_date;
//       if (reason) leaveApplication.reason = reason;
//       if (submission_date) leaveApplication.submission_date = submission_date;
//       if (status) leaveApplication.status = status;
//       if (response_date) leaveApplication.response_date = response_date;
//
//       await updateLeaveApplicationModel(leaveApplication)
//         .then((result) => {
//           return res.status(200).json(result);
//         })
//         .catch((error) => {
//           return res.status(500).json({ error });
//         });
//     })
//     .catch((error) => {
//       return res.status(500).json({ error });
//     });
// };

// export const updateLeaveApplication = async (req: Request, res: Response) => {
//     const { application_id } = req.params;
//     const { status,response_date } = req.body;
//
//     logger.info(`Received request to update leave application with ID: ${application_id}`);
//     logger.info(`Status: ${status}, Response Date: ${response_date}`);
//
//     // if (!status){
//     //     return res.status(400).json({ error: "status NO" });
//     //
//     // }
//
//     // if (!status || !response_date) {
//     //     return res.status(400).json({ error: "Missing required fields" });
//     // }
//
//     await getLeaveApplicationByIDModel(application_id)
//         .then(async (result) => {
//             if (!result.data) {
//                 return res.status(404).json(result);
//             }
//
//             const leaveApplication = result.data;
//             leaveApplication.status = status; // Set status from request body
//             leaveApplication.response_date = response_date; // Set response_date from request body
//
//             await updateLeaveApplicationModel(leaveApplication)
//                 .then((result) => {
//                     return res.status(200).json(result);
//                 })
//                 .catch((error) => {
//                     return res.status(500).json({ error });
//                 });
//         })
//         .catch((error) => {
//             return res.status(500).json({ error });
//         });
// };

// export const updateLeaveApplication = async (req: Request, res: Response) => {
//     const { application_id } = req.params;
//     const { status, response_date } = req.body;
//
//     logger.info(`This is Status: ${status}`);
//     logger.info(`This is Date: ${response_date}`);
//
//
//     if (!status || !response_date) {
//         logger.error('Missing required fields: status or response_date');
//         return res.status(400).json({ error: "Missing required fields: status and response_date" });
//     }
//
//     try {
//         logger.info(`We are here`);
//         const result = await getLeaveApplicationByIDModel(application_id);
//         logger.info(result.data);
//         if (!result.data) {
//             return res.status(404).json({ error: "Leave application not found" });
//         }
//
//         const leaveApplication = result.data;
//         leaveApplication.status = status; // Set status from request body
//         leaveApplication.response_date = response_date; // Set response_date from request body
//
//         const updateResult = await updateLeaveApplicationModel(leaveApplication);
//         return res.status(200).json(updateResult);
//
//     } catch (error) {
//         logger.error(`Error updating leave application: ${error}`);
//         return res.status(500).json({ error: "Internal server error" });
//     }
// };

export const updateLeaveApplication = async (req: Request, res: Response) => {
    const { application_id } = req.params;
    const { status, response_date } = req.body;



    // Check for required fields
    if (!status || !response_date) {

        return res.status(400).json({ error: "Missing required fields: status and response_date" });
    }

    try {

        const result = await getLeaveApplicationByIDModel(application_id);


        // Check if leave application was found
        if (!result.data) {
            return res.status(404).json({ error: "Leave application not found" });
        }

        const leaveApplication = result.data;


        // Call the update model with individual parameters
        const updateResult = await updateLeaveApplicationModel(
            leaveApplication.application_id, // Assuming this is defined in the fetched leave application
            leaveApplication.leave_type,
            leaveApplication.start_date,
            leaveApplication.end_date,
            leaveApplication.reason,
            status, // Set new status from request body
            response_date // Set new response date from request body
        );

        return res.status(200).json(updateResult);

    } catch{

        return res.status(500).json({ error: "Internal server error" });
    }
};



export const deleteLeaveApplication = async (req: Request, res: Response) => {
  const { id } = req.params;

  await getLeaveApplicationByIDModel(id)
    .then(async (result) => {
      if (!result.data) {
        return res.status(404).json(result);
      }
      await deleteLeaveApplicationModel(id)
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
