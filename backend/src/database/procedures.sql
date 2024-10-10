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
    IN emergency_id VARCHAR(255)
)
BEGIN
    SELECT * FROM emergency_contacts WHERE emergency_id = emergency_id;
END $$

-- Procedure to get all emergency contacts
CREATE PROCEDURE getAllEmergencyContacts()
BEGIN
    SELECT * FROM emergency_contacts;
END $$

-- Procedure to update an emergency contact
CREATE PROCEDURE updateEmergencyContact(
    IN emergency_id VARCHAR(255),
    IN employee_id VARCHAR(255),
    IN name VARCHAR(255),
    IN relationship VARCHAR(255),
    IN contact_number VARCHAR(50),
    IN address VARCHAR(255)
)
BEGIN
    UPDATE emergency_contacts
    SET employee_id = employee_id,
        name = name,
        relationship = relationship,
        contact_number = contact_number,
        address = address
    WHERE emergency_id = emergency_id;
END $$

-- Procedure to delete an emergency contact
CREATE PROCEDURE deleteEmergencyContact(
    IN emergency_id VARCHAR(255)
)
BEGIN
    DELETE FROM emergency_contacts WHERE emergency_id = emergency_id;
END $$
DELIMITER ;
DELIMITER $$

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
        birthday,
        gender,
        marital_status,
        address,
        email,
        NIC,
        job_title_id,
        pay_grade_id,
        employee_status_id,
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

-- Procedure to update an employee
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
        birthday = birthday,
        gender = gender,
        marital_status = maritalStatus,
        address = address,
        email = email,
        NIC = NIC,
        job_title_id = jobTitleID,
        pay_grade_id = payGradeID,
        employee_status_id = employeeStatusID,
        contact_number = contactNumber,
        cust_attr_1_value = custAttr1Value,
        cust_attr_2_value = custAttr2Value,
        cust_attr_3_value = custAttr3Value
    WHERE employee_id = employeeID;
END $$

-- Procedure to delete an employee
CREATE PROCEDURE DeleteEmployee(IN employeeID VARCHAR(255))
BEGIN
    DELETE FROM employees WHERE employee_id = employeeID;
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
    IN employeeID VARCHAR(255),
    IN role VARCHAR(50),
    IN username VARCHAR(50),
    IN password VARCHAR(255)
)
BEGIN
    INSERT INTO users (user_id, employee_id, role, username, password)
    VALUES (UUID(), employeeID, role, username, password);
END $$

-- Procedure to get a user by username
CREATE PROCEDURE GetUserByUsername(IN username VARCHAR(50))
BEGIN
    SELECT * FROM users WHERE username = username;
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
CREATE PROCEDURE GetEmployeeDemographicsByLangAndNat(IN p_nationality VARCHAR(50), IN p_language VARCHAR(50))
BEGIN
    SELECT * FROM employee_demographics_language_nationality
    WHERE cust_attr_1_value = p_nationality AND cust_attr_3_value = p_language;
END $$
DELIMITER ;