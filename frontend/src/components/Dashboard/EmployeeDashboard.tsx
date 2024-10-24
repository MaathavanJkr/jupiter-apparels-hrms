import { useEffect, useState } from 'react';
import {
  Employee,
  LeaveBalance,
  UsedLeaves,
  UserInfo,
} from '../../types/types';
import { getUserInfoById } from '../../services/userServices';
import { getEmployeeByID } from '../../services/employeeServices';
import {
  getLeaveBalanceByID,
  getUsedLeavesByID,
} from '../../services/leaveServices';
import LeaveChart from '../Charts/LeaveChart';
import LeaveTable from '../Tables/LeaveTable';
import { useNavigate } from 'react-router-dom';
import PendingleaveTable from '../Tables/PendingleaveTable'; // Import LeaveTable

const EmployeeDashboard = () => {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState<UserInfo>();
  const [supervisor, setSupervisor] = useState<Employee>();
  const [usedLeaves, setUsedLeaves] = useState<UsedLeaves>();
  const [remainingLeaves, setRemainingLeaves] = useState<LeaveBalance>();

  const role = localStorage.getItem('role');
  const isSupervisor = true;

  useEffect(() => {
    const user_id = localStorage.getItem('user_id');
    const fetchuserInfo = async () => {
      try {
        const userInfo: UserInfo = await getUserInfoById(user_id!);
        setUserInfo(userInfo);
      } catch (error) {
        console.log('Error Fetching Info:', error);
      }
    };

    fetchuserInfo();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userInfo && userInfo.supervisor_id) {
          const supervisor: Employee = await getEmployeeByID(
            userInfo.supervisor_id,
          );
          setSupervisor(supervisor);
        }
        if (userInfo && userInfo.employee_id) {
          const usedLeaves: UsedLeaves = await getUsedLeavesByID(
            userInfo.employee_id,
          );
          const remainingLeaves: LeaveBalance = await getLeaveBalanceByID(
            userInfo.employee_id,
          );
          setUsedLeaves(usedLeaves);
          setRemainingLeaves(remainingLeaves);
        }
      } catch (error) {
        console.log('Error Fetching Supervisor:', error);
      }
    };
    fetchData();
  }, [userInfo]);

  const leaveTypes = [
    'Annual Leave',
    'Casual Leave',
    'Maternity Leave',
    'No pay Leave',
  ];
  const remaining = [10, 20, 15, 5];
  const used = [5, 12, 7, 3];
  return (
    <div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-2 2xl:gap-7.5 mt-10">
        <div className="bg-white dark:bg-boxdark shadow-lg rounded-lg p-6 space-y-4 border border-stroke dark:border-strokedark w-3/4">
          <h2 className="text-2xl text-primary font-bold mb-3.5">
            Employee Information
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-bold">Full Name:</span>{' '}
            <span className="font-thin">
              {userInfo?.first_name + ' ' + userInfo?.last_name}
            </span>
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-bold">Job :</span>{' '}
            <span className="font-thin">{userInfo?.job_title}</span>
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-bold">Role :</span>{' '}
            <span className="font-thin">{localStorage.getItem('role')}</span>
          </p>
        </div>
        {(userInfo?.supervisor_id || true) && (
          <div className="bg-white dark:bg-boxdark shadow-lg rounded-lg p-6 space-y-4 border border-stroke dark:border-strokedark w-3/4">
            <h2 className="text-2xl text-primary font-bold mb-3.5">
              Supervisor Information
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-bold">Full Name:</span>{' '}
              <span className="font-thin">
                {supervisor?.first_name + ' ' + supervisor?.last_name}
              </span>
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-bold">Email :</span>{' '}
              <span className="font-thin">{supervisor?.email}</span>
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-bold">Contact :</span>{' '}
              <span className="font-thin">{supervisor?.contact_number}</span>
            </p>
          </div>
        )}
      </div>

      <div className="mt-10 bg-white dark:bg-boxdark shadow-lg rounded-lg p-6 space-y-4 border border-stroke dark:border-strokedark">
        <h2 className="text-2xl text-primary font-bold mb-3.5">
          Leave History
        </h2>
        <LeaveTable
          employee_id={userInfo?.employee_id!}
        />
        <h2 className="text-2xl text-primary font-bold mb-3.5">
          Leave Overview
        </h2>
        <LeaveChart
          leaveTypes={leaveTypes}
          remainingLeaves={remaining}
          usedLeaves={used}
        />
      </div>
      {/* Add Supervisor Pending Leave Table */}
      {isSupervisor && (
        <div className="mt-10 bg-white dark:bg-boxdark shadow-lg rounded-lg p-6 space-y-4 border border-stroke dark:border-strokedark">
          <h2 className="text-2xl text-primary font-bold mb-3.5">
            Pending Leave Applications
          </h2>
          <PendingleaveTable
            supervisor_id={userInfo?.supervisor_id!} // Pass the supervisor's ID
          />
        </div>
      )}
      <div className="flex gap-6">
        <button
          onClick={() =>
            navigate( '/profile/'+ userInfo?.user_id)
          }
          className="mt-4 w-auto flex items-center justify-center gap-1 rounded-lg border border-primary bg-primary py-2 px-4 text-center font-medium text-white transition hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          View Profile
        </button>
        <button
          onClick={() =>
            navigate('/leave/apply/' + userInfo?.employee_id)
          }
          className="mt-4 w-auto flex items-center justify-center gap-1 rounded-lg border border-primary bg-primary py-2 px-4 text-center font-medium text-white transition hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          Apply Leave
        </button>
        {isSupervisor && (
          <button
            onClick={() =>
              navigate('/supervisor/leaveview/' + userInfo?.employee_id)
            }
            className="mt-4 w-auto flex items-center justify-center gap-1 rounded-lg border border-primary bg-primary py-2 px-4 text-center font-medium text-white transition hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Manage Subordinates
          </button>
        )}
        {isSupervisor && (
          <button
            onClick={() =>
              navigate('/employee/all')
            }
            className="mt-4 w-auto flex items-center justify-center gap-1 rounded-lg border border-primary bg-primary py-2 px-4 text-center font-medium text-white transition hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Manage Employees
          </button>
        )}
        {isSupervisor && (
          <button
            onClick={() =>
              navigate('/user/create')
            }
            className="mt-4 w-auto flex items-center justify-center gap-1 rounded-lg border border-primary bg-primary py-2 px-4 text-center font-medium text-white transition hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Create User Account
          </button>
        )}
      </div>
    </div>
  );
};

export default EmployeeDashboard;
