import React, { useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import { applyLeave } from '../../services/leaveServices';
import { notifyError, notifySuccess } from '../../services/notify';
import { useNavigate } from "react-router-dom";
import { LeaveAppData } from '../../types/types.ts';
import { ToastContainer } from 'react-toastify';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb.tsx';

const UpdateLeaveApplicationData = () => {
  const [leaveAppData, setLeaveAppData] = useState<LeaveAppData>({
    leaveType: '',
    startdate: '',
    enddate: '',
    reason: '',
  });

  const navigate = useNavigate();
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

    // Check if all fields are filled
    if (!leaveAppData.leaveType || !leaveAppData.startdate || !leaveAppData.enddate || !leaveAppData.reason) {
      notifyError("Please fill in all fields");
      return;
    }

    try {
      // Call the API to create a leave application
      const response = await applyLeave(
        leaveAppData.leaveType,
        leaveAppData.startdate,
        leaveAppData.enddate,
        leaveAppData.reason
      );

      if (response.error) {
        notifyError(response.error.message);
        return;
      }
      notifySuccess("Application Submitted Successfully");

      setTimeout(() => {
        navigate('/leave/my');
      }, 2000);
    } catch (err) {
      notifyError("Could not create application");
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Apply for Leave" />
      <div className="mt-10 bg-white dark:bg-boxdark shadow-lg rounded-lg p-6 space-y-4 border border-stroke dark:border-strokedark">
        <div>
          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Leave Type <span className="text-meta-1">*</span>
            </label>
            <select
              name="leaveType"
              onChange={handleLeaveAppDataChange}
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            >
              <option value="" disabled selected>Select Leave Type</option>
              <option value="annual">Annual Leave</option>
              <option value="casual">Casual Leave</option>
              <option value="maternity">Maternity Leave</option>
              <option value="noPay">No Pay Leave</option>
            </select>
          </div>
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
        <div className="-mx-3 flex flex-wrap gap-y-4">
          <div className="w-full px-3 2xsm:w-1/2">
            <button onClick={handleSubmit} className="block w-full rounded border border-primary bg-primary p-3 text-center font-medium text-white transition hover:bg-primary-dark">
              Add Employee
            </button>
          </div>
          <div className="w-full px-3 2xsm:w-1/2">
            <button onClick={() => { navigate('/employee/all') }} className="block w-full rounded border border-stroke bg-gray p-3 text-center font-medium text-black transition hover:border-meta-4 hover:bg-meta-4 hover:text-white dark:border-strokedark dark:bg-meta-4 dark:text-white dark:hover:border-meta-1 dark:hover:bg-meta-1">
              View All
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </DefaultLayout>
  );
};

export default UpdateLeaveApplicationData;
