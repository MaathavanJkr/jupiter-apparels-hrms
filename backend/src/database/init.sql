DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS leave_balances;
DROP TABLE IF EXISTS leaves;
DROP TABLE IF EXISTS leave_applications;
DROP TABLE IF EXISTS emergency_contacts;
DROP TABLE IF EXISTS employee_dependents;
DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS contract_statuses;
DROP TABLE IF EXISTS pay_grades;
DROP TABLE IF EXISTS job_titles;
DROP TABLE IF EXISTS role_permissions;
DROP TABLE IF EXISTS permissions;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS branches;
DROP TABLE IF EXISTS organizations;

CREATE TABLE
    organizations (
        org_id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(30) NOT NULL,
        address VARCHAR(80) NOT NULL,
        reg_no INT NOT NULL
    );
-- Need to Update the queries --
CREATE TABLE
    branches (
        branch_id INT PRIMARY KEY,
        name VARCHAR(30),
        address VARCHAR(80),
        contact_number VARCHAR(10),
        org_id INT,
        manager_id INT,
        FOREIGN KEY (org_id) REFERENCES organizations (org_id)
    );

CREATE TABLE
    departments (
        department_id INT PRIMARY KEY,
        branch_id INT,
        department_head_id INT,
        name VARCHAR(30),
        address VARCHAR(80),
        contact_number VARCHAR(10),
        FOREIGN KEY (branch_id) REFERENCES branches (branch_id)
    );

CREATE TABLE
    roles (role_id INT PRIMARY KEY, role_name VARCHAR(30));

CREATE TABLE
    permissions (
        permission_id INT PRIMARY KEY,
        permission_name VARCHAR(15),
        description VARCHAR(80)
    );

CREATE TABLE
    role_permissions (
        role_id INT,
        permission_id INT,
        PRIMARY KEY (role_id, permission_id),
        FOREIGN KEY (role_id) REFERENCES roles (role_id),
        FOREIGN KEY (permission_id) REFERENCES permissions (permission_id)
    );

CREATE TABLE
    job_titles (job_title_id INT PRIMARY KEY, title VARCHAR(20));

CREATE TABLE
    pay_grades (
        pay_grade_id INT PRIMARY KEY,
        paygrade TINYINT,
        grade_name VARCHAR(20)
    );

CREATE TABLE
    contract_statuses (
        cont_status_id INT PRIMARY KEY,
        status VARCHAR(20)
    );

CREATE TABLE
    employees (
        employee_id INT PRIMARY KEY,
        department_id INT,
        supervisor_id INT,
        role_id INT,
        first_name VARCHAR(30),
        last_name VARCHAR(30),
        birth_date DATE,
        gender VARCHAR(10),
        marital_status VARCHAR(10),
        age INT,
        address VARCHAR(80),
        email VARCHAR(30),
        nic VARCHAR(20),
        job_title_id INT,
        pay_grade_id INT,
        contract_status_id INT,
        FOREIGN KEY (department_id) REFERENCES departments (department_id),
        FOREIGN KEY (role_id) REFERENCES roles (role_id),
        FOREIGN KEY (job_title_id) REFERENCES job_titles (job_title_id),
        FOREIGN KEY (pay_grade_id) REFERENCES pay_grades (pay_grade_id),
        FOREIGN KEY (contract_status_id) REFERENCES contract_statuses (cont_status_id)
    );

CREATE TABLE
    employee_dependents (
        dependent_id INT PRIMARY KEY,
        employee_id INT,
        name VARCHAR(30),
        relationship_to_employee VARCHAR(10),
        birth_date DATE,
        FOREIGN KEY (employee_id) REFERENCES employees (employee_id)
    );

CREATE TABLE
    emergency_contacts (
        emergency_id INT PRIMARY KEY,
        employee_id INT,
        name VARCHAR(30),
        relationship VARCHAR(10),
        contact_number VARCHAR(10),
        address VARCHAR(50),
        FOREIGN KEY (employee_id) REFERENCES employees (employee_id)
    );

CREATE TABLE
    leave_applications (
        application_id INT PRIMARY KEY,
        employee_id INT,
        leave_type VARCHAR(30),
        start_date DATE,
        end_date DATE,
        reason VARCHAR(80),
        submission_date DATE,
        status VARCHAR(10),
        FOREIGN KEY (employee_id) REFERENCES employees (employee_id)
    );

CREATE TABLE
    leaves (
        leave_id INT PRIMARY KEY,
        application_id INT,
        deducted_days INT,
        approved_date DATE,
        FOREIGN KEY (application_id) REFERENCES leave_applications (application_id)
    );

CREATE TABLE
    leave_balances (
        leave_balance_id INT PRIMARY KEY,
        employee_id INT,
        annual_leave_balance INT,
        casual_leave_balance INT,
        maternity_leave_balance INT,
        no_pay_leave_balance INT,
        FOREIGN KEY (employee_id) REFERENCES employees (employee_id)
    );

CREATE TABLE
    users (
        user_id INT PRIMARY KEY,
        employee_id INT,
        username VARCHAR(20),
        password VARCHAR(20),
        FOREIGN KEY (employee_id) REFERENCES employees (employee_id)
    );