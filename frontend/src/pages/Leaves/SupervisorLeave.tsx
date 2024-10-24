import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import { Employee, LeaveApplication } from '../../types/types'; // Ensure LeaveApplication is defined
import { useEffect, useState } from 'react';
import LeaveTable from '../../components/Tables/LeaveTable';

const SupervisorLeave = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [leaveApplications, setLeaveApplications] = useState<LeaveApplication[]>([]);
  const navigate = useNavigate();
  const isSupervisor = true; // Implement your logic to check if the user is a supervisor

  // Redirect if not a supervisor
  useEffect(() => {
    if (!isSupervisor) {
      navigate('/');
    }
  }, [isSupervisor, navigate]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        // Mock data fetching for demonstration purposes
        const fetchedEmployees: Employee[] = [
          {
            employee_id: "EMP001",
            department_id: "DEP001",
            branch_id: "BR001",
            supervisor_id: "SUP001",
            first_name: "John",
            last_name: "Doe",
            birth_date: "1990-01-15",
            gender: "Male",
            marital_status: "Single",
            address: "123 Main St, Cityville",
            email: "johndoe@example.com",
            NIC: "NIC00123",
            job_title_id: "JT001",
            pay_grade_id: "PG001",
            employment_status_id: "ES001",
            contact_number: "123-456-7890",
            cust_attr_1_value: "Attr1",
            cust_attr_2_value: "Attr2",
            cust_attr_3_value: "Attr3", // Corrected typo
          },
          {
            employee_id: "EMP002",
            department_id: "DEP002",
            branch_id: "BR002",
            supervisor_id: "SUP002",
            first_name: "Jane",
            last_name: "Smith",
            birth_date: "1985-07-24",
            gender: "Female",
            marital_status: "Married",
            address: "456 Oak St, Townsville",
            email: "janesmith@example.com",
            NIC: "NIC00456",
            job_title_id: "JT002",
            pay_grade_id: "PG002",
            employment_status_id: "ES002",
            contact_number: "987-654-3210",
            cust_attr_1_value: "Attr1",
            cust_attr_2_value: "Attr2",
            cust_attr_3_value: "Attr3", // Corrected typo
          }
        ];

        setEmployees(fetchedEmployees);
      } catch (error) {
        console.log('Error Fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  // Mock function to fetch leave applications for an employee
  const fetchLeaveApplications = async (employee_id: string) => {
    try {
      // Mock data fetching for demonstration purposes
      const applications: LeaveApplication[] = [
        {
          application_id: "LA001",
          employee_id,
          leave_type: "Sick",
          start_date: "2024-10-01",
          end_date: "2024-10-05",
          reason: "Flu",
          submission_date: "2024-09-30",
          status: "Approved",
          response_date: "2024-09-30",
        },
        {
          application_id: "LA002",
          employee_id,
          leave_type: "Annual",
          start_date: "2024-10-10",
          end_date: "2024-10-15",
          reason: "Vacation",
          submission_date: "2024-10-01",
          status: "Pending",
          response_date: null, // This can remain as null if your type definition allows it
        },
      ];

      // Set leave applications for the given employee
      setLeaveApplications((prev) => [...prev, ...applications]);
    } catch (error) {
      console.log('Error Fetching leave applications:', error);
    }
  };

  useEffect(() => {
    // Fetch leave applications for each employee
    employees.forEach(employee => {
      fetchLeaveApplications(employee.employee_id);
    });
  }, [employees]);

  return (
      <DefaultLayout>
        <Breadcrumb pageName="Leaves" />
        <h2>Employee Leaves</h2>
        {employees.length > 0 ? (
            employees.map((employee) => (
                <div key={employee.employee_id} style={{ marginBottom: '20px' }}>
                  <h3>
                    {employee.first_name} {employee.last_name}
                  </h3>
                  <LeaveTable
                      leaveApplications={leaveApplications.filter(app => app.employee_id === employee.employee_id)}
                  />
                </div>
            ))
        ) : (
            <p>No employees found.</p>
        )}
      </DefaultLayout>
  );
};

export default SupervisorLeave;
