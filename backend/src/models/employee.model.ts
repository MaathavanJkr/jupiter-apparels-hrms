import { RowDataPacket } from "mysql2";

enum Gender {
    Male = 'Male',
    Female = 'Female'
}

enum MaritalStatus {
    Single = 'Single',
    Married = 'Married',
    Divorced = 'Divorced',
    Widowed = 'Widowed'
}

export interface Employee extends RowDataPacket{
    employee_id: number;
    department_id: number;
    branch_id: number;
    supervisor_id: number;
    first_name : string;
    last_name : string;
    birthday: Date;
    gender: Gender;
    marital_status: MaritalStatus;
    address: string;
    contact_number: string;
    email: string;
    NIC: string;
    job_title_id: number;
    pay_grade_id: number;
    employee_status_id: number;
}
