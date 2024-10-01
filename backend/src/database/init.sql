DROP TABLE IF EXISTS leave_applications;
DROP TABLE IF EXISTS emergency_contacts;
DROP TABLE IF EXISTS employee_dependents;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS allocated_leaves;
DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS employment_statuses;
DROP TABLE IF EXISTS pay_grades;
DROP TABLE IF EXISTS job_titles;
DROP TABLE IF EXISTS organizations;
DROP TABLE IF EXISTS branches;
DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS custom_attribute_keys;

CREATE TABLE organizations (
    organization_id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(80),
    address VARCHAR(255),
    reg_no INT
);
CREATE TABLE departments (
    department_id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(80)
);
CREATE TABLE pay_grades (
    pay_grade_id VARCHAR(36) PRIMARY KEY,
    paygrade INT,
    grade_name VARCHAR(36)
);
CREATE TABLE job_titles (
    job_title_id VARCHAR(36) PRIMARY KEY,
    title VARCHAR(80)
);
CREATE TABLE employment_statuses (
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
CREATE TABLE branches (
    branch_id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(80),
    address VARCHAR(255),
    contact_number VARCHAR(10) -- manager_id VARCHAR(36)
    -- FOREIGN KEY (manager_id) REFERENCES Employee(employee_id)
);
CREATE TABLE employees (
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
    cust_attr_1_value VARCHAR(255),
    cust_attr_2_value VARCHAR(255),
    cust_attr_3_value VARCHAR(255),
    FOREIGN KEY (department_id) REFERENCES departments(department_id),
    FOREIGN KEY (branch_id) REFERENCES branches(branch_id),
    FOREIGN KEY (supervisor_id) REFERENCES employees(employee_id),
    FOREIGN KEY (job_title_id) REFERENCES job_titles(job_title_id),
    FOREIGN KEY (pay_grade_id) REFERENCES pay_grades(pay_grade_id),
    FOREIGN KEY (employment_status_id) REFERENCES employment_statuses(employment_status_id)
);
CREATE TABLE custom_attribute_keys (
    custom_attribute_key_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(80) NOT NULL
);
CREATE TABLE allocated_leaves (
    pay_grade_id VARCHAR(36),
    annual_leaves INT,
    casual_leaves INT,
    maternity_leaves INT,
    no_pay_leaves INT,
    PRIMARY KEY (pay_grade_id),
    FOREIGN KEY (pay_grade_id) REFERENCES pay_grades(pay_grade_id)
);
CREATE TABLE employee_dependents (
    dependent_id VARCHAR(36) PRIMARY KEY,
    employee_id VARCHAR(36),
    name VARCHAR(80),
    relationship_to_employee VARCHAR(80),
    birth_date DATE,
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
);
CREATE TABLE emergency_contacts (
    emergency_id VARCHAR(36) PRIMARY KEY,
    employee_id VARCHAR(36),
    name VARCHAR(80),
    relationship VARCHAR(80),
    contact_number VARCHAR(10),
    address VARCHAR(255),
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
);
CREATE TABLE leave_applications (
    application_id VARCHAR(36) PRIMARY KEY,
    employee_id VARCHAR(36),
    leave_type ENUM('Annual', 'Casual', 'Maternity', 'Nopay') NOT NULL,
    start_date DATE,
    end_date DATE,
    reason VARCHAR(255),
    submission_date DATE DEFAULT CURRENT_DATE(),
    status ENUM('Pending', 'Approved', 'Rejected') NOT NULL DEFAULT 'Pending',
    response_date DATE,
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
);
CREATE TABLE users (
    user_id VARCHAR(36) PRIMARY KEY,
    employee_id VARCHAR(36),
    role ENUM('Admin', 'Supervisor', 'Employee', 'HR manager') DEFAULT 'Employee',
    username VARCHAR(80) NOT NULL UNIQUE,
    password VARCHAR(80) NOT NULL DEFAULT '123', -- Default password for new users added by the HR Manager.
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
);

---------------------------------- Triggers----------------------------------

-- Ensures that an employee cannot have themselves as the supervisor.
CREATE TRIGGER check_supervisor BEFORE INSERT OR UPDATE ON employees
FOR EACH ROW
BEGIN
    IF NEW.supervisor_id = NEW.employee_id THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'The employee and the supervise IDs are the same.';
    END IF;
END;


-- Prevents duplicate emails in the employees table.
CREATE TRIGGER prevent_duplicate_email BEFORE INSERT OR UPDATE ON employees
FOR EACH ROW
BEGIN
    IF EXISTS (SELECT 1 FROM employees WHERE email = NEW.email AND employee_id != NEW.employee_id) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Email address already in use by another employee.';
    END IF;
END;


-- Prevents duplicate NICs  in the employees table.
CREATE TRIGGER prevent_duplicate_nic BEFORE INSERT OR UPDATE ON employees
FOR EACH ROW
BEGIN
    IF EXISTS (SELECT 1 FROM employees WHERE NIC = NEW.NIC AND employee_id != NEW.employee_id) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'NIC already exists for another employee.';
    END IF;
END;


-- Automatically allocates leaves to a new employee based on their pay grade.
CREATE TRIGGER assign_default_leaves AFTER INSERT ON employees
FOR EACH ROW
BEGIN
    DECLARE annual_leaves INT;
    DECLARE casual_leaves INT;
    DECLARE maternity_leaves INT;
    DECLARE no_pay_leaves INT;

    CASE NEW.pay_grade_id
        WHEN '1' THEN
            SET annual_leaves = 20, casual_leaves = 5, maternity_leaves = 30, no_pay_leaves = 15;
        WHEN '2' THEN
            SET annual_leaves = 25, casual_leaves = 7, maternity_leaves = 45, no_pay_leaves = 20;
        WHEN '3' THEN
            SET annual_leaves = 30, casual_leaves = 10, maternity_leaves = 60, no_pay_leaves = 25;
        WHEN '4' THEN
            SET annual_leaves = 35, casual_leaves = 12, maternity_leaves = 75, no_pay_leaves = 30;
        WHEN '5' THEN
            SET annual_leaves = 40, casual_leaves = 15, maternity_leaves = 90, no_pay_leaves = 40;
        ELSE
            SET annual_leaves = 0, casual_leaves = 0, maternity_leaves = 0, no_pay_leaves = 0;
    END CASE;

    INSERT INTO allocated_leaves (pay_grade_id, annual_leaves, casual_leaves, maternity_leaves, no_pay_leaves)
    VALUES (NEW.pay_grade_id, annual_leaves, casual_leaves, maternity_leaves, no_pay_leaves);
END;


-- Ensures that employees can only be assigned to active(valid) job titles
CREATE TRIGGER check_active_job_title BEFORE INSERT OR UPDATE ON employees
FOR EACH ROW
BEGIN
    IF NOT EXISTS (SELECT 1 FROM job_titles WHERE job_title_id = NEW.job_title_id) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Job title does not exist or is inactive.';
    END IF;
END;


-- Deducts the number of leave days from employee's allocated leaves after a leave application is approved.
CREATE TRIGGER update_leave_balance AFTER UPDATE ON leave_applications
FOR EACH ROW
BEGIN
    IF NEW.status = 'Approved' THEN
        DECLARE leave_days INT;
        SET leave_days = DATEDIFF(NEW.end_date, NEW.start_date) + 1; -- Calculates the approved no. of leave days.

        CASE NEW.leave_type
            WHEN 'Annual' THEN
                UPDATE allocated_leaves SET annual_leaves = annual_leaves - leave_days
                WHERE pay_grade_id = (SELECT pay_grade_id FROM employees WHERE employee_id = NEW.employee_id);
            WHEN 'Casual' THEN
                UPDATE allocated_leaves SET casual_leaves = casual_leaves - leave_days
                WHERE pay_grade_id = (SELECT pay_grade_id FROM employees WHERE employee_id = NEW.employee_id);
            WHEN 'Maternity' THEN
                UPDATE allocated_leaves SET maternity_leaves = maternity_leaves - leave_days
                WHERE pay_grade_id = (SELECT pay_grade_id FROM employees WHERE employee_id = NEW.employee_id);
            WHEN 'Nopay' THEN
                UPDATE allocated_leaves SET no_pay_leaves = no_pay_leaves - leave_days
                WHERE pay_grade_id = (SELECT pay_grade_id FROM employees WHERE employee_id = NEW.employee_id);
        END CASE;
    END IF;
END;


-- Ensures that the leave start date is before the end date.
CREATE TRIGGER validate_leave_dates BEFORE INSERT OR UPDATE ON leave_applications
FOR EACH ROW
BEGIN
    IF NEW.start_date > NEW.end_date THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Leave start date cannot be after the end date.';
    END IF;
END;


-- Ensures that employees cannot submit overlapping leave applications.
CREATE TRIGGER prevent_overlapping_leaves BEFORE INSERT ON leave_applications
FOR EACH ROW
BEGIN
    IF EXISTS (SELECT 1 FROM leave_applications
               WHERE employee_id = NEW.employee_id
                 AND ((NEW.start_date BETWEEN start_date AND end_date)
                 OR (NEW.end_date BETWEEN start_date AND end_date))) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Leave applications are overlapping.';
    END IF;
END;



