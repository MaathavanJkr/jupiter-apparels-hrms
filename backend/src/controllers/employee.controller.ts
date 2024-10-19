// src/controllers/userController.ts
import { Request, Response } from "express";
import {
  Employee,
  createEmployeeModel,
  deleteEmployeeModel,
  getAllEmployeesModel,
  getEmployeeByIDModel,
  updateEmployeeModel,
} from "../models/employee.model";

export const createEmployee = async (req: Request, res: Response) => {
  const {
    department_id,
    branch_id,
    supervisor_id,
    first_name,
    last_name,
    birthday,
    gender,
    marital_status,
    address,
    email,
    NIC,
    job_title_id,
    pay_grade_id,
    employee_status_id,
    contact_number,
  } = req.body;

  if (
    !department_id ||
    !branch_id ||
    !supervisor_id ||
    !first_name ||
    !last_name ||
    !birthday ||
    !gender ||
    !marital_status ||
    !address ||
    !email ||
    !NIC ||
    !job_title_id ||
    !pay_grade_id ||
    !employee_status_id ||
    !contact_number!
  ) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const employee: Employee = {
    department_id: department_id as string,
    branch_id: branch_id as string,
    supervisor_id: supervisor_id as string,
    first_name: first_name as string,
    last_name: last_name as string,
    birthday: birthday as Date,
    gender: gender as string,
    marital_status: marital_status as string,
    address: address as string,
    email: email as string,
    NIC: NIC as string,
    job_title_id: job_title_id as string,
    pay_grade_id: pay_grade_id as string,
    employee_status_id: employee_status_id as string,
    contact_number: contact_number as string,
  } as Employee;

  await createEmployeeModel(employee)
    .then((result) => {
      return res.status(201).json(result);
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};

export const getAllEmployees = async (req: Request, res: Response) => {
  await getAllEmployeesModel()
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};

export const getEmployeeByID = async (req: Request, res: Response) => {
  const { id } = req.params;

  await getEmployeeByIDModel(id)
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};

export const updateEmployee = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    department_id,
    branch_id,
    supervisor_id,
    first_name,
    last_name,
    birthday,
    gender,
    marital_status,
    address,
    email,
    NIC,
    job_title_id,
    pay_grade_id,
    employee_status_id,
    contact_number,
  } = req.body;

  await getEmployeeByIDModel(id)
    .then(async (result) => {
      if (!result.data) {
        return res.status(404).json(result);
      }
      const employee = result.data;
      if (department_id) employee.department_id = department_id;
      if (branch_id) employee.branch_id = branch_id;
      if (supervisor_id) employee.supervisor_id = supervisor_id;
      if (first_name) employee.supervisor_id = supervisor_id;
      if (last_name) employee.last_name = last_name;
      if (birthday) employee.birthday = birthday;
      if (gender) employee.gender = gender;
      if (marital_status) employee.marital_status = marital_status;
      if (address) employee.address = address;
      if (email) employee.email = email;
      if (NIC) employee.NIC = NIC;
      if (job_title_id) employee.job_title_id = job_title_id;
      if (pay_grade_id) employee.pay_grade_id = pay_grade_id;
      if (employee_status_id) employee.employee_status_id = employee_status_id;
      if (contact_number) employee.contact_number = contact_number;

      await updateEmployeeModel(employee)
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

export const deleteEmployee = async (req: Request, res: Response) => {
  const { id } = req.params;

  await getEmployeeByIDModel(id)
    .then(async (result) => {
      if (!result.data) {
        return res.status(404).json(result);
      }
      await deleteEmployeeModel(id)
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
