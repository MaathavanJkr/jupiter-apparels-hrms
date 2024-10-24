import { useNavigate, useParams } from "react-router-dom";
import { Employee, LeaveApplication } from "../../types/types";
import { useEffect, useState } from "react";
import { approveLeave, getLeaveApplicationByID, rejectLeave } from "../../services/leaveServices";
import DefaultLayout from "../../layout/DefaultLayout";
import { getEmployeeByID } from "../../services/employeeServices";
import { notifyError, notifySuccess } from "../../services/notify";
import { ToastContainer } from "react-toastify";

const ViewLeave = () => {
    const navigate = useNavigate();
    const user_id = localStorage.getItem('user_id'); // Retrieve the user ID from local storage
    const { application_id } = useParams<{ application_id: string }>(); // Get the application ID from the URL params
    const [leave, setLeave] = useState<LeaveApplication>(); // State to hold leave application details
    const [employee, setEmployee] = useState<Employee>(); // State to hold employee details

    // Logic to determine if the user is a supervisor (replace with your actual logic)
    const isSupervisor = true; // Set this to true or false based on your app's logic

    // Fetch leave application details when the component mounts or application_id changes
    useEffect(() => {
        const fetchLeave = async (application_id : string) => {
            try {
                const leave = await getLeaveApplicationByID(application_id);
                setLeave(leave);

            } catch (error) {
                console.log("Error fetching leave:", error);
            }
        };

        if (application_id) {
            fetchLeave(application_id);
        } else {
            console.log("Application ID is not defined");
        }
    }, [application_id]);

    // Fetch employee details based on the leave application fetched
    useEffect(() => {
        const fetchEmployee = async () => {
            if (leave) {
                try {
                    const employee: Employee = await getEmployeeByID(leave.employee_id!);
                    setEmployee(employee);
                } catch (error) {
                    console.log("Error fetching employee:", error);
                }
            }
        };

        fetchEmployee();
    }, [leave]);

    // Handle leave rejection
    const handleRejection = () => {
        rejectLeave(application_id!)
            .then(() => {
                notifySuccess('Successfully Rejected');
                setTimeout(() => {
                    //navigate('/leaveapplications/' + user_id); // Redirect to the leave applications page
                    navigate(0); //Refreshes the page after the rejection.
                }, 1500);
            })
            .catch((error) => {
                notifyError(`Error Rejecting leave: ${error}`);
            });
    };

    // Handle leave approval
    const handleApproval = () => {
        approveLeave(application_id!)
            .then(() => {
                notifySuccess('Successfully Approved');
                setTimeout(() => {
                    navigate('/leaveapplications/' + user_id); // Redirect to the leave applications page
                }, 1500);
            })
            .catch((error) => {
                notifyError(`Error Approving leave: ${error}`);
            });
    };

    return (
        <DefaultLayout>
            <div className="bg-white dark:bg-boxdark shadow-lg rounded-lg p-6 space-y-4 border border-stroke dark:border-strokedark">
                <h2 className="text-2xl text-primary font-bold mb-3.5">Leave Details</h2>

                <div className="space-y-2 text-base">
                    {employee && (
                        <p className="text-gray-700 dark:text-gray-300">
                            <span className="font-bold">Employee Name: </span>
                            <span className="font-thin">{employee.first_name + " " + employee.last_name}</span>
                        </p>
                    )}
                    <p className="text-gray-700 dark:text-gray-300">
                        <span className="font-bold">Type: </span>
                        <span className="font-thin">{leave?.leave_type}</span>
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                        <span className="font-bold">From: </span>
                        <span className="font-thin">{leave?.start_date && new Date(leave.start_date).toLocaleDateString()}</span>
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                        <span className="font-bold">To: </span>
                        <span className="font-thin">{leave?.end_date && new Date(leave.end_date).toLocaleDateString()}</span>
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                        <span className="font-bold">Reason: </span>
                        <span className="font-thin">{leave?.reason}</span>
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                        <span className="font-bold">Submitted on: </span>
                        <span className="font-thin">{leave?.submission_date && new Date(leave.submission_date).toLocaleDateString()}</span>
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                        <span className="font-bold">Status: </span>
                        <span className="font-thin">{leave?.status}</span>
                    </p>
                    {leave?.status !== "Pending" && (
                        <p className="text-gray-700 dark:text-gray-300">
                            <span className="font-bold">Responded on: </span>
                            <span className="font-thin">{leave?.response_date && new Date(leave.response_date).toLocaleDateString()}</span>
                        </p>
                    )}
                </div>

                {isSupervisor && leave?.status === "Pending" && (
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
    );
};

    export default ViewLeave;
