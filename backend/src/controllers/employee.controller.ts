// src/controllers/userController.ts
import { Request, Response } from "express";
import {
  Employee,
  createEmployeeModel,
  deleteEmployeeModel,
  getAllEmployeesModel,
  getEmployeeByIDModel,
  getFilteredEmployeesModel,
  getfilteredCountModel,
  updateEmployeeModel,
  getEmployeesUnderSupervisorModel,
  getEmployeeIdByUserIdModel,
  getAllUniqueSupervisorsModel,
  findSupervisorsModel,
  getEmployeeGenderCountsModel,
  getEmployeeCountByDepartmentIDModel,
} from "../models/employee.model";

export const createEmployee = async (req: Request, res: Response) => {
  const {
    department_id,
    branch_id,
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
    employment_status_id,
    contact_number,
  } = req.body;

  if (
    !department_id ||
    !branch_id ||
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
    !employment_status_id ||
    !contact_number!
  ) {
    return res
      .status(400)
      .json({ error: "Missing required fields in controller" });
  }

  const employee: Employee = {
    department_id: department_id as string,
    branch_id: branch_id as string,
    supervisor_id: "E0004", // hardcode here to set the admin as the supervisor when creating a user account.
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
    employment_status_id: employment_status_id as string,
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
export const getFilteredEmployees = async (req: Request, res: Response) => {
  const { name, department_id, branch_id, offset, itemsPerPage } = req.body;
  await getFilteredEmployeesModel(
    name,
    department_id,
    branch_id,
    offset,
    itemsPerPage
  )
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};

export const getFilteredCount = async (req: Request, res: Response) => {
  const { name, department_id, branch_id } = req.body;
  await getfilteredCountModel(name, department_id, branch_id)
    .then((result) => {
      return res.status(200).json({ count: result });
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
    cust_attr_1_value,
    cust_attr_2_value,
    cust_attr_3_value,
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
      if (cust_attr_1_value) employee.cust_attr_1_value = cust_attr_1_value;
      if (cust_attr_2_value) employee.cust_attr_2_value = cust_attr_2_value;
      if (cust_attr_3_value) employee.cust_attr_3_value = cust_attr_3_value;

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
          return res.status(400).json({ error });
        });
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};

export const getEmployeesUnderSupervisor = async (
  req: Request,
  res: Response
) => {
  const { supervisor_id } = req.params;

  await getEmployeesUnderSupervisorModel(supervisor_id)
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};

export const getEmployeeIdByUserId = async (req: Request, res: Response) => {
  const { user_id } = req.params;

  try {
    const employee_id = await getEmployeeIdByUserIdModel(user_id);
    if (!employee_id) {
      return res.status(404).json({ error: "Employee id not found" });
    }
    return res.status(200).json(employee_id);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const getAllUniqueSupervisors = async (req: Request, res: Response) => {
  try {
    const result = await getAllUniqueSupervisorsModel();
    if (!result.data) {
      return res.status(404).json({ error: "No supervisors found" });
    }

    return res.status(200).json(result);
  } catch (error) {
    console.log("error: " + error);
    return res.status(500).json({ error: "Failed to retrieve supervisors" });
  }
};

export const findSupervisors = async (req: Request, res: Response) => {
  const { department_id, pay_grade_id, employee_id } = req.body;
  if (!department_id || !pay_grade_id) {
    return res.status(400).json({ error: "Missing required data" });
  }
  try {
    const result = await findSupervisorsModel(
      department_id,
      pay_grade_id,
      employee_id
    );
    if (!result.data) {
      return res.status(404).json({ error: "No supervisors found" });
    }

    return res.status(200).json(result);
  } catch (error) {
    //console.log("error: " + error);
    return res
      .status(500)
      .json({ message: "Failed to retrieve supervisors", error: error });
  }
};

export const getEmployeeCountByDepartmentID = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await getEmployeeCountByDepartmentIDModel();
    if (!result.data) {
      return res.status(404).json({ error: "Failed to retrieve data" });
    }

    return res.status(200).json(result);
  } catch (error) {
    console.log("error: " + error);
    return res.status(500).json({ error: "Failed to retrieve data" });
  }
};

export const getEmployeeGenderCounts = async (req: Request, res: Response) => {
  try {
    const result = await getEmployeeGenderCountsModel();
    if (!result.data) {
      return res.status(404).json({ error: "Failed to retrieve data" });
    }

    return res.status(200).json(result);
  } catch (error) {
    console.log("error: " + error);
    return res.status(500).json({ error: "Failed to retrieve data" });
  }
};
