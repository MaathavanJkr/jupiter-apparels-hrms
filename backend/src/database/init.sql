DROP TABLE IF EXISTS User;
DROP TABLE IF EXISTS Allocated_Leaves;
DROP TABLE IF EXISTS Leave_Application;
DROP TABLE IF EXISTS Emergency_Contact;
DROP TABLE IF EXISTS Employee_Dependent;
DROP TABLE IF EXISTS Employee;
DROP TABLE IF EXISTS Employment_Status;
DROP TABLE IF EXISTS Pay_Grade;
DROP TABLE IF EXISTS Job_Title;
DROP TABLE IF EXISTS Department;
DROP TABLE IF EXISTS Branch;
DROP TABLE IF EXISTS Organization;
CREATE TABLE Organization (
    organization_id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(80),
    address VARCHAR(255),
    reg_no INT
);
CREATE TABLE Department (
    department_id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(80)
);
CREATE TABLE Pay_Grade (
    pay_grade_id VARCHAR(36) PRIMARY KEY,
    paygrade INT,
    grade_name VARCHAR(36)
);
CREATE TABLE Job_Title (
    job_title_id VARCHAR(36) PRIMARY KEY,
    title VARCHAR(80)
);
CREATE TABLE Employment_Status (
    employment_status_id VARCHAR(36) PRIMARY KEY,
    status ENUM(
        'Intern-Fulltime',
        'Intern-Parttime',
        'Contract-Fulltime',
        'Contract-Parttime',
        'Permanent',
        'Freelance'
    )
);
CREATE TABLE Branch (
    branch_id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(80),
    address VARCHAR(255),
    contact_number VARCHAR(10) -- manager_id VARCHAR(36)
    -- FOREIGN KEY (manager_id) REFERENCES Employee(employee_id)
);
CREATE TABLE Employee (
    employee_id VARCHAR(36) PRIMARY KEY,
    department_id VARCHAR(36),
    branch_id VARCHAR(36),
    supervisor_id VARCHAR(36),
    first_name VARCHAR(80),
    last_name VARCHAR(80),
    birth_date DATE,
    gender ENUM('Male', 'Female'),
    marital_status ENUM('Single', 'Married', 'Divorced', 'Widowed'),
    address VARCHAR(255),
    email VARCHAR(80) UNIQUE,
    NIC VARCHAR(80) UNIQUE,
    job_title_id VARCHAR(36),
    pay_grade_id VARCHAR(36),
    employment_status_id VARCHAR(36),
    contact_number VARCHAR(10),
    cust_attr_1_key VARCHAR(80),
    cust_attr_1_value VARCHAR(255),
    cust_attr_2_key VARCHAR(80),
    cust_attr_2_value VARCHAR(255),
    cust_attr_3_key VARCHAR(80),
    cust_attr_3_value VARCHAR(255),
    FOREIGN KEY (department_id) REFERENCES Department(department_id),
    FOREIGN KEY (branch_id) REFERENCES Branch(branch_id),
    FOREIGN KEY (supervisor_id) REFERENCES Employee(employee_id),
    FOREIGN KEY (job_title_id) REFERENCES Job_Title(job_title_id),
    FOREIGN KEY (pay_grade_id) REFERENCES Pay_Grade(pay_grade_id),
    FOREIGN KEY (employment_status_id) REFERENCES Employment_Status(employment_status_id)
);
CREATE TABLE Allocated_Leaves (
    pay_grade_id VARCHAR(36),
    annual_leaves INT,
    casual_leaves INT,
    maternity_leaves INT,
    no_pay_leaves INT,
    PRIMARY KEY (pay_grade_id),
    FOREIGN KEY (pay_grade_id) REFERENCES Pay_Grade(pay_grade_id)
);
CREATE TABLE Employee_Dependent (
    dependent_id VARCHAR(36) PRIMARY KEY,
    employee_id VARCHAR(36),
    name VARCHAR(80),
    relationship_to_employee VARCHAR(80),
    birth_date DATE,
    FOREIGN KEY (employee_id) REFERENCES Employee(employee_id)
);
CREATE TABLE Emergency_Contact (
    emergency_id VARCHAR(36) PRIMARY KEY,
    employee_id VARCHAR(36),
    name VARCHAR(80),
    relationship VARCHAR(80),
    contact_number VARCHAR(10),
    address VARCHAR(255),
    FOREIGN KEY (employee_id) REFERENCES Employee(employee_id)
);
CREATE TABLE Leave_Application (
    application_id VARCHAR(36) PRIMARY KEY,
    employee_id VARCHAR(36),
    leave_type ENUM('Annual', 'Casual', 'Maternity', 'Nopay') NOT NULL,
    start_date DATE,
    end_date DATE,
    reason VARCHAR(255),
    submission_date DATE,
    status ENUM('Pending', 'Approved', 'Rejected') NOT NULL,
    response_date DATE,
    FOREIGN KEY (employee_id) REFERENCES Employee(employee_id)
);
CREATE TABLE User (
    user_id VARCHAR(36) PRIMARY KEY,
    employee_id VARCHAR(36),
    role ENUM('Admin', 'Supervisor', 'Employee', 'HR manager'),
    username VARCHAR(80) NOT NULL UNIQUE,
    password VARCHAR(80) NOT NULL UNIQUE,
    FOREIGN KEY (employee_id) REFERENCES Employee(employee_id)
);