-- These 3 lines only needed for query submission.No need to add to the project.
-- Uncomment this if DB doesn't exits in PC.

DROP DATABASE IF EXISTS jupiter_apparels;
CREATE DATABASE jupiter_apparels;
USE jupiter_apparels;

SET SQL_SAFE_UPDATES = 0;

-- If DB doesn't exist in PC then comment this out when running the queries for the 1st time.
-- Otherwise, it will give an error indicating branches table and the foreign key do not exist.
-- After creating DB in PC this segment can be uncommented.
-- ALTER TABLE branches
-- DROP FOREIGN KEY fk_manager;


-- Drop all tables
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

-- Drop all functions
DROP FUNCTION IF EXISTS get_used_leaves;

-- Drop all views
DROP VIEW IF EXISTS employee_basic_info;
DROP VIEW IF EXISTS pending_leave_applications;
DROP VIEW IF EXISTS payroll_info;
DROP VIEW IF EXISTS used_leaves_view;
DROP VIEW IF EXISTS remaining_leaves_view;
DROP VIEW IF EXISTS emergency_medical_details;
DROP VIEW IF EXISTS employees_grouped_by_job_title_department_pay_grade;
DROP VIEW IF EXISTS employees_grouped_by_department;
DROP VIEW IF EXISTS total_leaves_by_department;
DROP VIEW IF EXISTS employee_demographics_language_nationality;

-- Drop all triggers
DROP TRIGGER IF EXISTS check_supervisor_before_insert;
DROP TRIGGER IF EXISTS check_supervisor_before_update;
DROP TRIGGER IF EXISTS check_active_job_title_before_insert;
DROP TRIGGER IF EXISTS check_active_job_title_before_update;
DROP TRIGGER IF EXISTS validate_leave_dates_before_insert;
DROP TRIGGER IF EXISTS validate_leave_dates_before_update;
DROP TRIGGER IF EXISTS prevent_overlapping_leaves;
DROP TRIGGER IF EXISTS check_user_account_creation;



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
    contact_number VARCHAR(10),
    manager_id VARCHAR(36) NULL -- FOREIGN KEY (manager_id) REFERENCES Employee(employee_id)
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
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id) ON DELETE CASCADE
);
CREATE TABLE emergency_contacts (
    emergency_id VARCHAR(36) PRIMARY KEY,
    employee_id VARCHAR(36),
    name VARCHAR(80),
    relationship VARCHAR(80),
    contact_number VARCHAR(10),
    address VARCHAR(255),
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id) ON DELETE CASCADE
);
CREATE TABLE leave_applications (
    application_id VARCHAR(36) PRIMARY KEY,
    employee_id VARCHAR(36),
    leave_type ENUM('Annual', 'Casual', 'Maternity', 'Nopay') NOT NULL,
    start_date DATE,
    end_date DATE,
    reason VARCHAR(255),
    submission_date DATE DEFAULT (CURRENT_DATE()),
    status ENUM('Pending', 'Approved', 'Rejected') NOT NULL DEFAULT 'Pending',
    response_date DATE,
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id) ON DELETE CASCADE
);
CREATE TABLE users (
    user_id VARCHAR(36) PRIMARY KEY,
    employee_id VARCHAR(36),
    role ENUM('Admin', 'Employee', 'Manager') DEFAULT 'Employee',
    username VARCHAR(80) NOT NULL UNIQUE,
    password VARCHAR(80) NOT NULL DEFAULT '123', -- Default password for new users added by the HR Manager.
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id) ON DELETE CASCADE
);

ALTER TABLE branches
ADD CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employees(employee_id);

-- ---------------------------------------------------------------------------
-- -------------------------------- Indexing ---------------------------------
-- ---------------------------------------------------------------------------
CREATE INDEX idx_department_id ON employees(department_id);
CREATE INDEX idx_branch_id ON employees(branch_id);
CREATE INDEX idx_supervisor_id ON employees(supervisor_id);
CREATE INDEX idx_job_title_id ON employees(job_title_id);
CREATE INDEX idx_pay_grade_id ON employees(pay_grade_id);


CREATE INDEX idx_employee_id ON leave_applications(employee_id);
CREATE INDEX idx_status ON leave_applications(status);
CREATE INDEX idx_leave_type ON leave_applications(leave_type);

CREATE INDEX idx_pay_grade_id_allocated ON allocated_leaves(pay_grade_id);


-- ---------------------------------------------------------------------------
-- -------------------------------- Functions --------------------------------
-- ---------------------------------------------------------------------------

-- Function to get the total approved leaves of a particular type for a given employee.
-- DELIMITER $$
-- CREATE FUNCTION get_used_leaves(emp_id VARCHAR(36), type ENUM('Annual', 'Casual', 'Maternity', 'Nopay'))
-- RETURNS INT
-- DETERMINISTIC
-- BEGIN
--     DECLARE used_leaves_count INT;
--
--     -- Get the count of approved leaves for the given employee and leave type
--     SELECT COUNT(*)
--     INTO used_leaves_count
--     FROM leave_applications
--     WHERE employee_id = emp_id
--       AND leave_type = type
--       AND status = 'Approved';
--
--     RETURN IFNULL(used_leaves_count, 0);
-- END$$
-- DELIMITER ;

DELIMITER $$
CREATE FUNCTION get_used_leaves(emp_id VARCHAR(36), type ENUM('Annual', 'Casual', 'Maternity', 'Nopay'))
RETURNS INT
DETERMINISTIC
BEGIN
    DECLARE used_leave_days INT;

    -- Calculate the sum of days between start_date and end_date for approved leaves
    SELECT SUM(DATEDIFF(end_date, start_date))
    INTO used_leave_days
    FROM leave_applications
    WHERE employee_id = emp_id
      AND leave_type = type
      AND status = 'Approved';

    RETURN IFNULL(used_leave_days, 0);
END$$
DELIMITER ;


-- ---------------------------------------------------------------------------
-- -------------------------------- Views ------------------------------------
-- ---------------------------------------------------------------------------


-- View for basic employee information.
-- For PIM module.
CREATE VIEW employee_basic_info AS
SELECT
    e.employee_id,
    u.user_id AS user_id,
    u.username AS username,
    u.role AS role,
    e.first_name,
    e.last_name,
    e.birth_date,
    e.gender,
    e.marital_status,
    e.address,
    e.email,
    e.contact_number,
    e.NIC,
    e.cust_attr_1_value,
    e.cust_attr_2_value,
    e.cust_attr_3_value,
    d.name AS department_name,
    d.department_id AS department_id,
    b.name AS branch_name,
    b.branch_id AS branch_id,
    jt.title AS job_title,
    jt.job_title_id AS job_title_id,
    pg.grade_name AS pay_grade,
    pg.pay_grade_id AS pay_grade_id,
    pg.paygrade AS pay_grade_level,
    es.status AS employment_status,
    es.employment_status_id AS employment_status_id,
    CONCAT(s.first_name, ' ', s.last_name) AS supervisor_name,
    e.supervisor_id AS supervisor_id
FROM
    employees e
JOIN
    departments d ON e.department_id = d.department_id
JOIN
    branches b ON e.branch_id = b.branch_id
JOIN
    job_titles jt ON e.job_title_id = jt.job_title_id
JOIN
    pay_grades pg ON e.pay_grade_id = pg.pay_grade_id
JOIN
    employment_statuses es ON e.employment_status_id = es.employment_status_id
LEFT JOIN
    users u ON e.employee_id = u.employee_id
LEFT JOIN
    employees s ON e.supervisor_id = s.employee_id;



-- View for pending leave applications.
-- Can be used when creating a list of pending applications for the supervisor to handle.
CREATE VIEW pending_leave_applications AS
SELECT
    la.application_id,
    CONCAT(e.first_name, ' ', e.last_name) AS employee_name,
    la.leave_type,
    la.start_date,
    la.end_date,
    la.reason,
    la.status,
    la.submission_date,
    la.response_date
FROM
    leave_applications la
JOIN
    employees e ON la.employee_id = e.employee_id
WHERE
    la.status = 'Pending';


-- View to display payroll-related information, including job title, pay grade, and number of dependents per employee.
-- For Payroll Management module.
CREATE VIEW payroll_info AS
SELECT
    e.employee_id,
    CONCAT(e.first_name, ' ', e.last_name) AS employee_name,
    jt.title AS job_title,
    pg.grade_name AS pay_grade,
    COUNT(ed.dependent_id) AS number_of_dependents
FROM
    employees e
JOIN
    job_titles jt ON e.job_title_id = jt.job_title_id
JOIN
    pay_grades pg ON e.pay_grade_id = pg.pay_grade_id
LEFT JOIN
    employee_dependents ed ON e.employee_id = ed.employee_id
GROUP BY
    e.employee_id, jt.title, pg.grade_name;



-- View to show the number of used leaves for each employee by leave category using the reusable function.
-- For leave management module.
-- CREATE VIEW used_leaves_view AS
-- SELECT
--     e.employee_id,
--     CONCAT(e.first_name, ' ', e.last_name) AS employee_name,
--
--     -- Used Annual Leaves
--     get_used_leaves(e.employee_id, 'Annual') AS used_annual_leaves,
--
--     -- Used Casual Leaves
--     get_used_leaves(e.employee_id, 'Casual') AS used_casual_leaves,
--
--     -- Used Maternity Leaves
--     get_used_leaves(e.employee_id, 'Maternity') AS used_maternity_leaves,
--
--     -- Used No-pay Leaves
--     get_used_leaves(e.employee_id, 'Nopay') AS used_nopay_leaves,
--
--     -- Total used leaves
--     (get_used_leaves(e.employee_id, 'Annual') +
--      get_used_leaves(e.employee_id, 'Casual') +
--      get_used_leaves(e.employee_id, 'Maternity') +
--      get_used_leaves(e.employee_id, 'Nopay')) AS total_used_leaves
--
-- FROM employees e;

CREATE VIEW used_leaves_view AS
SELECT
    e.employee_id,
    CONCAT(e.first_name, ' ', e.last_name) AS employee_name,

    -- Used Annual Leaves
    get_used_leaves(e.employee_id, 'Annual') AS used_annual_leaves,

    -- Used Casual Leaves
    get_used_leaves(e.employee_id, 'Casual') AS used_casual_leaves,

    -- Used Maternity Leaves
    get_used_leaves(e.employee_id, 'Maternity') AS used_maternity_leaves,

    -- Used No-pay Leaves
    get_used_leaves(e.employee_id, 'Nopay') AS used_nopay_leaves,

    -- Total used leave days
    (get_used_leaves(e.employee_id, 'Annual') +
     get_used_leaves(e.employee_id, 'Casual') +
     get_used_leaves(e.employee_id, 'Maternity') +
     get_used_leaves(e.employee_id, 'Nopay')) AS total_used_leave_days

FROM employees e;



-- View to show the remaining leaves for each employee by leave category using the reusable function.
-- For leave management module.
-- CREATE VIEW remaining_leaves_view AS
-- SELECT
--     e.employee_id,
--     CONCAT(e.first_name, ' ', e.last_name) AS employee_name,
--
--     -- Remaining Annual Leaves
--     (al.annual_leaves - get_used_leaves(e.employee_id, 'Annual')) AS remaining_annual_leaves,
--
--     -- Remaining Casual Leaves
--     (al.casual_leaves - get_used_leaves(e.employee_id, 'Casual')) AS remaining_casual_leaves,
--
--     -- Remaining Maternity Leaves
--     (al.maternity_leaves - get_used_leaves(e.employee_id, 'Maternity')) AS remaining_maternity_leaves,
--
--     -- Remaining No-pay Leaves
--     (al.no_pay_leaves - get_used_leaves(e.employee_id, 'Nopay')) AS remaining_nopay_leaves,
--
--     -- Total Remaining Leaves
--     ((al.annual_leaves - get_used_leaves(e.employee_id, 'Annual')) +
--      (al.casual_leaves - get_used_leaves(e.employee_id, 'Casual')) +
--      (al.maternity_leaves - get_used_leaves(e.employee_id, 'Maternity')) +
--      (al.no_pay_leaves - get_used_leaves(e.employee_id, 'Nopay'))) AS total_remaining_leaves
--
-- FROM employees e
-- JOIN allocated_leaves al ON e.pay_grade_id = al.pay_grade_id;

CREATE VIEW remaining_leaves_view AS
SELECT
    e.employee_id,
    CONCAT(e.first_name, ' ', e.last_name) AS employee_name,

    -- Remaining Annual Leaves
    (al.annual_leaves - get_used_leaves(e.employee_id, 'Annual')) AS remaining_annual_leaves,

    -- Remaining Casual Leaves
    (al.casual_leaves - get_used_leaves(e.employee_id, 'Casual')) AS remaining_casual_leaves,

    -- Remaining Maternity Leaves
    CASE 
    WHEN e.gender = "Male" THEN 0
    WHEN e.gender = "Female" THEN (al.maternity_leaves - get_used_leaves(e.employee_id, 'Maternity'))
    END AS remaining_maternity_leaves,

    -- Remaining No-pay Leaves
    (al.no_pay_leaves - get_used_leaves(e.employee_id, 'Nopay')) AS remaining_nopay_leaves,

    -- Total Remaining Leaves
    CASE 
    WHEN e.gender = "Male" THEN ((al.annual_leaves - get_used_leaves(e.employee_id, 'Annual')) +
     (al.casual_leaves - get_used_leaves(e.employee_id, 'Casual')) +
     (al.no_pay_leaves - get_used_leaves(e.employee_id, 'Nopay')))
    WHEN e.gender = "Female" THEN 
    ((al.annual_leaves - get_used_leaves(e.employee_id, 'Annual')) +
     (al.casual_leaves - get_used_leaves(e.employee_id, 'Casual')) +
     (al.maternity_leaves - get_used_leaves(e.employee_id, 'Maternity')) +
     (al.no_pay_leaves - get_used_leaves(e.employee_id, 'Nopay'))) AS total_remaining_leave_days

FROM employees e
JOIN allocated_leaves al ON e.pay_grade_id = al.pay_grade_id;


-- Employees group by department
-- For report generation module.
CREATE VIEW employees_grouped_by_department AS
SELECT
    d.department_id,
    d.name AS department_name,
    COUNT(e.employee_id) AS employee_count
FROM
    departments d
LEFT JOIN
    employees e ON d.department_id = e.department_id
GROUP BY
    d.department_id, d.name
ORDER BY
    d.name;


-- Total leaves by department from January 1st to 31st December
-- For report generation module.
CREATE VIEW total_leaves_by_department AS
SELECT
    d.department_id,
    d.name AS department_name,
    SUM(ulv.total_used_leave_days) AS total_leaves_taken
FROM
    used_leaves_view ulv
JOIN
    employees e ON ulv.employee_id = e.employee_id
JOIN
    departments d ON e.department_id = d.department_id
GROUP BY
    d.department_id, d.name
ORDER BY
    d.name;

-- Employee reports grouped by job title, department, pay grade.
-- For report generation module.
CREATE VIEW employees_grouped_by_job_title_department_pay_grade AS
SELECT
    jt.title AS job_title,
    d.name AS department_name,
    pg.grade_name AS pay_grade,
    COUNT(e.employee_id) AS employee_count
FROM
    employees e
JOIN
    job_titles jt ON e.job_title_id = jt.job_title_id
JOIN
    departments d ON e.department_id = d.department_id
JOIN
    pay_grades pg ON e.pay_grade_id = pg.pay_grade_id
GROUP BY
    jt.title, d.name, pg.grade_name
ORDER BY
    jt.title, d.name, pg.grade_name;

-- Custom Report: Employees with their blood group and emergency contact details
-- For reporting module.
CREATE VIEW emergency_medical_details AS
SELECT
    e.employee_id,
    CONCAT(e.first_name, ' ', e.last_name) AS employee_name,
    d.name AS department,
    b.name AS branch,
    e.gender,
    e.cust_attr_2_value ,
    ec.name AS person_to_contact,
    ec.relationship,
    ec.contact_number,
    ec.address
FROM
    employees e
LEFT JOIN
    departments d ON e.department_id = d.department_id
LEFT JOIN
    branches b ON b.branch_id = e.branch_id
LEFT JOIN
    emergency_contacts ec ON ec.employee_id = e.employee_id;

-- Custom Report: Employee demographics grouped by nationality and preferred language
-- This report helps analyze the diversity within the organization and understand language representation.
-- For reporting module.
CREATE VIEW employee_demographics_language_nationality AS
SELECT
    cust_attr_1_value ,
    cust_attr_3_value ,
    COUNT(employee_id)
FROM
    employees
GROUP BY
    cust_attr_1_value, cust_attr_3_value
ORDER BY
    cust_attr_1_value, cust_attr_3_value;


-- ---------------------------------------------------------------------------
-- -------------------------------- Triggers----------------------------------
-- ---------------------------------------------------------------------------


-- Ensures that an employee cannot have themselves as the supervisor.

DELIMITER $$
CREATE TRIGGER check_supervisor_before_insert BEFORE INSERT ON employees
FOR EACH ROW
BEGIN
    IF NEW.supervisor_id = NEW.employee_id THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'The employee and the supervise IDs are the same.';
    END IF;
END$$
DELIMITER ;


DELIMITER $$
CREATE TRIGGER check_supervisor_before_update BEFORE UPDATE ON employees
FOR EACH ROW
BEGIN
    IF NEW.supervisor_id = NEW.employee_id THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'The employee and the supervise IDs are the same.';
    END IF;
END $$
DELIMITER ;



-- Ensures that employees can only be assigned to active(valid) job titles
DELIMITER $$
CREATE TRIGGER check_active_job_title_before_insert BEFORE INSERT ON employees
FOR EACH ROW
BEGIN
    IF NOT EXISTS (SELECT 1 FROM job_titles WHERE job_title_id = NEW.job_title_id) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Job title does not exist or is inactive.';
    END IF;
END $$
DELIMITER ;


DELIMITER $$
CREATE TRIGGER check_active_job_title_before_update BEFORE UPDATE ON employees
FOR EACH ROW
BEGIN
    IF NOT EXISTS (SELECT 1 FROM job_titles WHERE job_title_id = NEW.job_title_id) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Job title does not exist or is inactive.';
    END IF;
END$$
DELIMITER ;


-- Ensures that the leave start date is before the end date.
DELIMITER $$
CREATE TRIGGER validate_leave_dates_before_insert BEFORE INSERT ON leave_applications
FOR EACH ROW
BEGIN
    IF NEW.start_date > NEW.end_date THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Leave start date cannot be after the end date.';
    END IF;
END $$
DELIMITER ;


DELIMITER $$
CREATE TRIGGER validate_leave_dates_before_update BEFORE UPDATE ON leave_applications
FOR EACH ROW
BEGIN
    IF NEW.start_date > NEW.end_date THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Leave start date cannot be after the end date.';
    END IF;
END $$
DELIMITER ;


-- Ensures that employees cannot submit overlapping leave applications.
DELIMITER $$
CREATE TRIGGER prevent_overlapping_leaves BEFORE INSERT ON leave_applications
FOR EACH ROW
BEGIN
    IF EXISTS (SELECT 1 FROM leave_applications
               WHERE employee_id = NEW.employee_id
                 AND ((NEW.start_date BETWEEN start_date AND end_date)
                 OR (NEW.end_date BETWEEN start_date AND end_date))) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Leave applications are overlapping.';
    END IF;
END $$
DELIMITER ;

-- Ensures that employees cannot create more than 1 user account
DELIMITER $$
CREATE TRIGGER check_user_account_creation BEFORE INSERT ON users
FOR EACH ROW
BEGIN
    DECLARE existing_employee_id VARCHAR(255);

    -- Check if the employee_id already exists
    SELECT employee_id INTO existing_employee_id
    FROM users
    WHERE employee_id = NEW.employee_id
    LIMIT 1;

    -- If it exists, raise an error
    IF existing_employee_id IS NOT NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'The Employee Already has an account.';
    END IF;
END $$
DELIMITER ;




DELETE FROM organizations;
DELETE FROM branches;
DELETE FROM departments;
DELETE FROM pay_grades;
DELETE FROM allocated_leaves;
DELETE FROM job_titles;
DELETE FROM employment_statuses;
DELETE FROM employees;
DELETE FROM employee_dependents;
DELETE FROM emergency_contacts;
DELETE FROM leave_applications;
DELETE FROM users;
DELETE FROM custom_attribute_keys;

INSERT INTO organizations VALUES ('0001', 'Jupiter Apparels', '789 main street, Punjab, Pakistan', 19781001);

INSERT INTO branches (branch_id,name,address,contact_number) VALUES ('B001', 'Punjab', '789 Main Street, Punjab, Pakistan', '+924567890');
INSERT INTO branches (branch_id,name,address,contact_number) VALUES ('B002', 'Rangpur', '456 West Blvd, Rangpur, Bangladesh', '+880765431');
INSERT INTO branches (branch_id,name,address,contact_number) VALUES  ('B003', 'Bandaragama', '242 Aluthgama, Bandaragama, Sri Lanka', '+942938476');

INSERT INTO departments VALUES ('D001', 'HR');
INSERT INTO departments VALUES ('D002', 'Finance');
INSERT INTO departments VALUES ('D003', 'IT');
INSERT INTO departments VALUES ('D004', 'Marketing');
INSERT INTO departments VALUES ('D005', 'Production');
INSERT INTO departments VALUES ('D006', 'Customer Service');
INSERT INTO departments VALUES ('D007', 'Sales');
INSERT INTO departments VALUES ('D008', 'Quality Assurance');
INSERT INTO departments VALUES ('D009', 'Corporate Management');

INSERT INTO pay_grades VALUES ('PG001', 1, 'Entry Level');  -- Normal employees(labors)
INSERT INTO pay_grades VALUES ('PG002', 2, 'Mid Level');    -- HR Manager, Accountant, Software Engineer, QA Engineer,...
INSERT INTO pay_grades VALUES ('PG003', 3, 'Senior Level');  -- COO, CFO
INSERT INTO pay_grades VALUES ('PG004', 4, 'Executive Level');  -- CEO

INSERT INTO allocated_leaves VALUES ('PG001', 20, 5, 30, 50);
INSERT INTO allocated_leaves VALUES ('PG002', 25, 7, 45, 55);
INSERT INTO allocated_leaves VALUES ('PG003', 30, 10, 60, 60);
INSERT INTO allocated_leaves VALUES ('PG004', 35, 12,  75, 65);

INSERT INTO job_titles VALUES ('T001', 'Sewing Machine Operator');
INSERT INTO job_titles VALUES ('T002', 'Fabric Cutter');
INSERT INTO job_titles VALUES ('T003', 'Fashion Designer');
INSERT INTO job_titles VALUES ('T004', 'Production Manager');
INSERT INTO job_titles VALUES ('T005', 'Accountant');
INSERT INTO job_titles VALUES ('T006', 'Finance Manager');
INSERT INTO job_titles VALUES ('T007', 'Quality Assurance Engineer');
INSERT INTO job_titles VALUES ('T008', 'Software Engineer');
INSERT INTO job_titles VALUES ('T009', 'HR Manager');
INSERT INTO job_titles VALUES ('T010', 'Chief Financial Officer');
INSERT INTO job_titles VALUES ('T011', 'Chief Operating Officer');
INSERT INTO job_titles VALUES ('T012', 'Chief Executive Officer');

INSERT INTO employment_statuses VALUES ('S001', 'Intern-Fulltime');
INSERT INTO employment_statuses VALUES ('S002', 'Intern-Parttime');
INSERT INTO employment_statuses VALUES ('S003', 'Contract-Fulltime');
INSERT INTO employment_statuses VALUES ('S004', 'Contract-Parttime');
INSERT INTO employment_statuses VALUES ('S005', 'Permanent');
INSERT INTO employment_statuses VALUES ('S006', 'Freelance');

INSERT INTO custom_attribute_keys(name) VALUES ('nationality');
INSERT INTO custom_attribute_keys(name) VALUES ('blood_group');
INSERT INTO custom_attribute_keys(name) VALUES ('preferred_language');

INSERT INTO employees (employee_id, department_id, branch_id, supervisor_id, first_name, last_name, birth_date, gender, marital_status, address, email, NIC, job_title_id, pay_grade_id, employment_status_id,contact_number, cust_attr_1_value, cust_attr_2_value, cust_attr_3_value)
VALUES
('E0001', 'D001', 'B001', NULL, 'Test', 'Admin', '1985-03-15', 'Male', 'Married', '123 Oak St, Springfield, Pakistan', 'john.doe@apparel.com', 'NIC001', 'T009', 'PG002', 'S005','+923034567','Nationality-D','B','English'),
('E0002', 'D009', 'B001', 'E0001', 'Test', 'Manager', '1990-05-22', 'Female', 'Single', '456 Maple Ave, Springfield, Pakistan', 'jane.smith@apparel.com', 'NIC002', 'T011', 'PG003', 'S005','+923012345','Nationality-B','O','English'),
('E0003', 'D009', 'B001', 'E0001', 'Test', 'Supervisor', '1978-12-01', 'Male', 'Married', '789 Pine Rd, City A, Pakistan', 'michael.johnson@apparel.com', 'NIC003', 'T012', 'PG004', 'S005','+923001234','Nationality-A','AB','Tamil'),
('E0004', 'D003', 'B001', 'E0002', 'Test', 'Employee', '1987-08-10', 'Female', 'Single', '321 Elm St, Springfield, Pakistan', 'emily.brown@apparel.com', 'NIC004', 'T008', 'PG002', 'S001','+923045678','Nationality-A','A','Sinhala'),

('E0006', 'D002', 'B001', 'E0003', 'Sophia', 'Miller', '1983-07-25', 'Female', 'Married', '987 Birch St, City B, Pakistan', 'sophia.miller@apparel.com', 'NIC006', 'T010', 'PG003', 'S005','+923023456','Nationality-C','A','Sinhala'),
('E0011', 'D009', 'B002', 'E0003', 'Ethan', 'Lopez', '1989-01-23', 'Male', 'Single', '654 Cedar Ave, City K, Bangladesh', 'ethan.lopez@apparel.com', 'NIC011', 'T011', 'PG003', 'S005','+880171123','Nationality-D','B','Tamil'),
('E0012', 'D009', 'B002', 'E0003', 'Mia', 'Gonzalez', '1988-07-13', 'Female', 'Married', '987 Birch St, City D, Bangladesh', 'mia.gonzalez@apparel.com', 'NIC012', 'T010', 'PG003', 'S005','+880172234','Nationality-A','O','English'),
('E0021', 'D009', 'B003', 'E0003', 'Jack', 'King', '1987-12-04', 'Male', 'Single', '789 Pine Rd, Gampaha, Sri Lanka', 'jack.king@apparel.com', 'NIC021', 'T011', 'PG003', 'S005','+94711234','Nationality-B','A','Sinhala'),
('E0022', 'D009', 'B003', 'E0003', 'Grace', 'Harris', '1990-07-02', 'Female', 'Married', '321 Elm St, Matara, Sri Lanka', 'grace.harris@apparel.com', 'NIC022', 'T010', 'PG003', 'S005','+94722345','Nationality-C','AB','Tamil'),
('E0005', 'D005', 'B001', 'E0002', 'David', 'Jones', '1992-02-14', 'Male', 'Married', '654 Cedar Ave, City A, Pakistan', 'david.jones@apparel.com', 'NIC005', 'T004', 'PG002', 'S005','+923056789','Nationality-B','O','Tamil'),
('E0010', 'D005', 'B001', NULL, 'Olivia', 'Martinez', '1995-06-30', 'Female', 'Single', '321 Elm St, Springfield, Pakistan', 'olivia.martinez@apparel.com', 'NIC010', 'T004', 'PG002', 'S005','+923067890','Nationality-C','A','English'),
('E0008', 'D005', 'B001', 'E0010', 'Ava', 'Taylor', '1993-04-17', 'Female', 'Single', '456 Maple Ave, Springfield, Pakistan', 'ava.taylor@apparel.com', 'NIC008', 'T001', 'PG001', 'S006','+923078904','Nationality-D','B','Sinhala'),
('E0009', 'D005', 'B001', 'E0010', 'Lucas', 'Davis', '1982-11-19', 'Male', 'Married', '789 Pine Rd, City K, Pakistan', 'lucas.davis@apparel.com', 'NIC009', 'T002', 'PG001', 'S004','+923089012','Nationality-A','AB','Tamil'),
('E0007', 'D002', 'B001', 'E0006', 'James', 'Wilson', '1975-09-05', 'Male', 'Married', '123 Oak St, Springfield, Pakistan', 'james.wilson@apparel.com', 'NIC007', 'T006', 'PG002', 'S003','+923023456','Nationality-B','O','English'),
('E0013', 'D001', 'B002', 'E0011', 'Logan', 'Clark', '1976-03-03', 'Male', 'Single', '123 Oak St, City D, Bangladesh', 'logan.clark@apparel.com', 'NIC013', 'T009', 'PG002', 'S005','+880173349','Nationality-C','A','Sinhala'),
('E0014', 'D005', 'B002', 'E0011', 'Isabella', 'Rodriguez', '1991-12-28', 'Female', 'Married', '456 Maple Ave, City G, Bangladesh', 'isabella.rodriguez@apparel.com', 'NIC014', 'T004', 'PG002', 'S003','+880174456','Nationality-D','AB','Tamil'),
('E0017', 'D008', 'B002', 'E0011', 'Elijah', 'Moore', '1980-05-21', 'Male', 'Married', '654 Cedar Ave, City G, Bangladesh', 'elijah.moore@apparel.com', 'NIC017', 'T007', 'PG002', 'S005','+880678901','Nationality-A','B','English'),
('E0015', 'D002', 'B002', 'E0012', 'Mason', 'Martinez', '1984-02-12', 'Male', 'Married', '789 Pine Rd, City G, Bangladesh', 'mason.martinez@apparel.com', 'NIC015', 'T005', 'PG002', 'S005','+880789012','Nationality-B','O','Sinhala'),
('E0016', 'D005', 'B002', 'E0014', 'Amelia', 'Hernandez', '1996-10-01', 'Female', 'Single', '321 Elm St, City D, Bangladesh', 'amelia.hernandez@apparel.com', 'NIC016', 'T003', 'PG002', 'S003','+880890123','Nationality-C','A','Tamil'),
('E0018', 'D005', 'B002', 'E0016', 'Avery', 'Garcia', '1985-09-16', 'Female', 'Single', '987 Birch St, City M, Bangladesh', 'avery.garcia@apparel.com', 'NIC018', 'T001', 'PG001', 'S006','+880901234','Nationality-D','B','English'),
('E0019', 'D005', 'B002', 'E0016', 'Benjamin', 'White', '1992-11-08', 'Male', 'Married', '123 Oak St, City D, Bangladesh', 'benjamin.white@apparel.com', 'NIC019', 'T001', 'PG001', 'S006','+880012345','Nationality-A','AB','Sinhala'),
('E0020', 'D005', 'B002', 'E0016', 'Ella', 'Lee', '1994-03-26', 'Female', 'Single', '456 Maple Ave, City M, Bangladesh', 'ella.lee@apparel.com', 'NIC020', 'T002', 'PG001', 'S004','+880123456','Nationality-B','O','English'),
('E0023', 'D002', 'B003', 'E0022', 'Oliver', 'Young', '1986-06-18', 'Male', 'Married', '654 Cedar Ave, Jaffna, Sri Lanka', 'oliver.young@apparel.com', 'NIC023', 'T005', 'PG002', 'S005','+94773456', 'Nationality-A', 'B', 'Sinhala'),
('E0024', 'D005', 'B003', 'E0021', 'Scarlett', 'Thompson', '1993-08-25', 'Female', 'Single', '987 Birch St, Colombo, Sri Lanka', 'scarlett.thompson@apparel.com', 'NIC024', 'T004', 'PG002', 'S003','+94567890', 'Nationality-B', 'A', 'Tamil'),
('E0025', 'D008', 'B003', 'E0021', 'Henry', 'Martinez', '1982-04-15', 'Male', 'Single', '123 Oak St, Colombo, Sri Lanka', 'henry.martinez@apparel.com', 'NIC025', 'T007', 'PG002', 'S003','+94678901', 'Nationality-C', 'O', 'English'),
('E0026', 'D003', 'B003', 'E0021', 'Luna', 'Perez', '1995-09-28', 'Female', 'Married', '456 Maple Ave, Matara, Sri Lanka', 'luna.perez@apparel.com', 'NIC026', 'T008', 'PG002', 'S002','+94789012', 'Nationality-D', 'AB', 'Sinhala'),
('E0027', 'D005', 'B003', 'E0024', 'Daniel', 'Sanchez', '1981-11-14', 'Male', 'Married', '789 Pine Rd, Matara, Sri Lanka', 'daniel.sanchez@apparel.com', 'NIC027', 'T003', 'PG002', 'S005','+94890123', 'Nationality-A', 'B', 'English'),
('E0028', 'D005', 'B003', 'E0027', 'Victoria', 'Adams', '1997-12-20', 'Female', 'Single', '321 Elm St, Kandy, Sri Lanka', 'victoria.adams@apparel.com', 'NIC028', 'T001', 'PG001', 'S004','+94901234', 'Nationality-B', 'O', 'Tamil'),
('E0029', 'D005', 'B003', 'E0027', 'Sebastian', 'Roberts', '1980-03-09', 'Male', 'Married', '654 Cedar Ave, Colombo, Sri Lanka', 'sebastian.roberts@apparel.com', 'NIC029', 'T002', 'PG001', 'S006','+94012345', 'Nationality-C', 'AB', 'Sinhala'),
('E0030', 'D005', 'B003', 'E0027', 'Aria', 'Scott', '1989-10-30', 'Female', 'Married', '987 Birch St, Colombo, Sri Lanka', 'aria.scott@apparel.com', 'NIC030', 'T001', 'PG001', 'S006','+94123456', 'Nationality-D', 'A', 'English');


INSERT INTO employee_dependents VALUES ('DP0001', 'E0030', 'Alice Doe', 'Daughter', '2010-05-14');
INSERT INTO employee_dependents VALUES ('DP0002', 'E0025', 'Mark Smith', 'Son', '2012-09-22');
INSERT INTO employee_dependents VALUES ('DP0003', 'E0007', 'Olivia Jones', 'Wife', '1986-11-05');
INSERT INTO employee_dependents VALUES ('DP0004', 'E0015', 'David Brown', 'Son', '2015-03-10');
INSERT INTO employee_dependents VALUES ('DP0005', 'E0008', 'Sophia Williams', 'Daughter', '2018-07-25');
INSERT INTO employee_dependents VALUES ('DP0006', 'E0010', 'Emily Martin', 'Daughter', '2013-12-20');
INSERT INTO employee_dependents VALUES ('DP0007', 'E0026', 'Ethan Taylor', 'Son', '2016-01-18');
INSERT INTO employee_dependents VALUES ('DP0008', 'E0028', 'Liam Anderson', 'Son', '2017-02-23');
INSERT INTO employee_dependents VALUES ('DP0009', 'E0019', 'Charlotte Jackson', 'Daughter', '2005-11-11');
INSERT INTO employee_dependents VALUES ('DP0010', 'E0014', 'Isabella Thomas', 'Daughter', '2009-04-04');

INSERT INTO emergency_contacts VALUES ('EC0001', 'E0011', 'Mary Doe', 'Wife', '+880567890', '123 Main St, City A, Bangladesh');
INSERT INTO emergency_contacts VALUES ('EC0002', 'E0002', 'Paul Smith', 'Brother', '+927654321', '456 Second St, City B, Pakistan');
INSERT INTO emergency_contacts VALUES ('EC0003', 'E0030', 'Anna Jones', 'Sister', '+949384756', '789 Third St, City C, Sri Lanka');
INSERT INTO emergency_contacts VALUES ('EC0004', 'E0014', 'James Brown', 'Father', '+880334455', '101 Fourth St, City D, Bangladesh');
INSERT INTO emergency_contacts VALUES ('EC0005', 'E0025', 'Linda Williams', 'Mother', '+943445566', '202 Fifth St, City E, Sri Lanka');
INSERT INTO emergency_contacts VALUES ('EC0006', 'E0006', 'Kevin Martin', 'Husband', '+928776655', '303 Sixth St, City F, Pakistan');
INSERT INTO emergency_contacts VALUES ('EC0007', 'E0027', 'Sarah Taylor', 'Mother', '+944556677', '404 Seventh St, City G, Sri Lanka');
INSERT INTO emergency_contacts VALUES ('EC0008', 'E0018', 'David Anderson', 'Brother', '+880778899', '505 Eighth St, City H, Bangladesh');
INSERT INTO emergency_contacts VALUES ('EC0009', 'E0009', 'Emily Jackson', 'Wife', '+927889900', '606 Ninth St, City I, Pakistan');
INSERT INTO emergency_contacts VALUES ('EC0010', 'E0010', 'John Thomas', 'Husband', '+928990011', '707 Tenth St, City J, Pakistan');

INSERT INTO leave_applications VALUES ('LA0001', 'E0019', 'Annual', '2024-01-10', '2024-01-12', 'Flu', '2024-01-09', 'Approved', '2024-01-10');
INSERT INTO leave_applications VALUES ('LA0002', 'E0027', 'Annual', '2024-02-15', '2024-02-20', 'Vacation', '2024-02-05', 'Approved', '2024-02-06');
INSERT INTO leave_applications VALUES ('LA0003', 'E0028', 'Maternity', '2024-03-01', '2024-05-01', 'Pregnancy', '2024-02-20', 'Pending', NULL);
INSERT INTO leave_applications VALUES ('LA0004', 'E0014', 'Casual', '2024-04-10', '2024-04-12', 'Personal reasons', '2024-04-01', 'Approved', '2024-04-05');
INSERT INTO leave_applications VALUES ('LA0005', 'E0005', 'Casual', '2024-05-05', '2024-05-07', 'Fever', '2024-05-03', 'Rejected', '2024-05-04');
INSERT INTO leave_applications VALUES ('LA0006', 'E0026', 'Annual', '2024-06-12', '2024-06-18', 'Vacation', '2024-06-01', 'Approved', '2024-06-02');
INSERT INTO leave_applications VALUES ('LA0007', 'E0018', 'Annual', '2024-07-01', '2024-07-05', 'Family trip', '2024-06-25', 'Approved', '2024-06-26');
INSERT INTO leave_applications VALUES ('LA0008', 'E0021', 'Casual', '2024-07-10', '2024-07-12', 'Medical checkup', '2024-07-08', 'Approved', '2024-07-09');
INSERT INTO leave_applications VALUES ('LA0009', 'E0030', 'Annual', '2024-07-15', '2024-07-20', 'Vacation', '2024-07-05', 'Pending', NULL);
INSERT INTO leave_applications VALUES ('LA0010', 'E0007', 'Nopay', '2024-08-01', '2024-08-03', 'Personal reasons', '2024-07-30', 'Rejected', '2024-07-31');
INSERT INTO leave_applications VALUES ('LA0011', 'E0024', 'Maternity', '2024-08-10', '2024-8-20', 'Pregnancy', '2024-08-01', 'Approved', '2024-08-02');
INSERT INTO leave_applications VALUES ('LA0012', 'E0029', 'Annual', '2024-08-15', '2024-08-20', 'Family function', '2024-08-05', 'Pending', NULL);
INSERT INTO leave_applications VALUES ('LA0013', 'E0012', 'Casual', '2024-09-01', '2024-09-02', 'Doctor appointment', '2024-08-28', 'Approved', '2024-08-29');
INSERT INTO leave_applications VALUES ('LA0014', 'E0020', 'Annual', '2024-09-05', '2024-09-08', 'Vacation', '2024-08-27', 'Approved', '2024-08-28');
INSERT INTO leave_applications VALUES ('LA0015', 'E0017', 'Annual', '2024-09-15', '2024-09-18', 'Family event', '2024-09-05', 'Approved', '2024-09-06');
INSERT INTO leave_applications VALUES ('LA0016', 'E0023', 'Casual', '2024-09-20', '2024-09-22', 'Sick', '2024-09-19', 'Pending', NULL);
INSERT INTO leave_applications VALUES ('LA0017', 'E0010', 'Annual', '2024-10-01', '2024-10-10', 'Vacation', '2024-09-25', 'Approved', '2024-09-26');
INSERT INTO leave_applications VALUES ('LA0018', 'E0025', 'Nopay', '2024-10-12', '2024-10-15', 'Emergency', '2024-10-10', 'Rejected', '2024-10-11');
INSERT INTO leave_applications VALUES ('LA0019', 'E0027', 'Annual', '2024-10-20', '2024-10-25', 'Family visit', '2024-10-10', 'Pending', NULL);
INSERT INTO leave_applications VALUES ('LA0020', 'E0021', 'Casual', '2024-10-25', '2024-10-26', 'Medical reasons', '2024-10-23', 'Approved', '2024-10-24');
INSERT INTO leave_applications VALUES ('LA0021', 'E0003', 'Annual', '2024-11-01', '2024-11-05', 'Holiday', '2024-10-25', 'Approved', '2024-10-26');
INSERT INTO leave_applications VALUES ('LA0022', 'E0026', 'Nopay', '2024-11-07', '2024-11-09', 'Personal reasons', '2024-11-05', 'Pending', NULL);
INSERT INTO leave_applications VALUES ('LA0023', 'E0015', 'Casual', '2024-11-12', '2024-11-14', 'Sick', '2024-11-10', 'Rejected', '2024-11-11');
INSERT INTO leave_applications VALUES ('LA0024', 'E0030', 'Maternity', '2024-11-20', '2024-11-27', 'Pregnancy', '2024-11-10', 'Approved', '2024-11-11');
INSERT INTO leave_applications VALUES ('LA0025', 'E0012', 'Annual', '2024-12-01', '2024-12-05', 'Family function', '2024-11-20', 'Approved', '2024-11-21');
INSERT INTO leave_applications VALUES ('LA0026', 'E0008', 'Annual', '2024-12-10', '2024-12-15', 'Vacation', '2024-12-01', 'Pending', NULL);
INSERT INTO leave_applications VALUES ('LA0027', 'E0024', 'Casual', '2024-12-20', '2024-12-22', 'Health reasons', '2024-12-18', 'Approved', '2024-12-19');
INSERT INTO leave_applications VALUES ('LA0028', 'E0006', 'Nopay', '2024-01-02', '2024-01-04', 'Family emergency', '2023-12-30', 'Rejected', '2024-01-01');
INSERT INTO leave_applications VALUES ('LA0029', 'E0022', 'Annual', '2024-01-10', '2024-01-15', 'Vacation', '2024-01-02', 'Pending', NULL);
INSERT INTO leave_applications VALUES ('LA0030', 'E0009', 'Casual', '2024-01-20', '2024-01-22', 'Health issues', '2024-01-18', 'Approved', '2024-01-19');
INSERT INTO leave_applications VALUES ('LA0031', 'E0026', 'Maternity', '2024-02-01', '2024-05-01', 'Pregnancy', '2024-01-20', 'Pending', NULL);
INSERT INTO leave_applications VALUES ('LA0032', 'E0003', 'Annual', '2024-02-10', '2024-02-15', 'Family function', '2024-02-01', 'Approved', '2024-02-02');
INSERT INTO leave_applications VALUES ('LA0033', 'E0028', 'Annual', '2024-07-01', '2024-07-05', 'Vacation', '2024-06-20', 'Pending', NULL);
INSERT INTO leave_applications VALUES ('LA0034', 'E0002', 'Nopay', '2024-03-10', '2024-03-12', 'Personal reasons', '2024-03-08', 'Rejected', '2024-03-09');
INSERT INTO leave_applications VALUES ('LA0035', 'E0025', 'Annual', '2024-03-20', '2024-03-25', 'Family event', '2024-03-10', 'Approved', '2024-03-11');
INSERT INTO leave_applications VALUES ('LA0036', 'E0016', 'Casual', '2024-04-01', '2024-04-03', 'Sick', '2024-03-29', 'Pending', NULL);
INSERT INTO leave_applications VALUES ('LA0037', 'E0024', 'Annual', '2024-04-10', '2024-04-12', 'Holiday', '2024-04-01', 'Approved', '2024-04-02');
INSERT INTO leave_applications VALUES ('LA0038', 'E0014', 'Casual', '2024-04-20', '2024-04-21', 'Medical checkup', '2024-04-18', 'Pending', NULL);
INSERT INTO leave_applications VALUES ('LA0039', 'E0001', 'Nopay', '2024-05-01', '2024-05-03', 'Personal reasons', '2024-04-28', 'Rejected', '2024-04-29');
INSERT INTO leave_applications VALUES ('LA0040', 'E0027', 'Annual', '2024-05-10', '2024-05-12', 'Vacation', '2024-04-30', 'Approved', '2024-05-01');
INSERT INTO leave_applications VALUES ('LA0041', 'E0008', 'Maternity', '2024-06-01', '2024-09-01', 'Pregnancy', '2024-05-20', 'Pending', NULL);
INSERT INTO leave_applications VALUES ('LA0042', 'E0010', 'Annual', '2024-06-10', '2024-06-15', 'Family function', '2024-06-01', 'Pending', NULL);
INSERT INTO leave_applications VALUES ('LA0043', 'E0005', 'Casual', '2024-06-20', '2024-06-22', 'Health issues', '2024-06-18', 'Approved', '2024-06-19');
INSERT INTO leave_applications VALUES ('LA0044', 'E0023', 'Nopay', '2024-07-01', '2024-07-05', 'Personal reasons', '2024-06-25', 'Rejected', '2024-06-26');
INSERT INTO leave_applications VALUES ('LA0045', 'E0016', 'Annual', '2024-07-10', '2024-07-15', 'Vacation', '2024-07-01', 'Pending', NULL);
INSERT INTO leave_applications VALUES ('LA0046', 'E0012', 'Annual', '2024-07-20', '2024-07-25', 'Family event', '2024-07-10', 'Pending', NULL);
INSERT INTO leave_applications VALUES ('LA0047', 'E0020', 'Casual', '2024-08-01', '2024-08-02', 'Doctor appointment', '2024-07-30', 'Approved', '2024-07-31');
INSERT INTO leave_applications VALUES ('LA0048', 'E0005', 'Annual', '2024-08-10', '2024-08-12', 'Holiday', '2024-08-01', 'Pending', NULL);
INSERT INTO leave_applications VALUES ('LA0049', 'E0027', 'Nopay', '2024-08-20', '2024-08-25', 'Emergency', '2024-08-15', 'Rejected', '2024-08-16');
INSERT INTO leave_applications VALUES ('LA0050', 'E0018', 'Annual', '2024-09-01', '2024-09-05', 'Vacation', '2024-08-25', 'Pending', NULL);



INSERT INTO users VALUES ('U001', 'E0001', 'Admin', 'admin', '$2a$10$r8rzspq7OAZG1pb4FBXg.OHQNDU9l0bVoaGT90IOByx6sC0lYGnau');
INSERT INTO users VALUES ('U002', 'E0002', 'Manager', 'manager', '$2a$10$r8rzspq7OAZG1pb4FBXg.OHQNDU9l0bVoaGT90IOByx6sC0lYGnau');
INSERT INTO users VALUES ('U003', 'E0003', 'Employee', 'supervisor', '$2a$10$r8rzspq7OAZG1pb4FBXg.OHQNDU9l0bVoaGT90IOByx6sC0lYGnau');
INSERT INTO users VALUES ('U004', 'E0004', 'Employee', 'employee', '$2a$10$r8rzspq7OAZG1pb4FBXg.OHQNDU9l0bVoaGT90IOByx6sC0lYGnau');
INSERT INTO users VALUES ('U005', 'E0030', 'Employee', 'usere', '$2a$10$r8rzspq7OAZG1pb4FBXg.OHQNDU9l0bVoaGT90IOByx6sC0lYGnau');
INSERT INTO users VALUES ('U006', 'E0013', 'Manager', 'Logan.Clark', '$2a$10$r8rzspq7OAZG1pb4FBXg.OHQNDU9l0bVoaGT90IOByx6sC0lYGnau');
INSERT INTO users VALUES ('U007', 'E0005', 'Manager', 'David.Jones', '$2a$10$r8rzspq7OAZG1pb4FBXg.OHQNDU9l0bVoaGT90IOByx6sC0lYGnau');

-- Update branches with the appropriate manager_id
UPDATE branches SET manager_id = 'E0002' WHERE branch_id = 'B001';

UPDATE branches SET manager_id = 'E0011'  WHERE branch_id = 'B002';

UPDATE branches SET manager_id = 'E0021' WHERE branch_id = 'B003';
