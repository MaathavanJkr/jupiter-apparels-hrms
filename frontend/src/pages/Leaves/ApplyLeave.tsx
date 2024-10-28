import React, {useEffect, useState} from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import { createLeaveApplication } from '../../services/leaveServices';
import { notifyError, notifySuccess } from '../../services/notify';
import {getEmployeeIdByUserId} from "../../services/employeeServices.ts";
import {useNavigate} from "react-router-dom";
import { LeaveAppData } from '../../types/types.ts';

const UpdateLeaveApplicationData = () => {
  const [leaveAppData, setLeaveAppData] = useState<LeaveAppData>({
    leaveType: '',
    startdate: '',
    enddate: '',
    reason: '',
  });

  const user_id = localStorage.getItem('user_id');
  const [employeeId, setEmployeeId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployeeId = async () => {
      if (user_id) { // Check if user_id is not null
        try {
          const id = await getEmployeeIdByUserId(user_id);
          setEmployeeId(id);
        } catch (error) {
          console.error('Error fetching employee ID:', error);
        }
      } else {
        console.error('User ID is not available.');
      }
    };

    fetchEmployeeId();
  }, [user_id]);

  const handleLeaveAppDataChange = (
      event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const newLeaveAppData: LeaveAppData = {
      ...leaveAppData,
      [event.target.name]: event.target.value,
    };

    setLeaveAppData(newLeaveAppData);
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      // Call the API to create a leave application
      await createLeaveApplication(
          employeeId,
          leaveAppData.leaveType,
          leaveAppData.startdate,
          leaveAppData.enddate,
          leaveAppData.reason
      );
      notifySuccess("Application Submitted Successfully");
      navigate(0);
    } catch (err) {
      notifyError("Could not create application");
    }
  };

  return (
      <DefaultLayout>
        <div className="w-full h-screen flex items-center justify-center">
          <div className="w-[50%] h-[90%] bg-gray-300 p-6 rounded-lg shadow-lg dark:bg-blue-950">
            <h2 className="text-2xl font-bold text-black shadow-lg text-center bg-gray-200 py-5 dark:bg-blue-900 dark:text-white">
              Leave Application
            </h2>
            <div className="pt-5">
              {/*<h1 className="text-lg text-black dark:text-white">Employee ID</h1>*/}
              {/*<input*/}
              {/*    className="shadow-lg rounded-md p-3 mt-3 w-4/5 dark:bg-blue-900"*/}
              {/*    name="employeeid"*/}
              {/*    type="text"*/}
              {/*    placeholder="Enter Employee ID"*/}
              {/*    onChange={handleLeaveAppDataChange}*/}
              {/*/>*/}

              <h1 className="mt-4 text-lg text-black dark:text-white">Leave Type</h1>
              <select
                  className="shadow-lg rounded-md p-3 mt-3 w-4/5 dark:bg-blue-900"
                  name="leaveType"
                  onChange={handleLeaveAppDataChange}
              >
                <option value="">Select Leave Type</option>
                <option value="annual">Annual Leave</option>
                <option value="casual">Casual Leave</option>
                <option value="maternity">Maternity Leave</option>
                <option value="noPay">No Pay Leave</option>
              </select>

              <h1 className="mt-4 text-lg text-black dark:text-white">Start Date</h1>
              <input
                  className="shadow-lg rounded-md p-3 mt-3 w-4/5 dark:bg-blue-900"
                  name="startdate"
                  type="date"
                  placeholder="Enter start date"
                  onChange={handleLeaveAppDataChange}
              />

              <h1 className="mt-4 text-lg text-black dark:text-white">End Date</h1>
              <input
                  className="shadow-lg rounded-md p-3 mt-3 w-4/5 dark:bg-blue-900"
                  name="enddate"
                  type="date"
                  placeholder="Enter end date"
                  onChange={handleLeaveAppDataChange}
              />

              <h1 className="mt-4 text-lg text-black dark:text-white">Reason</h1>
              <input
                  className="shadow-lg rounded-md p-3 mt-3 w-4/5 pb-10 dark:bg-blue-900"
                  name="reason"
                  type="text"
                  placeholder="Enter reason"
                  onChange={handleLeaveAppDataChange}
              />
            </div>
            <div className="mt-7 flex justify-normal">
              <button
                  onClick={handleSubmit}
                  className="shadow-lg m-2 rounded-lg bg-blue-700 card-btn font-bold text-black self-center hover:bg-green-500 dark:text-white"
              >
                Submit
              </button>
              <button className="shadow-lg card-btn rounded-lg bg-gray-500 text-black font-bold self-center hover:bg-red-600 dark:text-white">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </DefaultLayout>
  );
};

export default UpdateLeaveApplicationData;
