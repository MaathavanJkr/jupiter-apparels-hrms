import { useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import { Employee } from '../../types/types';
import { useEffect, useState } from 'react';
import { getEmployeesUnder } from '../../services/supervisorServices';
import LeaveTable from '../../components/Tables/LeaveTable';

const SupervisorLeave = () => {
  const { supervisor_id } = useParams<{ supervisor_id: string }>();
  condolr
  const [employees, setEmployeees] = useState<Employee[]>([]);
  const navigate = useNavigate();
  const isSupervisor = true; //implement logic

  if (!isSupervisor) {
    navigate('/');
  }

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const employees: Employee[] = [
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
            cust_attr_3value: "Attr3"
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
            cust_attr_3value: "Attr3"
          }
        ];

        setEmployeees(employees);
      } catch (error) {
        console.log('Error Fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Leaves" />
      {employees!.map((employee) => (
        <>
          {employee.first_name + ' ' + employee.last_name}
          <LeaveTable employee_id={employee.employee_id} pending={true} latest={false} />
        </>
      ))}
    </DefaultLayout>
  );
};

export default SupervisorLeave;
