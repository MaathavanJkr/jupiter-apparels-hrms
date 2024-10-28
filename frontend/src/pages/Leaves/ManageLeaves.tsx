import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import { Employee, LeaveApplication } from '../../types/types';
import { useEffect, useState } from 'react';
import LeaveTable from '../../components/Tables/LeaveTable';
import { getEmployeesUnder } from '../../services/supervisorServices';
import { getLeaveApplicationsByID } from "../../services/leaveServices";

const ManageLeaveApplications = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [leaveApplications, setLeaveApplications] = useState<Record<string, LeaveApplication[]>>({});
    const navigate = useNavigate();

    const supervisor_id = localStorage.getItem('employee_id');
    const isSupervisor = true;

    // Redirect if not a supervisor
    useEffect(() => {
        if (!isSupervisor) {
            navigate('/');
        }
    }, [isSupervisor, navigate]);

    // Fetch employees under the supervisor
    useEffect(() => {
        const fetchEmployees = async () => {
            if (!supervisor_id) {
                console.log("Supervisor ID is not defined");
                return;
            }
            try {
                const fetchedEmployees = await getEmployeesUnder(supervisor_id);

                // Handle both array and single employee object
                if (Array.isArray(fetchedEmployees)) {
                    setEmployees(fetchedEmployees);
                    //console.log('Fetched employees (array):', fetchedEmployees);
                } else if (fetchedEmployees && typeof fetchedEmployees === 'object') {
                    const employeesArray = [fetchedEmployees];
                    setEmployees(employeesArray);
                    //console.log('Fetched employees (single object):', employeesArray);
                } else {
                    //console.error('Fetched employees is not an array or object:', fetchedEmployees);
                    setEmployees([]);
                }
            } catch (error) {
                console.log('Error fetching employees:', error);
            }
        };
        fetchEmployees();
    }, []);

    // Fetch leave applications for each employee
    const fetchLeaveApplications = async (employee_id: string) => {
        try {
            const applications: LeaveApplication[] = await getLeaveApplicationsByID(employee_id);

            // Filter applications to only include those with status "Pending"
            const pendingApplications = applications.filter(application => application.status === 'Pending');

            // Set leave applications for this specific employee
            setLeaveApplications(prev => ({
                ...prev,
                [employee_id]: pendingApplications, // Store only pending applications under the employee_id key
            }));
        } catch (error) {
            console.log(`Error fetching leave applications for ${employee_id}:`, error);
        }
    };

    // Fetch leave applications whenever employees change
    useEffect(() => {
        if (employees.length > 0) {
            employees.forEach(employee => {
                fetchLeaveApplications(employee.employee_id);
            });
        }
    }, [employees]);

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Manage Leaves" />
            <h2>Employee Leaves</h2>
            {employees.length > 0 && (
                employees.map(employee => {
                    const pendingApplications = leaveApplications[employee.employee_id] || [];
                    return (
                        pendingApplications.length > 0 && ( // Only render if there are pending applications
                            <div key={employee.employee_id} style={{ marginBottom: '20px' }}>
                                <h3>
                                    {employee.first_name} {employee.last_name}
                                </h3>
                                <LeaveTable
                                    leaveApplications={pendingApplications} // Pass only pending applications to LeaveTable
                                />
                            </div>
                        )
                    );
                })
            )}
            {employees.length === 0 && <p>No employees found.</p>}
        </DefaultLayout>
    );
};

export default ManageLeaveApplications;
