import { useEffect, useState } from 'react';
import { Employee, EmployeeCount, EmployeeCountByDepartment, LeaveCount, User, UserInfo } from '../../types/types';
import RingChart from '../Charts/RingChart';
import { getEmployees } from '../../services/employeeServices';
import { useNavigate } from 'react-router-dom';
import PieChart from '../Charts/PieChart';
import CardDataStats from '../CardDataStats';
import { getUserInfoById, getUsers } from '../../services/userServices';
import { getCountByDepartment, getDepartments } from '../../services/departmentServices';
import { getBranches } from "../../services/branchService.ts";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [employeeCount, setEmployeeCount] = useState<EmployeeCount>();
  const [employeeCountByID, setEmployeeCountByID] = useState<EmployeeCountByDepartment>();
  const [userInfo, setUserInfo] = useState<UserInfo>();
  const [branchCount, setBranchCount] = useState<number>();
  const [departmentCount, setDepartmentCount] = useState<number>();
  const [userCount, setUserCount] = useState<number>();
  const [HRcount, setHRcount] = useState<number>();

  useEffect(() => {
    const user_id = localStorage.getItem('user_id');
    const department_id = localStorage.getItem('user_id');
    const fetchUserInfo = async () => {
      try {
        const userInfo: EmployeeInfo = await getUserInfoById(user_id!);
        const employeeCountByID: EmployeeCountByDepartment = await getCountByDepartment(department_id!);

        setEmployeeCountByID(employeeCountByID);
        setUserInfo(userInfo);
      } catch (error) {
        console.log('Error Fetching Info:', error);
      }
    };

    fetchUserInfo();
  }, []);

  useEffect(() => {
    const fetchBranchCount = async () => {
      try {
        const branches = await getBranches();
        const branchCount: number = branches.length;
        setBranchCount(branchCount);
      } catch (error) {
        console.log('Error Fetching Branch Count:', error);
      }
    };

    fetchBranchCount();
  }, []);

  useEffect(() => {
    const fetchDepartmentCount = async () => {
      try {
        const departments = await getDepartments();
        const departmentCount: number = departments.length;
        setDepartmentCount(departmentCount);
      } catch (error) {
        console.log('Error Fetching Department Count:', error);
      }
    };

    fetchDepartmentCount();
  }, []);

  useEffect(() => {
    const fetchEmployeeCount = async () => {
      try {
        const employees: Employee[] = await getEmployees();

        const totalCount = employees.length;
        const maleCount = employees.filter(emp => emp.gender === 'Male').length;
        const femaleCount = employees.filter(emp => emp.gender === 'Female').length;

        const empCount: EmployeeCount = {
          total_count: totalCount,
          male_count: maleCount,
          female_count: femaleCount,
        };

        console.log(empCount);

        setEmployeeCount(empCount);
      } catch (error) {
        console.log('Error Fetching Employee Count:', error);
      }
    };

    fetchEmployeeCount();
  }, []);

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const users: User[] = await getUsers();
        const uCount: number = users.length;
        setUserCount(uCount);

        const hrCount: number = users.filter(user => user.role === "HR manager").length;
        setHRcount(hrCount);
      } catch (error) {
        console.log('Error Fetching User Count:', error);
      }
    };

    fetchUserCount();
  }, []);

  return (
    <>
      <div className="text-2xl font-bold text-primary mb-4">
        Welcome, {userInfo?.first_name?.toUpperCase()} {userInfo?.last_name?.toUpperCase()}! 👋
      </div>
      {branchCount && departmentCount && employeeCount && userCount && HRcount &&
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3 xl:grid-cols-5 2xl:gap-4 mt-10 bg-blue-100 p-4 rounded-lg">
          <CardDataStats title="Branches" total={branchCount}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-2 h-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 0 1-1.161.886l-.143.048a1.107 1.107 0 0 0-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 0 1-1.652.928l-.679-.906a1.125 1.125 0 0 0-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 0 0-8.862 12.872M12.75 3.031a9 9 0 0 1 6.69 14.036m0 0-.177-.529A2.25 2.25 0 0 0 17.128 15H16.5l-.324-.324a1.453 1.453 0 0 0-2.328.377l-.036.073a1.586 1.586 0 0 1-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 0 1-5.276 3.67m0 0a9 9 0 0 1-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25"
              />
            </svg>
          </CardDataStats>

          <CardDataStats title="Departments" total={departmentCount}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-2 h-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z"
              />
            </svg>
          </CardDataStats>

          <CardDataStats title="Total Employees" total={employeeCount?.total_count}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-2 h-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
          </CardDataStats>

          <CardDataStats title="User Accounts" total={userCount}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-2 h-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </CardDataStats>

          <CardDataStats title="HR Accounts" total={HRcount}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-2 h-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.75a6 6 0 1 0 0 10.5m0-10.5a6 6 0 0 1 0 10.5m0-10.5V3m0 18v-3.75"
              />
            </svg>
          </CardDataStats>
        </div>}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-2 2xl:gap-7.5 mt-10">
        {employeeCount && (
          <div
            className="bg-white dark:bg-boxdark shadow-lg rounded-lg p-6 space-y-4 border border-stroke dark:border-strokedark mt-10">
            <h2 className="text-2xl text-primary font-bold mb-3.5">Employee Distribution</h2>
            <RingChart countData={employeeCount} />
            <button
              onClick={() => navigate('/employee/all')}
              className="mt-4 w-auto flex items-center justify-center gap-1 rounded-lg border border-primary bg-primary py-2 px-4 text-center font-medium text-white transition hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Manage
            </button>
          </div>
        )}
        {employeeCountByID && (
          <div className="bg-white dark:bg-boxdark shadow-lg rounded-lg p-6 space-y-4 border border-stroke dark:border-strokedark mt-10">
            <h2 className="text-2xl text-primary font-bold mb-6">Department Capacity</h2>
            <div className="mb-20">
              <PieChart countData={employeeCountByID} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminDashboard;
