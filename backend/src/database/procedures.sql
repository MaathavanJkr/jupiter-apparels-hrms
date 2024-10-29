-- ---------------------------------------------------------------------------------
-- drop procedures
DROP PROCEDURE IF EXISTS createAllocatedLeaves;
DROP PROCEDURE IF EXISTS createBranch;
DROP PROCEDURE IF EXISTS createDepartment;
DROP PROCEDURE IF EXISTS createEmergencyContact;
DROP PROCEDURE IF EXISTS CreateEmployee;
DROP PROCEDURE IF EXISTS createEmployeeDependent;
DROP PROCEDURE IF EXISTS CreateJobTitle;
DROP PROCEDURE IF EXISTS CreateLeaveApplication;
DROP PROCEDURE IF EXISTS CreateOrganization;
DROP PROCEDURE IF EXISTS CreatePayGrade;
DROP PROCEDURE IF EXISTS CreateUser;
DROP PROCEDURE IF EXISTS deleteAllocatedLeaves;
DROP PROCEDURE IF EXISTS deleteBranch;
DROP PROCEDURE IF EXISTS deleteDepartment;
DROP PROCEDURE IF EXISTS deleteEmergencyContact;
DROP PROCEDURE IF EXISTS DeleteEmployee;
DROP PROCEDURE IF EXISTS deleteEmployeeDependent;
DROP PROCEDURE IF EXISTS DeleteJobTitle;
DROP PROCEDURE IF EXISTS DeleteLeaveApplication;
DROP PROCEDURE IF EXISTS DeleteOrganization;
DROP PROCEDURE IF EXISTS DeletePayGrade;
DROP PROCEDURE IF EXISTS getAllAllocatedLeaves;
DROP PROCEDURE IF EXISTS getAllBranches;
DROP PROCEDURE IF EXISTS getAllDepartments;
DROP PROCEDURE IF EXISTS getAllEmergencyContacts;
DROP PROCEDURE IF EXISTS GetAllEmployeeBasicInfos;
DROP PROCEDURE IF EXISTS getAllEmployeeDependents;
DROP PROCEDURE IF EXISTS GetAllEmployees;
DROP PROCEDURE IF EXISTS GetAllEmployeesGroupedByDepartment;
DROP PROCEDURE IF EXISTS GetAllEmploymentStatuses;
DROP PROCEDURE IF EXISTS GetAllJobTitles;
DROP PROCEDURE IF EXISTS GetAllLeaveApplications;
DROP PROCEDURE IF EXISTS getAllocatedLeavesByPayGrade;
DROP PROCEDURE IF EXISTS GetAllOrganizations;
DROP PROCEDURE IF EXISTS GetAllPayGrades;
DROP PROCEDURE IF EXISTS GetAllPayrollInfo;
DROP PROCEDURE IF EXISTS GetAllPendingLeaveApplications;
DROP PROCEDURE IF EXISTS GetAllRemainingLeaves;
DROP PROCEDURE IF EXISTS GetAllUsedLeaves;
DROP PROCEDURE IF EXISTS getBranchByID;
DROP PROCEDURE IF EXISTS getDepartmentByID;
DROP PROCEDURE IF EXISTS getEmergencyContactByID;
DROP PROCEDURE IF EXISTS GetEmergencyMedicalDetails;
DROP PROCEDURE IF EXISTS GetEmergencyMedicalDetailsByID;
DROP PROCEDURE IF EXISTS GetEmployeeBasicInfoByID;
DROP PROCEDURE IF EXISTS GetEmployeeByID;
DROP PROCEDURE IF EXISTS GetEmployeeDemographics;
DROP PROCEDURE IF EXISTS GetEmployeeDemographicsByLangAndNat;
DROP PROCEDURE IF EXISTS getEmployeeDependentByID;
DROP PROCEDURE IF EXISTS GetEmployeesGroupedByDepartmentID;
DROP PROCEDURE IF EXISTS GetEmployeesGroupedByJobTitle;
DROP PROCEDURE IF EXISTS GetEmployeesGroupedByJobTitleID;
DROP PROCEDURE IF EXISTS GetEmploymentStatusByID;
DROP PROCEDURE IF EXISTS GetJobTitleByID;
DROP PROCEDURE IF EXISTS GetLeaveApplicationByID;
DROP PROCEDURE IF EXISTS GetOrganizationByID;
DROP PROCEDURE IF EXISTS GetPayGradeByID;
DROP PROCEDURE IF EXISTS GetPayrollInfoByEmployeeID;
DROP PROCEDURE IF EXISTS GetPendingLeaveApplicationByID;
DROP PROCEDURE IF EXISTS GetRemainingLeavesByID;
DROP PROCEDURE IF EXISTS GetTotalLeavesByDepartment;
DROP PROCEDURE IF EXISTS GetTotalLeavesByDepartmentID;
DROP PROCEDURE IF EXISTS GetUsedLeavesByEmployeeID;
DROP PROCEDURE IF EXISTS GetUserByUsername;
DROP PROCEDURE IF EXISTS updateAllocatedLeaves;
DROP PROCEDURE IF EXISTS updateBranch;
DROP PROCEDURE IF EXISTS updateDepartment;
DROP PROCEDURE IF EXISTS updateEmergencyContact;
DROP PROCEDURE IF EXISTS UpdateEmployee;
DROP PROCEDURE IF EXISTS updateEmployeeDependent;
DROP PROCEDURE IF EXISTS UpdateJobTitle;
DROP PROCEDURE IF EXISTS UpdateLeaveApplication;
DROP PROCEDURE IF EXISTS UpdateOrganization;
DROP PROCEDURE IF EXISTS UpdatePayGrade;
DROP PROCEDURE IF EXISTS GetFilteredEmployees;
DROP PROCEDURE IF EXISTS getEmployeeDependentByEmployeeID;
DROP PROCEDURE IF EXISTS getEmergencyContactByEmployeeID;
DROP PROCEDURE IF EXISTS GetFilteredEmployeeCount;
DROP PROCEDURE IF EXISTS GetLeaveApplicationByEmployeeID;
DROP PROCEDURE IF EXISTS getAllLeaveApplicationsForSupervisor;
DROP PROCEDURE IF EXISTS getTotalLeavesByDepartmentForPeriod;
DROP PROCEDURE IF EXISTS getAllEmployeesByFilter;
DROP PROCEDURE IF EXISTS getReportByDepartment;
DROP PROCEDURE IF EXISTS getReportByJobTitle;
DROP PROCEDURE IF EXISTS getReportByPayGrade;
DROP PROCEDURE IF EXISTS getAllLeaveApplicationsForSupervisor;
DROP PROCEDURE IF EXISTS GetEmployeesUnderSupervisor;
DROP PROCEDURE IF EXISTS GetEmployeeIdByUserId;
DROP PROCEDURE IF EXISTS GetAllSupervisorIDs;
DROP PROCEDURE IF EXISTS GetEmployeeBasicInfoByUserID;
DROP PROCEDURE IF EXISTS GetAllCustomAttributes;
DROP PROCEDURE IF EXISTS GetCustomAttributeByKey;
DROP PROCEDURE IF EXISTS GetAllUsers;
DROP PROCEDURE IF EXISTS UpdateUser;
DROP PROCEDURE IF EXISTS DeleteUser;
DROP PROCEDURE IF EXISTS ChangePassword;
DROP PROCEDURE IF EXISTS GetUserByID;
DROP PROCEDURE IF EXISTS GetAllCustomAttributes;
DROP PROCEDURE IF EXISTS GetCustomAttributeByKey;
DROP PROCEDURE IF EXISTS FindSupervisors;
-- ---------------------------------------------------------------------------------




-- Procedure for creating allocated leaves
DELIMITER $$
CREATE PROCEDURE createAllocatedLeaves(
    IN p_annual_leaves INT,
    IN p_casual_leaves INT,
    IN p_maternity_leaves INT,
    IN p_no_pay_leaves INT
)
BEGIN
    INSERT INTO allocated_leaves (pay_grade_id, annual_leaves, casual_leaves, maternity_leaves, no_pay_leaves)
    VALUES (UUID(), p_annual_leaves, p_casual_leaves, p_maternity_leaves, p_no_pay_leaves);
END$$
DELIMITER ;

-- Procedure for retrieving allocated leaves by pay_grade_id
DELIMITER $$
CREATE PROCEDURE getAllocatedLeavesByPayGrade(
    IN p_pay_grade_id VARCHAR(36)
)
BEGIN
    SELECT * FROM allocated_leaves WHERE pay_grade_id = p_pay_grade_id;
END$$
DELIMITER ;

-- Procedure for retrieving all allocated leaves
DELIMITER $$
CREATE PROCEDURE getAllAllocatedLeaves()
BEGIN
    SELECT * FROM allocated_leaves;
END$$
DELIMITER ;

-- Procedure for updating allocated leaves
DELIMITER $$
CREATE PROCEDURE updateAllocatedLeaves(
    IN p_pay_grade_id VARCHAR(36),
    IN p_annual_leaves INT,
    IN p_casual_leaves INT,
    IN p_maternity_leaves INT,
    IN p_no_pay_leaves INT
)
BEGIN
    UPDATE allocated_leaves
    SET annual_leaves = p_annual_leaves, casual_leaves = p_casual_leaves, maternity_leaves = p_maternity_leaves, no_pay_leaves = p_no_pay_leaves
    WHERE pay_grade_id = p_pay_grade_id;
END$$
DELIMITER ;

-- Procedure for deleting allocated leaves by pay_grade_id
DELIMITER $$
CREATE PROCEDURE deleteAllocatedLeaves(
    IN p_pay_grade_id VARCHAR(36)
)
BEGIN
    DELETE FROM allocated_leaves WHERE pay_grade_id = p_pay_grade_id;
END$$
DELIMITER ;


DELIMITER $$

-- Procedure to create a branch
CREATE PROCEDURE createBranch(
    IN p_name VARCHAR(255),
    IN p_address VARCHAR(255),
    IN p_contact_number VARCHAR(20),
    IN p_manager_id VARCHAR(36)
)
BEGIN
    INSERT INTO branches (branch_id, name, address, contact_number, manager_id)
    VALUES (UUID(), p_name, p_address, p_contact_number, p_manager_id);
END$$

-- Procedure to get a branch by ID
CREATE PROCEDURE getBranchByID(
    IN p_branch_id VARCHAR(36)
)
BEGIN
    SELECT * FROM branches WHERE branch_id = p_branch_id;
END$$

-- Procedure to get all branches
CREATE PROCEDURE getAllBranches()
BEGIN
    SELECT * FROM branches;
END$$

-- Procedure to update a branch
CREATE PROCEDURE updateBranch(
    IN p_branch_id VARCHAR(36),
    IN p_name VARCHAR(255),
    IN p_address VARCHAR(255),
    IN p_contact_number VARCHAR(20),
    IN p_manager_id VARCHAR(36)
)
BEGIN
    UPDATE branches
    SET name = p_name, address = p_address, contact_number = p_contact_number, manager_id = p_manager_id
    WHERE branch_id = p_branch_id;
END$$

-- Procedure to delete a branch
CREATE PROCEDURE deleteBranch(
    IN p_branch_id VARCHAR(36)
)
BEGIN
    DELETE FROM branches WHERE branch_id = p_branch_id;
END$$

DELIMITER ;

DELIMITER $$

-- Procedure to create a department
CREATE PROCEDURE createDepartment(
    IN p_name VARCHAR(255)
)
BEGIN
    INSERT INTO departments (department_id, name)
    VALUES (UUID(), p_name);
END$$

-- Procedure to get a department by ID
CREATE PROCEDURE getDepartmentByID(
    IN p_department_id VARCHAR(36)
)
BEGIN
    SELECT * FROM departments WHERE department_id = p_department_id;
END$$

-- Procedure to get all departments
CREATE PROCEDURE getAllDepartments()
BEGIN
    SELECT * FROM departments;
END$$

-- Procedure to update a department
CREATE PROCEDURE updateDepartment(
    IN p_department_id VARCHAR(36),
    IN p_name VARCHAR(255)
)
BEGIN
    UPDATE departments
    SET name = p_name
    WHERE department_id = p_department_id;
END$$

-- Procedure to delete a department
CREATE PROCEDURE deleteDepartment(
    IN p_department_id VARCHAR(36)
)
BEGIN
    DELETE FROM departments WHERE department_id = p_department_id;
END$$

DELIMITER ;


DELIMITER $$

-- Procedure to create an employee dependent
CREATE PROCEDURE createEmployeeDependent(
    IN p_employee_id VARCHAR(36),
    IN p_name VARCHAR(255),
    IN p_relationship_to_employee VARCHAR(255),
    IN p_birth_date DATE
)
BEGIN
    INSERT INTO employee_dependents (dependent_id, employee_id, name, relationship_to_employee, birth_date)
    VALUES (UUID(), p_employee_id, p_name, p_relationship_to_employee, p_birth_date);
END$$

-- Procedure to get an employee dependent by ID
CREATE PROCEDURE getEmployeeDependentByID(
    IN p_dependent_id VARCHAR(36)
)
BEGIN
    SELECT * FROM employee_dependents WHERE dependent_id = p_dependent_id;
END$$

-- Procedure to get all employee dependents
CREATE PROCEDURE getAllEmployeeDependents()
BEGIN
    SELECT * FROM employee_dependents;
END$$

-- Procedure to update an employee dependent
CREATE PROCEDURE updateEmployeeDependent(
    IN p_dependent_id VARCHAR(36),
    IN p_employee_id VARCHAR(36),
    IN p_name VARCHAR(255),
    IN p_relationship_to_employee VARCHAR(255),
    IN p_birth_date DATE
)
BEGIN
    UPDATE employee_dependents
    SET employee_id = p_employee_id,
        name = p_name,
        relationship_to_employee = p_relationship_to_employee,
        birth_date = p_birth_date
    WHERE dependent_id = p_dependent_id;
END$$

-- Procedure to delete an employee dependent
CREATE PROCEDURE deleteEmployeeDependent(
    IN p_dependent_id VARCHAR(36)
)
BEGIN
    DELETE FROM employee_dependents WHERE dependent_id = p_dependent_id;
END$$

-- Procedure to get an employee dependent by employee ID
CREATE PROCEDURE getEmployeeDependentByEmployeeID(
    IN p_employee_id VARCHAR(36)
)
BEGIN
    SELECT * FROM employee_dependents WHERE employee_id = p_employee_id;
END$$

DELIMITER ;

DELIMITER $$
-- Procedure to create an emergency contact
CREATE PROCEDURE createEmergencyContact(
    IN employee_id VARCHAR(255),
    IN name VARCHAR(255),
    IN relationship VARCHAR(255),
    IN contact_number VARCHAR(50),
    IN address VARCHAR(255)
)
BEGIN
    INSERT INTO emergency_contacts (emergency_id, employee_id, name, relationship, contact_number, address)
    VALUES (UUID(), employee_id, name, relationship, contact_number, address);
END $$

-- Procedure to get an emergency contact by ID
CREATE PROCEDURE getEmergencyContactByID(
    IN p_emergency_id VARCHAR(255)
)
BEGIN
    SELECT * FROM emergency_contacts WHERE emergency_id = p_emergency_id;
END $$

-- Procedure to get all emergency contacts
CREATE PROCEDURE getAllEmergencyContacts()
BEGIN
    SELECT * FROM emergency_contacts;
END $$

-- Procedure to update an emergency contact
CREATE PROCEDURE updateEmergencyContact(
    IN p_emergency_id VARCHAR(255),
    IN p_employee_id VARCHAR(255),
    IN p_name VARCHAR(255),
    IN p_relationship VARCHAR(255),
    IN p_contact_number VARCHAR(50),
    IN p_address VARCHAR(255)
)
BEGIN
    UPDATE emergency_contacts
    SET employee_id = p_employee_id,
        name = p_name,
        relationship = p_relationship,
        contact_number = p_contact_number,
        address = p_address
    WHERE emergency_id = p_emergency_id;
END $$

-- Procedure to delete an emergency contact
CREATE PROCEDURE deleteEmergencyContact(
    IN p_emergency_id VARCHAR(255)
)
BEGIN
    DELETE FROM emergency_contacts WHERE emergency_id = p_emergency_id;
END $$
DELIMITER ;
DELIMITER $$

-- Procedure to get an emergency contact by employee ID
CREATE PROCEDURE getEmergencyContactByEmployeeID(
    IN p_employee_id VARCHAR(255)
)
BEGIN
    SELECT * FROM emergency_contacts WHERE employee_id = p_employee_id;
END $$

-- Procedure to create a new employee
CREATE PROCEDURE CreateEmployee(
    IN employeeID VARCHAR(255),
    IN departmentID VARCHAR(255),
    IN branchID VARCHAR(255),
    IN supervisorID VARCHAR(255),
    IN firstName VARCHAR(50),
    IN lastName VARCHAR(50),
    IN birthday DATE,
    IN gender VARCHAR(10),
    IN maritalStatus VARCHAR(10),
    IN address VARCHAR(255),
    IN email VARCHAR(100),
    IN NIC VARCHAR(20),
    IN jobTitleID VARCHAR(255),
    IN payGradeID VARCHAR(255),
    IN employeeStatusID VARCHAR(255),
    IN contactNumber VARCHAR(15),
    IN custAttr1Value VARCHAR(255),
    IN custAttr2Value VARCHAR(255),
    IN custAttr3Value VARCHAR(255)
)
BEGIN
    INSERT INTO employees (
        employee_id,
        department_id,
        branch_id,
        supervisor_id,
        first_name,
        last_name,
        birth_date,
        gender,
        marital_status,
        address,
        email,
        NIC,
        job_title_id,
        pay_grade_id,
        employment_status_id,
        contact_number,
        cust_attr_1_value,
        cust_attr_2_value,
        cust_attr_3_value
    )
    VALUES (
        employeeID,
        departmentID,
        branchID,
        supervisorID,
        firstName,
        lastName,
        birthday,
        gender,
        maritalStatus,
        address,
        email,
        NIC,
        jobTitleID,
        payGradeID,
        employeeStatusID,
        contactNumber,
        custAttr1Value,
        custAttr2Value,
        custAttr3Value
    );
END $$

-- Procedure to get an employee by ID
CREATE PROCEDURE GetEmployeeByID(IN employeeID VARCHAR(255))
BEGIN
    SELECT * FROM employees WHERE employee_id = employeeID;
END $$

-- Procedure to get all employees
CREATE PROCEDURE GetAllEmployees()
BEGIN
    SELECT * FROM employees;
END $$

-- Procedure to get all employees by filter
DELIMITER $$

CREATE PROCEDURE getAllEmployeesByFilter(
    IN p_department_id VARCHAR(36),
    IN p_branch_id VARCHAR(36),
    IN p_job_title_id VARCHAR(36),
    IN p_pay_grade_id VARCHAR(36),
    IN p_employment_status_id VARCHAR(36)
)
BEGIN
    SET @query = 'SELECT 
                     employee_id,
                     first_name,
                     last_name,
                     email,
                     contact_number,
                     department_id,
                     branch_id,
                     job_title_id,
                     pay_grade_id,
                     employment_status_id
                 FROM employees WHERE 1 = 1';

    IF p_department_id IS NOT NULL THEN
        SET @query = CONCAT(@query, ' AND department_id = "', p_department_id, '"');
    END IF;

    IF p_branch_id IS NOT NULL THEN
        SET @query = CONCAT(@query, ' AND branch_id = "', p_branch_id, '"');
    END IF;

    IF p_job_title_id IS NOT NULL THEN
        SET @query = CONCAT(@query, ' AND job_title_id = "', p_job_title_id, '"');
    END IF;

    IF p_pay_grade_id IS NOT NULL THEN
        SET @query = CONCAT(@query, ' AND pay_grade_id = "', p_pay_grade_id, '"');
    END IF;

    IF p_employment_status_id IS NOT NULL THEN
        SET @query = CONCAT(@query, ' AND employment_status_id = "', p_employment_status_id, '"');
    END IF;

    PREPARE stmt FROM @query;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
    
END $$

DELIMITER ;

-- Procedure to update an employee
DELIMITER $$
CREATE PROCEDURE UpdateEmployee(
    IN employeeID VARCHAR(255),
    IN departmentID VARCHAR(255),
    IN branchID VARCHAR(255),
    IN supervisorID VARCHAR(255),
    IN firstName VARCHAR(50),
    IN lastName VARCHAR(50),
    IN birthday DATE,
    IN gender VARCHAR(10),
    IN maritalStatus VARCHAR(10),
    IN address VARCHAR(255),
    IN email VARCHAR(100),
    IN NIC VARCHAR(20),
    IN jobTitleID VARCHAR(255),
    IN payGradeID VARCHAR(255),
    IN employeeStatusID VARCHAR(255),
    IN contactNumber VARCHAR(15),
    IN custAttr1Value VARCHAR(255),
    IN custAttr2Value VARCHAR(255),
    IN custAttr3Value VARCHAR(255)
)
BEGIN
    UPDATE employees
    SET
        department_id = departmentID,
        branch_id = branchID,
        supervisor_id = supervisorID,
        first_name = firstName,
        last_name = lastName,
        birth_date = birthday,
        gender = gender,
        marital_status = maritalStatus,
        address = address,
        email = email,
        NIC = NIC,
        job_title_id = jobTitleID,
        pay_grade_id = payGradeID,
        employment_status_id = employeeStatusID,
        contact_number = contactNumber,
        cust_attr_1_value = custAttr1Value,
        cust_attr_2_value = custAttr2Value,
        cust_attr_3_value = custAttr3Value
    WHERE employee_id = employeeID;
END $$

DELIMITER ;

DELIMITER $$
-- Procedure to delete an employee
CREATE PROCEDURE DeleteEmployee(IN employeeID VARCHAR(255))
BEGIN
    DELETE FROM employees WHERE employee_id = employeeID;
END $$

DELIMITER ;

DELIMITER $$
CREATE PROCEDURE GetFilteredEmployees(
    IN name VARCHAR(255), 
    IN department_id VARCHAR(36),
    IN branch_id VARCHAR(36),
    IN offset INT,
    IN itemsPerPage INT
)
BEGIN 
    SET @query = 'SELECT * FROM employee_basic_info';
    SET @where_clause = '';

    IF name IS NOT NULL AND name != '' THEN
        SET @where_clause = CONCAT(@where_clause, ' first_name LIKE "', name, '%" OR last_name LIKE "', name, '%"');
    END IF; 

    IF department_id IS NOT NULL AND department_id != '' THEN
        IF LENGTH(@where_clause) > 0 THEN
            SET @where_clause = CONCAT(@where_clause, ' AND department_id = "', department_id, '"');
        ELSE
            SET @where_clause = CONCAT(@where_clause, ' department_id = "', department_id, '"');
        END IF;
    END IF;

    IF branch_id IS NOT NULL AND branch_id != '' THEN
        IF LENGTH(@where_clause) > 0 THEN
            SET @where_clause = CONCAT(@where_clause, ' AND branch_id = "', branch_id, '"');
        ELSE
            SET @where_clause = CONCAT(@where_clause, ' branch_id = "', branch_id, '"');
        END IF;
    END IF;

    IF LENGTH(@where_clause) > 0 THEN
        SET @query = CONCAT(@query, ' WHERE ', @where_clause);
    END IF;

    IF offset IS NOT NULL AND itemsPerPage IS NOT NULL AND itemsPerPage != 0 THEN
        SET @query = CONCAT(@query, ' LIMIT ', offset, ', ', itemsPerPage);
    END IF;

    PREPARE stmt FROM @query;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE GetFilteredEmployeeCount(
    IN name VARCHAR(255), 
    IN department_id VARCHAR(36),
    IN branch_id VARCHAR(36)
)
BEGIN 
    SET @query = 'SELECT COUNT(*) as count FROM employees';
    SET @where_clause = '';

    IF name IS NOT NULL AND name != '' THEN
        SET @where_clause = CONCAT(@where_clause, ' first_name LIKE "', name, '%" OR last_name LIKE "', name, '%"');
    END IF; 

    IF department_id IS NOT NULL AND department_id != '' THEN
        IF LENGTH(@where_clause) > 0 THEN
            SET @where_clause = CONCAT(@where_clause, ' AND department_id = "', department_id, '"');
        ELSE
            SET @where_clause = CONCAT(@where_clause, ' department_id = "', department_id, '"');
        END IF;
    END IF;

    IF branch_id IS NOT NULL AND branch_id != '' THEN
        IF LENGTH(@where_clause) > 0 THEN
            SET @where_clause = CONCAT(@where_clause, ' AND branch_id = "', branch_id, '"');
        ELSE
            SET @where_clause = CONCAT(@where_clause, ' branch_id = "', branch_id, '"');
        END IF;
    END IF;

    IF LENGTH(@where_clause) > 0 THEN
        SET @query = CONCAT(@query, ' WHERE ', @where_clause);
    END IF;

    PREPARE stmt FROM @query;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END $$

DELIMITER ;

DELIMITER $$
-- Procedure to get employment status by ID
CREATE PROCEDURE GetEmploymentStatusByID(
    IN empStatusID VARCHAR(255)
)
BEGIN
    SELECT * FROM employment_statuses WHERE employment_status_id = empStatusID;
END $$

-- Procedure to get all employment statuses
CREATE PROCEDURE GetAllEmploymentStatuses()
BEGIN
    SELECT * FROM employment_statuses;
END $$

DELIMITER ;

DELIMITER $$

-- Procedure to create a job title
CREATE PROCEDURE CreateJobTitle(IN jobTitleID VARCHAR(255), IN title VARCHAR(255))
BEGIN
    INSERT INTO job_titles (job_title_id, title) VALUES (jobTitleID, title);
END $$

-- Procedure to get a job title by ID
CREATE PROCEDURE GetJobTitleByID(IN jobTitleID VARCHAR(255))
BEGIN
    SELECT * FROM job_titles WHERE job_title_id = jobTitleID;
END $$

-- Procedure to get all job titles
CREATE PROCEDURE GetAllJobTitles()
BEGIN
    SELECT * FROM job_titles;
END $$

-- Procedure to update a job title
CREATE PROCEDURE UpdateJobTitle(IN jobTitleID VARCHAR(255), IN title VARCHAR(255))
BEGIN
    UPDATE job_titles SET title = title WHERE job_title_id = jobTitleID;
END $$

-- Procedure to delete a job title
CREATE PROCEDURE DeleteJobTitle(IN jobTitleID VARCHAR(255))
BEGIN
    DELETE FROM job_titles WHERE job_title_id = jobTitleID;
END $$

DELIMITER ;

DELIMITER $$

-- Procedure to create a leave application
CREATE PROCEDURE CreateLeaveApplication(
    IN employeeID VARCHAR(255),
    IN leaveType VARCHAR(50),
    IN startDate DATE,
    IN endDate DATE,
    IN reason VARCHAR(255)
)
BEGIN
    INSERT INTO leave_applications (
        application_id,
        employee_id,
        leave_type,
        start_date,
        end_date,
        reason,
        submission_date,
        status,
        response_date
    )
    VALUES (
        UUID(),
        employeeID,
        leaveType,
        startDate,
        endDate,
        reason,
        NOW(),
        'Pending',
        NULL
    );
END $$

-- Procedure to get a leave application by ID
CREATE PROCEDURE GetLeaveApplicationByID(IN applicationID VARCHAR(255))
BEGIN
    SELECT * FROM leave_applications WHERE application_id = applicationID;
END $$

-- Procedure to get all leave applications
CREATE PROCEDURE GetAllLeaveApplications()
BEGIN
    SELECT * FROM leave_applications;
END $$

-- Procedure to update a leave application
CREATE PROCEDURE UpdateLeaveApplication(
    IN applicationID VARCHAR(255),
    IN leaveType VARCHAR(50),
    IN startDate DATE,
    IN endDate DATE,
    IN reason VARCHAR(255),
    IN status VARCHAR(50),
    IN responseDate DATE
)
BEGIN
    UPDATE leave_applications
    SET leave_type = leaveType,
        start_date = startDate,
        end_date = endDate,
        reason = reason,
        status = status,
        response_date = responseDate
    WHERE application_id = applicationID;
END $$

-- Procedure to delete a leave application
CREATE PROCEDURE DeleteLeaveApplication(IN applicationID VARCHAR(255))
BEGIN
    DELETE FROM leave_applications WHERE application_id = applicationID;
END $$

DELIMITER ;



DELIMITER $$

-- Procedure to create an organization
CREATE PROCEDURE CreateOrganization(IN organizationID VARCHAR(255), IN name VARCHAR(255), IN address VARCHAR(255), IN reg_no INT)
BEGIN
    INSERT INTO organizations (organization_id, name, address, reg_no) VALUES (organizationID, name, address, reg_no);
END $$

-- Procedure to get an organization by ID
CREATE PROCEDURE GetOrganizationByID(IN organizationID VARCHAR(255))
BEGIN
    SELECT * FROM organizations WHERE organization_id = organizationID;
END $$

-- Procedure to get all organizations
CREATE PROCEDURE GetAllOrganizations()
BEGIN
    SELECT * FROM organizations;
END $$

-- Procedure to update an organization
CREATE PROCEDURE UpdateOrganization(IN organizationID VARCHAR(255), IN name VARCHAR(255), IN address VARCHAR(255), IN reg_no INT)
BEGIN
    UPDATE organizations SET name = name, address = address, reg_no = reg_no WHERE organization_id = organizationID;
END $$

-- Procedure to delete an organization
CREATE PROCEDURE DeleteOrganization(IN organizationID VARCHAR(255))
BEGIN
    DELETE FROM organizations WHERE organization_id = organizationID;
END $$

DELIMITER ;


DELIMITER $$

-- Procedure to create a pay grade
CREATE PROCEDURE CreatePayGrade(IN payGradeID VARCHAR(255), IN paygrade INT, IN gradeName VARCHAR(255))
BEGIN
    INSERT INTO pay_grades (pay_grade_id, paygrade, grade_name) VALUES (payGradeID, paygrade, gradeName);
END $$

-- Procedure to get a pay grade by ID
CREATE PROCEDURE GetPayGradeByID(IN payGradeID VARCHAR(255))
BEGIN
    SELECT * FROM pay_grades WHERE pay_grade_id = payGradeID;
END $$

-- Procedure to get all pay grades
CREATE PROCEDURE GetAllPayGrades()
BEGIN
    SELECT * FROM pay_grades;
END $$

-- Procedure to update a pay grade
CREATE PROCEDURE UpdatePayGrade(IN payGradeID VARCHAR(255), IN paygrade INT, IN gradeName VARCHAR(255))
BEGIN
    UPDATE pay_grades SET paygrade = paygrade, grade_name = gradeName WHERE pay_grade_id = payGradeID;
END $$

-- Procedure to delete a pay grade
CREATE PROCEDURE DeletePayGrade(IN payGradeID VARCHAR(255))
BEGIN
    DELETE FROM pay_grades WHERE pay_grade_id = payGradeID;
END $$

DELIMITER ;


DELIMITER $$

-- Procedure to create a user
CREATE PROCEDURE CreateUser(
    IN userID VARCHAR(255),
    IN employeeID VARCHAR(255),
    IN role VARCHAR(50),
    IN username VARCHAR(50),
    IN password VARCHAR(255)
)
BEGIN
    INSERT INTO users (user_id, employee_id, role, username, password)
    VALUES (userID, employeeID, role, username, password);
END $$

-- Procedure to get a user by username
CREATE PROCEDURE GetUserByUsername(IN p_username VARCHAR(50))
BEGIN
    SELECT * FROM users WHERE username = p_username;
END $$

-- procedure to get user by ID
CREATE PROCEDURE GetUserByID(IN userID VARCHAR(255))
BEGIN
    SELECT * FROM users WHERE user_id = userID;
END $$

-- procedure to update user
CREATE PROCEDURE UpdateUser(
    IN userID VARCHAR(255),
    IN role VARCHAR(50),
    IN username VARCHAR(50)
)
BEGIN 
    UPDATE users
    SET role = role, username = username
    WHERE user_id = userID;
END $$

CREATE PROCEDURE DeleteUser (IN userID VARCHAR(255)) 
BEGIN
    DELETE FROM users WHERE user_id = userID;
END $$

-- procedure to change password
CREATE PROCEDURE ChangePassword(IN id VARCHAR(255), IN new_password VARCHAR(255))
BEGIN
    UPDATE users
    SET password = new_password
    WHERE user_id = id;
END $$

-- Procedure to get remaining leaves by employee ID
CREATE PROCEDURE GetRemainingLeavesByID(IN p_employee_id VARCHAR(36))
BEGIN
    SELECT * FROM remaining_leaves_view WHERE employee_id = p_employee_id;
END $$

-- Procedure to get all remaining leaves
CREATE PROCEDURE GetAllRemainingLeaves()
BEGIN
    SELECT * FROM remaining_leaves_view;
END $$

-- Procedure to get employee basic info by employee ID.
CREATE PROCEDURE GetEmployeeBasicInfoByID(IN p_employee_id VARCHAR(36))
BEGIN
    SELECT * FROM employee_basic_info WHERE employee_id = p_employee_id;
END $$
-- Procedure to get employee basic info by user ID. 
CREATE PROCEDURE GetEmployeeBasicInfoByUserID(IN p_user_id VARCHAR(36))
BEGIN
    SELECT * FROM employee_basic_info WHERE user_id = p_user_id;
END $$

-- Procedure to get employee basic info.
CREATE PROCEDURE GetAllEmployeeBasicInfos()
BEGIN
    SELECT * FROM employee_basic_info;
END $$

-- Procedure to get all pending leave applications
CREATE PROCEDURE GetAllPendingLeaveApplications()
BEGIN
    SELECT * FROM pending_leave_applications;
END $$

-- Procedure to get pending leave application by application ID
CREATE PROCEDURE GetPendingLeaveApplicationByID(IN p_application_id VARCHAR(36))
BEGIN
    SELECT * FROM pending_leave_applications WHERE application_id = p_application_id;
END $$


-- Procedure to get all payroll information
CREATE PROCEDURE GetAllPayrollInfo()
BEGIN
    SELECT * FROM payroll_info;
END $$

-- Procedure to get payroll information by employee ID
CREATE PROCEDURE GetPayrollInfoByEmployeeID(IN p_employee_id VARCHAR(36))
BEGIN
    SELECT * FROM payroll_info WHERE employee_id = p_employee_id;
END $$

-- Procedure to get all used leaves
CREATE PROCEDURE GetAllUsedLeaves()
BEGIN
    SELECT * FROM used_leaves_view;
END $$

-- Procedure to get used leaves by employee ID
CREATE PROCEDURE GetUsedLeavesByEmployeeID(IN p_employee_id VARCHAR(36))
BEGIN
    SELECT * FROM used_leaves_view WHERE employee_id = p_employee_id;
END $$

-- Procedure to get all employees grouped by department
CREATE PROCEDURE GetAllEmployeesGroupedByDepartment()
BEGIN
    SELECT * FROM employees_grouped_by_department;
END $$

-- Procedure to get employees grouped by department ID
CREATE PROCEDURE GetEmployeesGroupedByDepartmentID(IN p_department_id VARCHAR(36))
BEGIN
    SELECT * FROM employees_grouped_by_department WHERE department_id = p_department_id;
END $$

-- Procedure to get total leaves by department
CREATE PROCEDURE GetTotalLeavesByDepartment()
BEGIN
    SELECT * FROM total_leaves_by_department;
END $$

-- Procedure to get total leaves by department ID
CREATE PROCEDURE GetTotalLeavesByDepartmentID(IN p_department_id VARCHAR(36))
BEGIN
    SELECT * FROM total_leaves_by_department WHERE department_id = p_department_id;
END $$

-- Procedure to get employees grouped by job title, department, and pay grade
CREATE PROCEDURE GetEmployeesGroupedByJobTitle()
BEGIN
    SELECT * FROM employees_grouped_by_job_title_department_pay_grade;
END $$

-- Procedure to get employees grouped by specific job title
CREATE PROCEDURE GetEmployeesGroupedByJobTitleID(IN p_job_title VARCHAR(100))
BEGIN
    SELECT * FROM employees_grouped_by_job_title_department_pay_grade WHERE job_title = p_job_title;
END $$

-- Procedure to get emergency medical details for all employees
CREATE PROCEDURE GetEmergencyMedicalDetails()
BEGIN
    SELECT * FROM emergency_medical_details;
END $$

-- Procedure to get emergency medical details by employee ID
CREATE PROCEDURE GetEmergencyMedicalDetailsByID(IN p_employee_id VARCHAR(36))
BEGIN
    SELECT * FROM emergency_medical_details WHERE employee_id = p_employee_id;
END $$


-- Procedure to get employee demographics grouped by nationality and preferred language
CREATE PROCEDURE GetEmployeeDemographics()
BEGIN
    SELECT * FROM employee_demographics_language_nationality;
END $$

-- Procedure to get employee demographics by nationality and preferred language
CREATE PROCEDURE GetEmployeeDemographicsByLangAndNat(IN p_cust_attr_1_value VARCHAR(50), IN p_cust_attr_3_value VARCHAR(50))
BEGIN
    SELECT * FROM employee_demographics_language_nationality
    WHERE cust_attr_1_value = p_cust_attr_1_value AND cust_attr_3_value = p_cust_attr_3_value;
END $$
DELIMITER ;

--Procedure to get all the leave applications for a supervisor
DELIMITER $$
CREATE PROCEDURE getAllLeaveApplicationsForSupervisor(
IN super_id VARCHAR(36))
BEGIN

	SELECT * FROM leave_applications WHERE application_id IN (
	SELECT application_id FROM leave_applications JOIN employees 
    ON leave_applications.employee_id = employees.employee_id 
    WHERE employees.supervisor_id = super_id);

END$$ 
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE getTotalLeavesByDepartmentForPeriod(
    IN p_start_date DATE,
    IN p_end_date DATE
)
BEGIN
    SELECT 
        d.department_id,
        d.name AS department_name,
        COUNT(la.application_id) AS total_leaves
    FROM 
        employees e
    JOIN 
        departments d ON e.department_id = d.department_id
    JOIN 
        leave_applications la ON e.employee_id = la.employee_id
    WHERE 
        la.start_date BETWEEN p_start_date AND p_end_date
    GROUP BY 
        d.department_id
    ORDER BY 
        d.name;
END $$

DELIMITER ;

DELIMITER $$
CREATE PROCEDURE GetLeaveApplicationByEmployeeID(IN employeeID VARCHAR(255))
BEGIN
    SELECT * FROM leave_applications WHERE employee_id = employeeID;
END $$

DELIMITER ;

DELIMITER $$
CREATE PROCEDURE GetEmployeesUnderSupervisor(IN supervisorID VARCHAR(255))
BEGIN
    SELECT * FROM employees WHERE supervisor_id = supervisorID;
END $$

DELIMITER ;

DELIMITER $$
CREATE PROCEDURE GetEmployeeIdByUserId(IN userID VARCHAR(255))
BEGIN
    SELECT employee_id FROM users WHERE user_id = userID;
END $$

DELIMITER ;

DELIMITER $$
-- Procedure to get all non-null supervisors
CREATE PROCEDURE GetAllSupervisorIDs()
BEGIN
    SELECT DISTINCT supervisor_id
    FROM employees
    WHERE supervisor_id IS NOT NULL;
END $$
DELIMITER ;

DELIMITER $$
-- procedure to get all custom attribute names
CREATE PROCEDURE GetAllCustomAttributes()
BEGIN 
    SELECT name FROM custom_attribute_keys;
END $$

-- procedure to get specific custom attribute name by key
CREATE PROCEDURE GetCustomAttributeByKey(IN attr_key INT) 
BEGIN 
    SELECT name FROM custom_attribute_keys WHERE custom_attribute_key_id = attr_key;
END $$

DELIMITER ;

DELIMITER $$
CREATE PROCEDURE GetAllUsers()
BEGIN
    SELECT * FROM users;
END $$

DELIMITER ;

-- procedure to get possible supervisors for an employee

DELIMITER $$

CREATE PROCEDURE FindSupervisors(
    IN p_employee_id VARCHAR(255),
    IN p_department_id VARCHAR(255),
    IN p_pay_grade_id VARCHAR(255)
)
BEGIN
    DECLARE p_pay_grade_level INT;

    -- Assign pay grade level to the variable
    SELECT paygrade INTO p_pay_grade_level 
    FROM pay_grades 
    WHERE pay_grade_id = p_pay_grade_id;

    -- Select supervisors based on department and pay grade level
    SELECT CONCAT(first_name, ' ', last_name) AS full_name, employee_id AS supervisor_id 
    FROM employee_basic_info
    WHERE(department_id = p_department_id AND pay_grade_level > p_pay_grade_level AND employee_id != p_employee_id) 
          OR (role = 'Admin');
END $$

DELIMITER ;

