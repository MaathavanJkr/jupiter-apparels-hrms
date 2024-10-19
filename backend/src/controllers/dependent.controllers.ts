import { Request, Response } from "express";
import {
  EmployeeDependent,
  createEmployeeDependentModel,
  getAllEmployeeDependentsModel,
  getEmployeeDependentByIDModel,
  updateEmployeeDependentModel,
  deleteEmployeeDependentModel,
  getEmployeeDependentByEmployeeIDModel,
} from "../models/dependent.model";

export const createEmployeeDependent = async (req: Request, res: Response) => {
  const { employee_id, name, relationship_to_employee, birth_date } = req.body;

  if (!employee_id || !name || !relationship_to_employee || !birth_date) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const employeeDependent: EmployeeDependent = {
    employee_id: employee_id as string,
    name: name as string,
    relationship_to_employee: relationship_to_employee as string,
    birth_date: birth_date as Date,
  } as EmployeeDependent;

  await createEmployeeDependentModel(employeeDependent)
    .then((result) => {
      return res.status(201).json(result);
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};

export const getAllEmployeeDependents = async (req: Request, res: Response) => {
  await getAllEmployeeDependentsModel()
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};

export const getEmployeeDependentByID = async (req: Request, res: Response) => {
  const { id } = req.params;

  await getEmployeeDependentByIDModel(id)
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};

export const updateEmployeeDependent = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { employee_id, name, relationship_to_employee, birth_date } = req.body;

  await getEmployeeDependentByIDModel(id)
    .then(async (result) => {
      if (!result.data) {
        return res.status(404).json(result);
      }
      const employeeDependent = result.data;
      if (employee_id) employeeDependent.employee_id = employee_id;
      if (name) employeeDependent.name = name;
      if (relationship_to_employee)
        employeeDependent.relationship_to_employee = relationship_to_employee;
      if (birth_date) employeeDependent.birth_date = birth_date;

      await updateEmployeeDependentModel(employeeDependent)
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

export const deleteEmployeeDependent = async (req: Request, res: Response) => {
  const { id } = req.params;

  await getEmployeeDependentByIDModel(id)
    .then(async (result) => {
      if (!result.data) {
        return res.status(404).json(result);
      }
      await deleteEmployeeDependentModel(id)
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
export const getEmployeeDependentByEmployeeID = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  await getEmployeeDependentByEmployeeIDModel(id)
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};

// function getByIDModel(id: string) {
//     throw new Error("Function not implemented.");
// }
