export interface User {
  user_id: string;
  employee_id: string;
  role: string;
  username: string;
}

export interface Employee {
  employee_id: string;
  department_id: string;
  branch_id: string;
  supervisor_id: string;
  first_name: string;
  last_name: string;
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
  cust_attr_1_value: string;
  cust_attr_2_value: string;
  cust_attr_3_value: string;
}

export interface Branch {
  branch_id: string;
  name: string;
  address: string;
  contact_number: string;
  manager_id: string;
}

export interface Department {
  department_id: string;
  name: string;
}

export interface JobTitle {
  job_title_id: string;
  title: string;
}

export interface EmploymentStatus {
  employment_status_id: string;
  status: string;
}

export interface PayGrade {
  pay_grade_id: string;
  paygrade: number;
  grade_name: string;
}

export interface Supervisor {
  supervisor_id: string;
  full_name: string;
}

export interface Dependent {
  dependent_id: string;
  employee_id: string;
  name: string;
  relationship_to_employee: string;
  birth_date: string;
}

export interface EmergencyContact {
  emergency_id: string;
  employee_id: string;
  name: string;
  relationship: string;
  contact_number: string;
  address: string;
}

export interface EmployeeInfo {
  employee_id: string,
  first_name:string,
  last_name:string,
  birth_date: string,
  gender: string,
  marital_status:string,
  address:string,
  email:string,
  NIC:string,
  contact_number:string,
  department_name:string,
  branch_name:string,
  job_title:string,
  employment_status:string,
  pay_grade:string,
  pay_grade_level: number,
  supervisor_name:string,
  supervisor_id: string,
  branch_id: string,
  department_id: string,
  user_id:string,
  role:string
  username:string;
  cust_attr_1_value:string,
  cust_attr_2_value:string,
  cust_attr_3_value:string,
}

export interface LeaveBalance {
  employee_id: string;
  employee_name: string;
  remaining_annual_leaves: number;
  remaining_casual_leaves: number;
  remaining_maternity_leaves: number;
  remaining_nopay_leaves: number;
  remaining_total_leaves: number;
}

export interface UsedLeaves {
  employee_id: string;
  employee_name: string;
  used_annual_leaves: number;
  used_casual_leaves: number;
  used_maternity_leaves: number;
  used_nopay_leaves: number;
  used_total_leaves: number;
}

export interface LeaveApplication {
  application_id?: string;
  employee_id: string;
  leave_type: string;
  start_date: string;
  end_date: string;
  reason: string;
  submission_date: string;
  status: string;
  response_date: string | null;
}

export interface EmployeeCount {
  total_count: number;
  male_count: number;
  female_count: number;
}

export interface LeaveCount {
  total_count: number;
  approved_count: number;
  rejected_count: number;
  pending_count: number;
}

export interface Organization {
  organization_id?: string;
  name: string;
  address: string;
  reg_no: number;
}
