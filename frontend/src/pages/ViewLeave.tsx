import { useNavigate, useParams } from "react-router-dom"
import { Employee, LeaveApplication } from "../types/types";
import { useEffect, useState } from "react";
import { approveLeave, getLeaveApplicationByID, rejectLeave } from "../services/leaveServices";
import DefaultLayout from "../layout/DefaultLayout";
import { getEmployeeByID } from "../services/employeeServices";
import { notifyError, notifySuccess } from "../services/notify";
import { ToastContainer } from "react-toastify";

const ViewLeave = () => {
    const navigate = useNavigate();
    const user_id = localStorage.getItem('user_id')
    const { application_id } = useParams<{ application_id: string }>();
    const [leave, setLeave] = useState<LeaveApplication>();
    const [employee, setEmployee] = useState<Employee>();

    const isSupervisor = true; //need logic

    useEffect(() => {
        const fetchLeave = async () => {
            try {
                const leave: LeaveApplication = await getLeaveApplicationByID(application_id!);
                setLeave(leave);
            } catch (error) {
                console.log("Error fetching leave:", error);
            }
        }

        fetchLeave();
    }, [])

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const employee: Employee = await getEmployeeByID(leave?.employee_id!);
                setEmployee(employee);
            } catch (error) {
                console.log("Error fetching employee:", error);
            }
        }

        fetchEmployee();
    }, [leave])

    const handleRejection = () => {

        rejectLeave(application_id!)
            .then(() => {
                notifySuccess('Successfully Rejected');
                setTimeout(() => {
                    navigate('/leaveapplications/' + user_id);
                }, 1500)

            })
            .catch((error) => {
                notifyError(`Error Rejecting leave: ${error}`)
            })

    }
    const handleApproval = () => {

        approveLeave(application_id!)
            .then(() => {
                notifySuccess('Successfully Approved');
                setTimeout(() => {
                    navigate('/leaveapplications/' + user_id);
                }, 1500)
            })
            .catch((error) => {
                notifyError(`Error Approving leave: ${error}`)
            })

    }

    return (
        <DefaultLayout>
            <div className="bg-white dark:bg-boxdark shadow-lg rounded-lg p-6 space-y-4 border border-stroke dark:border-strokedark">
                <h2 className="text-2xl text-primary font-bold mb-3.5">Leave Details</h2>

                <div className="space-y-2 text-base">
                    <p className="text-gray-700 dark:text-gray-300">
                        <span className="font-bold">Employee Name: </span> <span className="font-thin">{employee?.first_name + " " + employee?.last_name}</span>
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                        <span className="font-bold">Type:</span> <span className="font-thin">{leave?.leave_type}</span>
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                        <span className="font-bold">From:</span> <span className="font-thin">{new Date(leave?.start_date!).toLocaleDateString()}</span>
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                        <span className="font-bold">To:</span> <span className="font-thin">{new Date(leave?.end_date!).toLocaleDateString()}</span>
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                        <span className="font-bold">Reason:</span> <span className="font-thin">{leave?.reason}</span>
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                        <span className="font-bold">Submitted on:</span> <span className="font-thin">{new Date(leave?.submission_date!).toLocaleDateString()}</span>
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                        <span className="font-bold">Status:</span> <span className="font-thin">{leave?.status}</span>
                    </p>
                    {leave?.status !== "Pending" && (
                        <p className="text-gray-700 dark:text-gray-300">
                            <span className="font-bold">Responded on:</span> <span className="font-thin">{new Date(leave?.response_date!).toLocaleDateString()}</span>
                        </p>
                    )}
                </div>

                {isSupervisor && (
                    <div className="flex gap-6">
                        <button className="block w-full rounded border border-stroke bg-gray p-3 text-center font-medium text-black transition hover:border-meta-11 hover:bg-meta-11 hover:text-white dark:border-strokedark dark:bg-meta-4 dark:text-white dark:hover:border-meta-11 dark:hover:bg-meta-11"
                            onClick={handleApproval}>
                            Approve
                        </button>
                        <button className="block w-full rounded border border-stroke bg-gray p-3 text-center font-medium text-black transition hover:border-meta-1 hover:bg-meta-1 hover:text-white dark:border-strokedark dark:bg-meta-4 dark:text-white dark:hover:border-meta-1 dark:hover:bg-meta-1"
                            onClick={handleRejection}>
                            Reject
                        </button>
                    </div>
                )}
            </div>
            <ToastContainer />
        </DefaultLayout>
    )
}

export default ViewLeave
