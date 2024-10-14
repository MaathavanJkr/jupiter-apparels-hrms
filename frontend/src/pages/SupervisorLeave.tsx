import { useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import { Employee } from '../types/types';
import { useEffect, useState } from 'react';
import { getEmployeesUnder } from '../services/supervisorServices';
import LeaveTable from '../components/Tables/LeaveTable';

const SupervisorLeave = () => {
  const { supervisor_id } = useParams<{ supervisor_id: string }>();
  const [employees, setEmployeees] = useState<Employee[]>([]);
  const navigate = useNavigate();
  const isSupervisor = true; //implement logic

  if (!isSupervisor) {
    navigate('/');
  }

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const employees = await getEmployeesUnder(supervisor_id!);
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
          <LeaveTable employee_id={employee.employee_id} pending={true} />
        </>
      ))}
    </DefaultLayout>
  );
};

export default SupervisorLeave;
