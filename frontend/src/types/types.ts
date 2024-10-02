export interface User {
    user_id: string;
    employee_id: string;
    role: string;
    username: string;
    password: string;
}

export interface Employee {
    employee_id: number;
    department_id: number;
    branch_id: number;
    supervisor_id: number;
    first_name : string;
    last_name : string;
    birthday: Date;
    gender: string;
    marital_status: string;
    address: string;
    email: string;
    NIC: string;
    job_title_id: number;
    pay_grade_id: number;
    employee_status_id: number;
    contact_number: string;
}

export interface UserInfo {
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
    department_name: string,
    branch_name: string,
    job_title: string,
    employment_status: string,
    contact_number: string,
}



