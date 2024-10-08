ALTER TABLE branches
DROP FOREIGN KEY fk_manager;

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
DROP VIEW IF EXISTS employees_grouped_by_department;
DROP VIEW IF EXISTS payroll_info;
DROP VIEW IF EXISTS used_leaves_view;
DROP VIEW IF EXISTS remaining_leaves_view;

-- Drop all triggers
DROP TRIGGER IF EXISTS check_supervisor_before_insert;
DROP TRIGGER IF EXISTS check_supervisor_before_update;
DROP TRIGGER IF EXISTS prevent_duplicate_email_before_insert;
DROP TRIGGER IF EXISTS prevent_duplicate_email_before_update;
DROP TRIGGER IF EXISTS prevent_duplicate_nic_before_insert;
DROP TRIGGER IF EXISTS prevent_duplicate_nic_before_update;
DROP TRIGGER IF EXISTS check_active_job_title_before_insert;
DROP TRIGGER IF EXISTS check_active_job_title_before_update;
DROP TRIGGER IF EXISTS validate_leave_dates_before_insert;
DROP TRIGGER IF EXISTS validate_leave_dates_before_update;
DROP TRIGGER IF EXISTS prevent_overlapping_leaves;



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
    role ENUM('Admin', 'Supervisor', 'Employee', 'HR manager') DEFAULT 'Employee',
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
-- -------------------------------- Functions ----------------------------------
-- ---------------------------------------------------------------------------

-- Function to get the total approved leaves of a particular type for a given employee.

CREATE FUNCTION get_used_leaves(emp_id VARCHAR(36), type ENUM('Annual', 'Casual', 'Maternity', 'Nopay'))
RETURNS INT
DETERMINISTIC
BEGIN
    DECLARE used_leaves_count INT;

    -- Get the count of approved leaves for the given employee and leave type
    SELECT COUNT(*)
    INTO used_leaves_count
    FROM leave_applications
    WHERE employee_id = emp_id
      AND leave_type = type
      AND status = 'Approved';

    RETURN IFNULL(used_leaves_count, 0);
END ;


-- ---------------------------------------------------------------------------
-- -------------------------------- Views ----------------------------------
-- ---------------------------------------------------------------------------


-- View for basic employee information.
-- For PIM module.
CREATE VIEW employee_basic_info AS
SELECT
    e.employee_id,
    CONCAT(e.first_name, ' ', e.last_name) AS full_name,
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
    b.name AS branch_name,
    b.address AS branch_address,
    b.contact_number AS branch_contact,
    jt.title AS job_title,
    pg.grade_name AS pay_grade,
    pg.paygrade AS pay_grade_level,
    es.status AS employment_status,
    CONCAT(s.first_name, ' ', s.last_name) AS supervisor_name
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

    -- Total used leaves
    (get_used_leaves(e.employee_id, 'Annual') +
     get_used_leaves(e.employee_id, 'Casual') +
     get_used_leaves(e.employee_id, 'Maternity') +
     get_used_leaves(e.employee_id, 'Nopay')) AS total_used_leaves

FROM employees e;



-- View to show the remaining leaves for each employee by leave category using the reusable function.
-- For leave management module.
CREATE VIEW remaining_leaves_view AS
SELECT
    e.employee_id,
    CONCAT(e.first_name, ' ', e.last_name) AS employee_name,

    -- Remaining Annual Leaves
    (al.annual_leaves - get_used_leaves(e.employee_id, 'Annual')) AS remaining_annual_leaves,

    -- Remaining Casual Leaves
    (al.casual_leaves - get_used_leaves(e.employee_id, 'Casual')) AS remaining_casual_leaves,

    -- Remaining Maternity Leaves
    (al.maternity_leaves - get_used_leaves(e.employee_id, 'Maternity')) AS remaining_maternity_leaves,

    -- Remaining No-pay Leaves
    (al.no_pay_leaves - get_used_leaves(e.employee_id, 'Nopay')) AS remaining_nopay_leaves,

    -- Total Remaining Leaves
    ((al.annual_leaves - get_used_leaves(e.employee_id, 'Annual')) +
     (al.casual_leaves - get_used_leaves(e.employee_id, 'Casual')) +
     (al.maternity_leaves - get_used_leaves(e.employee_id, 'Maternity')) +
     (al.no_pay_leaves - get_used_leaves(e.employee_id, 'Nopay'))) AS total_remaining_leaves

FROM employees e
JOIN allocated_leaves al ON e.pay_grade_id = al.pay_grade_id;



-- ---------------------------------------------------------------------------
-- -------------------------------- Triggers----------------------------------
-- ---------------------------------------------------------------------------


-- Ensures that an employee cannot have themselves as the supervisor.


CREATE TRIGGER check_supervisor_before_insert BEFORE INSERT ON employees
FOR EACH ROW
BEGIN
    IF NEW.supervisor_id = NEW.employee_id THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'The employee and the supervise IDs are the same.';
    END IF;
END ;




CREATE TRIGGER check_supervisor_before_update BEFORE UPDATE ON employees
FOR EACH ROW
BEGIN
    IF NEW.supervisor_id = NEW.employee_id THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'The employee and the supervise IDs are the same.';
    END IF;
END  ;


-- ensures that regular employees cannot be added as supervisors

CREATE TRIGGER check_supervisor_type_before_insert
BEFORE INSERT ON employees
FOR EACH ROW
BEGIN
    DECLARE user_role VARCHAR(50);

    IF NEW.supervisor_id IS NOT NULL THEN
        SELECT u.role INTO user_role
        FROM users u
        WHERE u.employee_id = NEW.supervisor_id;

        IF user_role = 'Employee' THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Regular Employees cannot be Supervisors, Assign Role to supervisor';
        END IF;
        IF user_role IS NULL THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Employees Without accounts cannot be Supervisors, Create Account and assign higher roles';
        END IF;
    END IF;
END;


CREATE TRIGGER check_supervisor_type_before_update
BEFORE UPDATE ON employees
FOR EACH ROW
BEGIN
    DECLARE user_role VARCHAR(50);

    IF NEW.supervisor_id IS NOT NULL THEN
        SELECT u.role INTO user_role
        FROM users u
        WHERE u.employee_id = NEW.supervisor_id;

        IF user_role = 'Employee' THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Regular Employees cannot be Supervisors, Assign Role to supervisor';
        END IF;
        IF user_role IS NULL THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Employees Without accounts cannot be Supervisors, Create Account and assign higher roles';
        END IF;
    END IF;
END;



-- Prevents duplicate emails in the employees table.

CREATE TRIGGER prevent_duplicate_email_before_insert BEFORE INSERT ON employees
FOR EACH ROW
BEGIN
    IF EXISTS (SELECT 1 FROM employees WHERE email = NEW.email AND employee_id != NEW.employee_id) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Email address already in use by another employee.';
    END IF;
END  ;




CREATE TRIGGER prevent_duplicate_email_before_update BEFORE UPDATE ON employees
FOR EACH ROW
BEGIN
    IF EXISTS (SELECT 1 FROM employees WHERE email = NEW.email AND employee_id != NEW.employee_id) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Email address already in use by another employee.';
    END IF;
END ;



-- Prevents duplicate NICs  in the employees table.

CREATE TRIGGER prevent_duplicate_nic_before_insert BEFORE INSERT ON employees
FOR EACH ROW
BEGIN
    IF EXISTS (SELECT 1 FROM employees WHERE NIC = NEW.NIC AND employee_id != NEW.employee_id) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'NIC already exists for another employee.';
    END IF;
END ;




CREATE TRIGGER prevent_duplicate_nic_before_update BEFORE UPDATE ON employees
FOR EACH ROW
BEGIN
    IF EXISTS (SELECT 1 FROM employees WHERE NIC = NEW.NIC AND employee_id != NEW.employee_id) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'NIC already exists for another employee.';
    END IF;
END  ;



-- Ensures that employees can only be assigned to active(valid) job titles

CREATE TRIGGER check_active_job_title_before_insert BEFORE INSERT ON employees
FOR EACH ROW
BEGIN
    IF NOT EXISTS (SELECT 1 FROM job_titles WHERE job_title_id = NEW.job_title_id) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Job title does not exist or is inactive.';
    END IF;
END  ;




CREATE TRIGGER check_active_job_title_before_update BEFORE UPDATE ON employees
FOR EACH ROW
BEGIN
    IF NOT EXISTS (SELECT 1 FROM job_titles WHERE job_title_id = NEW.job_title_id) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Job title does not exist or is inactive.';
    END IF;
END ;



-- Ensures that the leave start date is before the end date.

CREATE TRIGGER validate_leave_dates_before_insert BEFORE INSERT ON leave_applications
FOR EACH ROW
BEGIN
    IF NEW.start_date > NEW.end_date THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Leave start date cannot be after the end date.';
    END IF;
END  ;




CREATE TRIGGER validate_leave_dates_before_update BEFORE UPDATE ON leave_applications
FOR EACH ROW
BEGIN
    IF NEW.start_date > NEW.end_date THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Leave start date cannot be after the end date.';
    END IF;
END  ;



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
END  ;





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

INSERT INTO allocated_leaves VALUES ('PG001', 20, 5, 30, 15); 
INSERT INTO allocated_leaves VALUES ('PG002', 25, 7, 45, 20);
INSERT INTO allocated_leaves VALUES ('PG003', 30, 10, 60, 25);
INSERT INTO allocated_leaves VALUES ('PG004', 0, 12,  75, 30); 

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

-- creating admin, HR Manager , supervisor
INSERT INTO employees (employee_id, department_id, branch_id, supervisor_id, first_name, last_name, birth_date, gender, marital_status, address, email, NIC, job_title_id, pay_grade_id, employment_status_id,contact_number) 
VALUES ('E0004', 'D003', 'B001', NULL, 'Emily', 'Brown', '1987-08-10', 'Female', 'Single', '321 Elm St, Springfield, Pakistan', 'emily.brown@apparel.com', 'NIC004', 'T008', 'PG002', 'S001','+923045678');
INSERT INTO users VALUES ('U001', 'E0004', 'Admin', 'emily.brown', 'password101');

INSERT INTO employees (employee_id, department_id, branch_id, supervisor_id, first_name, last_name, birth_date, gender, marital_status, address, email, NIC, job_title_id, pay_grade_id, employment_status_id,contact_number) 
VALUES ('E0001', 'D001', 'B001', NULL, 'John', 'Doe', '1985-03-15', 'Male', 'Married', '123 Oak St, Springfield, Pakistan', 'john.doe@apparel.com', 'NIC001', 'T009', 'PG002', 'S005','+923034567');
INSERT INTO users VALUES ('U002', 'E0001', 'HR manager', 'John.Doe', 'password303');

INSERT INTO employees (employee_id, department_id, branch_id, supervisor_id, first_name, last_name, birth_date, gender, marital_status, address, email, NIC, job_title_id, pay_grade_id, employment_status_id,contact_number) 
VALUES ('E0013', 'D001', 'B002', NULL, 'Logan', 'Clark', '1976-03-03', 'Male', 'Single', '123 Oak St, City D, Bangladesh', 'logan.clark@apparel.com', 'NIC013', 'T009', 'PG002', 'S005','+880173349');
INSERT INTO users VALUES ('U006', 'E0013', 'HR manager', 'Logan.Clark', 'password707');

INSERT INTO employees (employee_id, department_id, branch_id, supervisor_id, first_name, last_name, birth_date, gender, marital_status, address, email, NIC, job_title_id, pay_grade_id, employment_status_id,contact_number) 
VALUES ('E0007', 'D002', 'B001', 'E0001', 'James', 'Wilson', '1975-09-05', 'Male', 'Married', '123 Oak St, Springfield, Pakistan', 'james.wilson@apparel.com', 'NIC007', 'T006', 'PG002', 'S003','+923023456');
INSERT INTO users VALUES ('U004', 'E0007', 'Supervisor', 'james.Wilson', 'password505');

INSERT INTO employees (employee_id, department_id, branch_id, supervisor_id, first_name, last_name, birth_date, gender, marital_status, address, email, NIC, job_title_id, pay_grade_id, employment_status_id,contact_number) 
VALUES ('E0005', 'D005', 'B001', 'E0013', 'David', 'Jones', '1992-02-14', 'Male', 'Married', '654 Cedar Ave, City A, Pakistan', 'david.jones@apparel.com', 'NIC005', 'T004', 'PG002', 'S005','+923056789');
INSERT INTO users VALUES ('U007', 'E0005', 'Supervisor', 'David.Jones', 'password555');

INSERT INTO employees (employee_id, department_id, branch_id, supervisor_id, first_name, last_name, birth_date, gender, marital_status, address, email, NIC, job_title_id, pay_grade_id, employment_status_id,contact_number) 
VALUES
('E0003', 'D009', 'B001', 'E0001', 'Michael', 'Johnson', '1978-12-01', 'Male', 'Married', '789 Pine Rd, City A, Pakistan', 'michael.johnson@apparel.com', 'NIC003', 'T012', 'PG004', 'S005','+923001234'),
('E0002', 'D009', 'B001', 'E0013', 'Jane', 'Smith', '1990-05-22', 'Female', 'Single', '456 Maple Ave, Springfield, Pakistan', 'jane.smith@apparel.com', 'NIC002', 'T011', 'PG003', 'S005','+923012345'),
('E0006', 'D002', 'B001', 'E0013', 'Sophia', 'Miller', '1983-07-25', 'Female', 'Married', '987 Birch St, City B, Pakistan', 'sophia.miller@apparel.com', 'NIC006', 'T010', 'PG003', 'S005','+923023456'),
('E0011', 'D009', 'B002', 'E0013', 'Ethan', 'Lopez', '1989-01-23', 'Male', 'Single', '654 Cedar Ave, City K, Bangladesh', 'ethan.lopez@apparel.com', 'NIC011', 'T011', 'PG003', 'S005','+880171123'),
('E0012', 'D009', 'B002', 'E0013', 'Mia', 'Gonzalez', '1988-07-13', 'Female', 'Married', '987 Birch St, City D, Bangladesh', 'mia.gonzalez@apparel.com', 'NIC012', 'T010', 'PG003', 'S005','+880172234'),
('E0021', 'D009', 'B003', 'E0013', 'Jack', 'King', '1987-12-04', 'Male', 'Single', '789 Pine Rd, Gampaha, Sri Lanka', 'jack.king@apparel.com', 'NIC021', 'T011', 'PG003', 'S005','+94711234'),
('E0022', 'D009', 'B003', 'E0005', 'Grace', 'Harris', '1990-07-02', 'Female', 'Married', '321 Elm St, Matara, Sri Lanka', 'grace.harris@apparel.com', 'NIC022', 'T010', 'PG003', 'S005','+94722345'),
('E0010', 'D005', 'B001', 'E0005', 'Olivia', 'Martinez', '1995-06-30', 'Female', 'Single', '321 Elm St, Springfield, Pakistan', 'olivia.martinez@apparel.com', 'NIC010', 'T004', 'PG002', 'S005','+923067890'),
('E0008', 'D005', 'B001', 'E0007', 'Ava', 'Taylor', '1993-04-17', 'Female', 'Single', '456 Maple Ave, Springfield, Pakistan', 'ava.taylor@apparel.com', 'NIC008', 'T001', 'PG001', 'S006','+923078904'),
('E0009', 'D005', 'B001', 'E0007', 'Lucas', 'Davis', '1982-11-19', 'Male', 'Married', '789 Pine Rd, City K, Pakistan', 'lucas.davis@apparel.com', 'NIC009', 'T002', 'PG001', 'S004','+923089012'),
('E0014', 'D005', 'B002', 'E0013', 'Isabella', 'Rodriguez', '1991-12-28', 'Female', 'Married', '456 Maple Ave, City G, Bangladesh', 'isabella.rodriguez@apparel.com', 'NIC014', 'T004', 'PG002', 'S003','+880174456'),
('E0017', 'D008', 'B002', 'E0013', 'Elijah', 'Moore', '1980-05-21', 'Male', 'Married', '654 Cedar Ave, City G, Bangladesh', 'elijah.moore@apparel.com', 'NIC017', 'T007', 'PG002', 'S005','+880678901'),
('E0015', 'D002', 'B002', 'E0013', 'Mason', 'Martinez', '1984-02-12', 'Male', 'Married', '789 Pine Rd, City G, Bangladesh', 'mason.martinez@apparel.com', 'NIC015', 'T005', 'PG002', 'S005','+880789012'),
('E0016', 'D005', 'B002', 'E0001', 'Amelia', 'Hernandez', '1996-10-01', 'Female', 'Single', '321 Elm St, City D, Bangladesh', 'amelia.hernandez@apparel.com', 'NIC016', 'T003', 'PG002', 'S003','+880890123'),
('E0018', 'D005', 'B002', 'E0001', 'Avery', 'Garcia', '1985-09-16', 'Female', 'Single', '987 Birch St, City M, Bangladesh', 'avery.garcia@apparel.com', 'NIC018', 'T001', 'PG001', 'S006','+880901234'),
('E0019', 'D005', 'B002', 'E0001', 'Benjamin', 'White', '1992-11-08', 'Male', 'Married', '123 Oak St, City D, Bangladesh', 'benjamin.white@apparel.com', 'NIC019', 'T001', 'PG001', 'S006','+880012345'),
('E0020', 'D005', 'B002', 'E0007', 'Ella', 'Lee', '1994-03-26', 'Female', 'Single', '456 Maple Ave, City M, Bangladesh', 'ella.lee@apparel.com', 'NIC020', 'T002', 'PG001', 'S004','+880123456'),
('E0023', 'D002', 'B003', 'E0001', 'Oliver', 'Young', '1986-06-18', 'Male', 'Married', '654 Cedar Ave, Jaffna, Sri Lanka', 'oliver.young@apparel.com', 'NIC023', 'T005', 'PG002', 'S005','+94773456'),
('E0024', 'D005', 'B003', 'E0007', 'Scarlett', 'Thompson', '1993-08-25', 'Female', 'Single', '987 Birch St, Colombo, Sri Lanka', 'scarlett.thompson@apparel.com', 'NIC024', 'T004', 'PG002', 'S003','+94567890'),
('E0025', 'D008', 'B003', 'E0001', 'Henry', 'Martinez', '1982-04-15', 'Male', 'Single', '123 Oak St, Colombo, Sri Lanka', 'henry.martinez@apparel.com', 'NIC025', 'T007', 'PG002', 'S003','+94678901'),
('E0026', 'D003', 'B003', 'E0007', 'Luna', 'Perez', '1995-09-28', 'Female', 'Married', '456 Maple Ave, Matara, Sri Lanka', 'luna.perez@apparel.com', 'NIC026', 'T008', 'PG002', 'S002','+94789012'),
('E0027', 'D005', 'B003', 'E0005', 'Daniel', 'Sanchez', '1981-11-14', 'Male', 'Married', '789 Pine Rd, Matara, Sri Lanka', 'daniel.sanchez@apparel.com', 'NIC027', 'T003', 'PG002', 'S005','+94890123'),
('E0028', 'D005', 'B003', 'E0005', 'Victoria', 'Adams', '1997-12-20', 'Female', 'Single', '321 Elm St, Kandy, Sri Lanka', 'victoria.adams@apparel.com', 'NIC028', 'T001', 'PG001', 'S004','+94901234'),
('E0029', 'D005', 'B003', 'E0005', 'Sebastian', 'Roberts', '1980-03-09', 'Male', 'Married', '654 Cedar Ave, Colombo, Sri Lanka', 'sebastian.roberts@apparel.com', 'NIC029', 'T002', 'PG001', 'S006','+94012345'),
('E0030', 'D005', 'B003', 'E0001', 'Aria', 'Scott', '1989-10-30', 'Female', 'Married', '987 Birch St, Colombo, Sri Lanka', 'aria.scott@apparel.com', 'NIC030', 'T001', 'PG001', 'S006','+94123456');

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

INSERT INTO leave_applications VALUES ('LA0001', 'E0019', 'Annual', '2023-01-10', '2023-01-12', 'Flu', '2023-01-09', 'Approved', '2023-01-10');
INSERT INTO leave_applications VALUES ('LA0002', 'E0027', 'Annual', '2023-02-15', '2023-02-20', 'Vacation', '2023-02-05', 'Approved', '2023-02-06');
INSERT INTO leave_applications VALUES ('LA0003', 'E0028', 'Maternity', '2023-03-01', '2023-05-01', 'Pregnancy', '2023-02-20', 'Pending', NULL);
INSERT INTO leave_applications VALUES ('LA0004', 'E0014', 'Casual', '2023-04-10', '2023-04-12', 'Personal reasons', '2023-04-01', 'Approved', '2023-04-05');
INSERT INTO leave_applications VALUES ('LA0005', 'E0005', 'Casual', '2023-05-05', '2023-05-07', 'Fever', '2023-05-03', 'Rejected', '2023-05-04');
INSERT INTO leave_applications VALUES ('LA0006', 'E0026', 'Annual', '2023-06-12', '2023-06-18', 'Vacation', '2023-06-01', 'Approved', '2023-06-02');




INSERT INTO users VALUES ('U003', 'E0020', 'Employee', 'Ella.Lee', 'password404');
INSERT INTO users VALUES ('U005', 'E0030', 'Employee', 'Aria.Scott', 'password606');



-- Update branches with the appropriate manager_id
UPDATE branches SET manager_id = 'E0002' WHERE branch_id = 'B001';

UPDATE branches SET manager_id = 'E0011'  WHERE branch_id = 'B002';

UPDATE branches SET manager_id = 'E0021' WHERE branch_id = 'B003';