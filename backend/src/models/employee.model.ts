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
    employee_id?: string;
    department_id: string;
    branch_id: string;
    supervisor_id: string;
    first_name : string;
    last_name : string;
    birthday: Date;
    gender: Gender;
    marital_status: MaritalStatus;
    address: string;
    email: string;
    NIC: string;
    job_title_id: string;
    pay_grade_id:string;
    employee_status_id:string;
    contact_number: string;
}

export interface Supervisor extends RowDataPacket {
    supervisor_id?: string;
    full_name: string;

}
