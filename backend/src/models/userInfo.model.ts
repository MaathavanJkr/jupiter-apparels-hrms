import { RowDataPacket } from "mysql2";

export interface UserInfo extends RowDataPacket {
    employee_id: string,
    user_id: string,
    first_name: string,
    last_name: string,
    username: string,
    role: string,
    birth_date: string,
    gender:string,
    marital_status: string,
    email: string,
    nic: string,
    address:string,
    department_name: string,
    branch_name: string,
    job_title: string,
    employment_status: string,
    contact_number: string,
    pay_grade_name : string,
    supervisor_id: string
}