import React, { useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import {
  applyLeave,
  getPendingLeavesCount,
  getRemainingLeaves,
} from '../../services/leaveServices';
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

  const employeeId = localStorage.getItem('employee_id') || '';

  const navigate = useNavigate();

  const handleLeaveAppDataChange = (
      event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newLeaveAppData: LeaveAppData = {
      ...leaveAppData,
      [event.target.name]: event.target.value,
    };

    setLeaveAppData(newLeaveAppData);
  };

  const handleSubmit = async () => {
    // Check if all fields are filled
    if (!leaveAppData.leaveType || !leaveAppData.startdate || !leaveAppData.enddate || !leaveAppData.reason) {
      notifyError("Please fill in all fields");
      return;
    }

    try {
      let leaveType = '';
      switch (leaveAppData.leaveType) {
        case "annual":
          leaveType = 'Annual';
          break;
        case "casual":
          leaveType = 'Casual';
          break;
        case "maternity":
          leaveType = 'Maternity';
          break;
        case "nopay":
          leaveType = 'Nopay';
          break;
        default:
          throw new Error('Invalid leave type specified.');
      }

      // Calculate selected leave days
      const startDate = new Date(leaveAppData.startdate);
      const endDate = new Date(leaveAppData.enddate);
      const selectedLeaveDays = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24) + 1;


      // Fetch remaining leaves for the specified employee and leave type
      const remainingLeaves = await getRemainingLeaves(employeeId, leaveType);

      // Check if selected leave days exceed remaining leaves
      if (selectedLeaveDays > remainingLeaves.remaining_leaves) {
        notifyError(`Insufficient leaves. You have only ${remainingLeaves.remaining_leaves} remaining.`);
        return;
      }

      // Fetch all pending leave counts for the employee
      // const pendingLeaves = await getPendingLeavesCount(employeeId);
      //
      // // Determine pending count for the selected leave type
      // let pendingCountForType = 0;
      // switch (leaveAppData.leaveType.toLowerCase()) {
      //   case "annual":
      //     pendingCountForType = pendingLeaves[0].annual_pending_leaves;
      //     break;
      //   case "casual":
      //     pendingCountForType = pendingLeaves[0].casual_pending_leaves;
      //     break;
      //   case "maternity":
      //     pendingCountForType = pendingLeaves[0].maternity_pending_leaves;
      //     break;
      //   case "nopay":
      //     pendingCountForType = pendingLeaves[0].nopay_pending_leaves;
      //     break;
      //   default:
      //     throw new Error('Invalid leave type specified.');
      // }
      //
      // // Check if the pending leave count exceeds the remaining leave count
      // if (pendingCountForType >= remainingLeaves.remaining_leaves) {
      //   notifyError("You cannot submit more leave applications until your supervisor reviews your existing requests. Please check back later.");
      //   return;
      // }

      // Call the API to create a leave application
      const response = await applyLeave(
          leaveAppData.leaveType,
          leaveAppData.startdate,
          leaveAppData.enddate,
          leaveAppData.reason
      );

      // Check if the response contains an error
      if (response.error) {
        notifyError(response.error.message);
        return;
      }

      // Notify success and navigate after a short delay
      notifySuccess("Application Submitted Successfully");
      setTimeout(() => {
        navigate('/leave/my');
      }, 2000);

    } catch (err) {

      notifyError("Could not create application");
    }
  };


  // const handleSubmit = async () => {
  //   // Check if all fields are filled
  //   if (!leaveAppData.leaveType || !leaveAppData.startdate || !leaveAppData.enddate || !leaveAppData.reason) {
  //     notifyError("Please fill in all fields");
  //     return;
  //   }
  //
  //   if (!employeeId) {
  //     notifyError("Employee ID not found");
  //     return;
  //   }
  //
  //   try {
  //     let leaveType = '';
  //     switch (leaveAppData.leaveType) {
  //       case "annual":
  //         leaveType  = 'Annual';
  //         break;
  //       case "casual":
  //         leaveType = 'Casual';
  //         break;
  //       case "maternity":
  //         leaveType = 'Maternity';
  //         break;
  //       case "nopay":
  //         leaveType = 'Nopay';
  //         break;
  //       default:
  //         throw new Error('Invalid leave type specified.');
  //     }
  //     // fetching remaining leave count for the specified employee and the specified type
  //     const remainingLeaves = await getRemainingLeaves(employeeId,leaveType);
  //
  //
  //     // Check if the remaining leave count for the requested leave type is zero
  //     if (remainingLeaves.remaining_leaves == 0) {
  //       notifyError(`No leaves left in this category.`);
  //       return;
  //     }
  //
  //     // Fetch all the pending leaves count for the employee
  //     const pendingLeaves = await getPendingLeavesCount(employeeId);
  //
  //     // Determine the pending count for the selected leave type
  //     let pendingCountForType = 0;
  //     switch (leaveAppData.leaveType.toLowerCase()) {
  //       case "annual":
  //         pendingCountForType = pendingLeaves[0].annual_pending_leaves ;
  //         break;
  //       case "casual":
  //         pendingCountForType = pendingLeaves[0].casual_pending_leaves ;
  //         break;
  //       case "maternity":
  //         pendingCountForType = pendingLeaves[0].maternity_pending_leaves ;
  //         break;
  //       case "nopay":
  //         pendingCountForType = pendingLeaves[0].nopay_pending_leaves;
  //         break;
  //       default:
  //         throw new Error('Invalid leave type specified.');
  //     }
  //
  //     // Check if the pending leave count exceeds the remaining leave count for the selected leave type
  //     if (pendingCountForType >= remainingLeaves.remaining_leaves) {
  //       notifyError("You cannot submit more leave applications until your supervisor reviews your existing requests. Please check back later.");
  //       return;
  //     }
  //
  //     // Call the API to create a leave application
  //     const response = await applyLeave(
  //         employeeId,
  //         leaveAppData.leaveType,
  //         leaveAppData.startdate,
  //         leaveAppData.enddate,
  //         leaveAppData.reason
  //     );
  //
  //     // Check if the response contains an error
  //     if (response.error) {
  //       notifyError(response.error.message);
  //       return;
  //     }
  //
  //     notifySuccess("Application Submitted Successfully");
  //
  //     setTimeout(() => {
  //       navigate('/leave/my');
  //     }, 2000);
  //   } catch (err: any) {
  //     if (err.message) {
  //       notifyError(err.message); // show specific errors
  //     } else {
  //       notifyError("Could not create application");
  //     }
  //   }
  // };



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
                <option value="nopay">No Pay Leave</option>
              </select>
            </div>

            <div className="flex flex-col md:flex-row">
              <div className="mb-4.5 md:w-1/2 md:pr-2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Start Date <span className="text-meta-1">*</span>
                </label>
                <input
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    name="startdate"
                    type="date"
                    placeholder="Enter start date"
                    onChange={handleLeaveAppDataChange}
                />
              </div>

              <div className="mb-4.5 md:w-1/2 md:pl-2">
                <label className="mb-2.5 block text-black dark:text-white">
                  End Date <span className="text-meta-1">*</span>
                </label>
                <input
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    name="enddate"
                    type="date"
                    placeholder="Enter end date"
                    onChange={handleLeaveAppDataChange}
                />
              </div>
            </div>

            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Reason <span className="text-meta-1">*</span>
              </label>
              <textarea
                  rows={6}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  placeholder="Enter Reason"
                  name="reason"
                  onChange={handleLeaveAppDataChange}
              ></textarea>
            </div>
          </div>
          <div className="-mx-3 flex flex-wrap gap-y-4">
            <div className="w-full px-3 2xsm:w-1/2">
              <button onClick={handleSubmit} className="block w-full rounded border border-primary bg-primary p-3 text-center font-medium text-white transition hover:bg-primary-dark">
                Apply Leave
              </button>
            </div>
            <div className="w-full px-3 2xsm:w-1/2">
              <button onClick={() => { navigate('/leave/my') }} className="block w-full rounded border border-stroke bg-gray p-3 text-center font-medium text-black transition hover:border-meta-4 hover:bg-meta-4 hover:text-white dark:border-strokedark dark:bg-meta-4 dark:text-white dark:hover:border-meta-1 dark:hover:bg-meta-1">
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
