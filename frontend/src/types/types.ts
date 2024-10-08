export interface User {
    user_id: string;
    employee_id: string;
    role: string;
    username: string;
    password: string;
}

export interface Employee {
    employee_id: string;
    department_id: string;
    branch_id: string;
    supervisor_id: string;
    first_name : string;
    last_name : string;
    birth_date: string;
    gender: string;
    marital_status: string;
    address: string;
    email: string;
    NIC: string;
    job_title_id: string;
    pay_grade_id: string;
    employment_status_id: string;
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

export interface Branch {
    branch_id: string,
    name: string,
    address: string,
    contact_number: string,
    manager_id : string,
}

export interface Department {
    department_id: string,
    name: string,
}

export interface JobTitle {
    job_title_id: string,
    title: string,
}

export interface EmploymentStatus {
    employment_status_id: string,
    status: string,
}

export interface PayGrade {
    pay_grade_id: string,
    paygrade:number,
    grade_name: string,
}

export interface Supervisor {
    supervisor_id: string,
    full_name: string,
}

export interface Dependent {
    dependent_id: string,
    employee_id: string,
    name: string,
    relationship_to_employee: string,
    birth_date: string,
}

export interface EmergencyContact {
    emergency_id: string,
    employee_id: string,
    name: string,
    relationship: string,
    contact_number: string,
    address: string,
}
