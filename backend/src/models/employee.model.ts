import { RowDataPacket } from "mysql2";
import db from "../database/database";
import { v4 as uuidv4 } from "uuid";
import { Output } from "./output.model";

enum Gender {
  Male = "Male",
  Female = "Female",
}

enum MaritalStatus {
  Single = "Single",
  Married = "Married",
  Divorced = "Divorced",
  Widowed = "Widowed",
}

export interface Employee extends RowDataPacket {
  employee_id?: string;
  department_id: string;
  branch_id: string;
  supervisor_id: string;
  first_name: string;
  last_name: string;
  birthday: Date;
  gender: Gender;
  marital_status: MaritalStatus;
  address: string;
  email: string;
  NIC: string;
  job_title_id: string;
  pay_grade_id: string;
  employment_status_id: string;
  contact_number: string;
  cust_attr_1_value: string;
  cust_attr_2_value: string;
  cust_attr_3_value: string;
}

export interface Supervisor extends RowDataPacket {
  supervisor_id?: string;
   // full_name: string;
}


export const createEmployeeModel = async (
  employee: Employee
): Promise<Output> => {
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
    employment_status_id,
    contact_number,
    cust_attr_1_value,
    cust_attr_2_value,
    cust_attr_3_value,
  } = employee;
  const missingFields = [];
  if (!department_id) missingFields.push("department_id");
  if (!branch_id) missingFields.push("branch_id");
  if (!first_name) missingFields.push("first_name");
  if (!last_name) missingFields.push("last_name");
  if (!birthday) missingFields.push("birthday");
  if (!gender) missingFields.push("gender");
  if (!marital_status) missingFields.push("marital_status");
  if (!address) missingFields.push("address");
  if (!email) missingFields.push("email");
  if (!NIC) missingFields.push("NIC");
  if (!job_title_id) missingFields.push("job_title_id");
  if (!pay_grade_id) missingFields.push("pay_grade_id");
  if (!employment_status_id) missingFields.push("employment_status_id");
  if (!contact_number) missingFields.push("contact_number");

  if (missingFields.length > 0) {
    console.log("Missing fields:", missingFields);
    //return res.status(400).json({ error: "Missing required fields", missingFields });
  }
  employee.employee_id = uuidv4();

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
    !employment_status_id ||
    !contact_number
  ) {
    return { error: "Missing required fields in model", data: null, message: null };
  }

  try {
    await db
      .promise()
      .query(
        "CALL CreateEmployee(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          employee.employee_id,
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
          employment_status_id,
          contact_number,
          cust_attr_1_value,
          cust_attr_2_value,
          cust_attr_3_value,
        ]
      );
    return {
      data: employee,
      message: "Employee created successfully",
      error: null,
    };
  } catch (error) {
    throw { error: error, message: "Database Query Failed", data: null };
  }
};

export const getEmployeeByIDModel = async (
  employee_id: string
): Promise<Output> => {
  try {
    const [result] = await db
      .promise()
      .query<RowDataPacket[][]>("CALL GetEmployeeByID(?)", [employee_id]);

    if (Array.isArray(result) && result.length === 0) {
      return { data: null, error: "Employee not found", message: null };
    } else {
      return {
        data: (result[0] as Employee[])[0],
        error: null,
        message: null,
      };
    }
  } catch (error) {
    return {
      data: null,
      error: error,
      message: "Database Query Failed",
    };
  }
};

export const getEmployeesUnderSupervisorModel = async (
    supervisor_id: string
): Promise<Output> => {
    try {
        const [result] = await db
            .promise()
            .query<RowDataPacket[][]>("CALL GetEmployeesUnderSupervisor(?)", [supervisor_id]);

        if (Array.isArray(result) && result.length === 0) {
            return { data: null, error: "Employees not found", message: null };
        } else {
            return {
                data: (result[0] as Employee[]),
                error: null,
                message: null,
            };
        }
    } catch (error) {
        return {
            data: null,
            error: error,
            message: "Database Query Failed",
        };
    }
};

export const getEmployeeIdByUserIdModel = async (
    user_id: string
): Promise<Output> => {
    try {
        const [result] = await db
            .promise()
            .query<RowDataPacket[][]>("CALL GetEmployeeIdByUserId(?)", [user_id]);

        if (Array.isArray(result) && result.length === 0) {
            return { data: null, error: "Employee ID not found", message: null };
        } else {
            return {
                data: (result[0] as Employee[])[0],
                error: null,
                message: null,
            };
        }
    } catch (error) {
        return {
            data: null,
            error: error,
            message: "Database Query Failed",
        };
    }
};



export const getFilteredEmployeesModel = async(
  name: string,
  department_id: string,
  branch_id: string,
  offset: number,
  itemPerPage: number
) : Promise<Output> => {
    try {
      const [result] = await db
      .promise()
      .query<RowDataPacket[][]>("CALL GetFilteredEmployees(?, ?, ?, ?, ?)", [name, department_id, branch_id, offset, itemPerPage]);
      return { data: result[0] as Employee[], error: null, message: null };
    } catch (error) {
      return {
        data: null,
        error: error,
        message: "Database Query Failed",
      };
    }
}

export const getfilteredCountModel = async (
  name: string,
  department_id: string,
  branch_id: string
): Promise<Output> => {
  try {
    const [result] = await db
      .promise()
      .query<RowDataPacket[][]>("CALL GetFilteredEmployeeCount(?, ?, ?)", [
        name,
        department_id,
        branch_id,
      ]);
    return result[0][0].count;
  } catch (error) {
    return {
      data: null,
      error: error,
      message: "Database Query Failed",
    };
  }
}
export const getAllEmployeesModel = async (): Promise<Output> => {
  try {
    const [result] = await db
      .promise()
      .query<RowDataPacket[][]>("CALL GetAllEmployees()");
    return { data: result[0] as Employee[], error: null, message: null };
  } catch (error) {
    return {
      data: null,
      error,
      message: "Database Query Failed",
    };
  }
};



export const updateEmployeeModel = async (
  employee: Employee
): Promise<Output> => {
  const {
    employee_id,
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
  } = employee;

  if (
    !employee_id ||
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
    !contact_number
  ) {
    return { error: "Missing required fields", data: null, message: null };
  }

  try {
    await db
      .promise()
      .query(
        "CALL UpdateEmployee(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)",
        [
          employee_id,
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
        ]
      );
    return {
      message: "Employee updated successfully",
      error: null,
      data: employee,
    };
  } catch (error) {
    return { error, message: "Database Query Failed", data: null };
  }
};

export const deleteEmployeeModel = async (
  employee_id: string
): Promise<Output> => {
  if (!employee_id) {
    return { error: "Missing required fields", data: null, message: null };
  }

  try {
    await db.promise().query("CALL DeleteEmployee(?)", [employee_id]);
    return {
      message: "Employee deleted successfully",
      error: null,
      data: { id: employee_id },
    };
  } catch (error) {
    return { error, message: "Database Query Failed", data: null };
  }
};

// export const getSupervisorsModel = async (): Promise<Output> => {
//     try {
//         const [result] = await db
//             .promise()
//             .query<RowDataPacket[][]>("CALL GetAllSupervisors()");
//         return { data: result[0] as Employee[], error: null, message: null };
//     } catch (error) {
//         return {
//             data: null,
//             error,
//             message: "Database Query Failed",
//         };
//     }
// };

export const getAllUniqueSupervisorsModel = async (): Promise<Output> => {
    try {
        const [result] = await db
            .promise()
            .query<RowDataPacket[][]>("CALL GetAllSupervisorIDs()");

        return {
            data: result[0] as Employee[],
            error: null,
            message: "Supervisors retrieved successfully",
        };
    } catch (error) {
        return {
            data: null,
            error: error,
            message: "Database Query Failed",
        };
    }
};





