import { useNavigate, useParams } from "react-router-dom"
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb"
import DefaultLayout from "../../layout/DefaultLayout"
import { useEffect, useState } from "react";
import { Employee, LeaveBalance, EmployeeInfo } from "../../types/types";
import { getUserInfoById } from "../../services/userServices";
import { getLeaveBalanceByID } from "../../services/leaveServices";
import { getEmployeeByID } from "../../services/employeeServices";


const Profile = () => {
    const navigate = useNavigate();

    const { user_id } = useParams<{ user_id: string }>();
    const isCorrect = user_id === localStorage.getItem("user_id");

    if (!isCorrect) {
        navigate("/"); //change to dashboard
    }
    const [currUserInfo, setCurrUserInfo] = useState<EmployeeInfo>();
    const [currLeaveBalance, setCurrLeaveBalance] = useState<LeaveBalance>();
    const [currSupervisor, setCurrSupervisor] = useState<Employee>();

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const currUserInfo: EmployeeInfo = await getUserInfoById(user_id!);
                setCurrUserInfo(currUserInfo);
            } catch (error) {
                console.log("Failded to fetch info:", error);
            }
        }
        fetchUserInfo();
    }, [])


    useEffect(() => {
        const fetchLeaveBalance = async () => {
            if (currUserInfo?.employee_id && currUserInfo?.supervisor_id) {
                try {
                    const leaveBalance: LeaveBalance = await getLeaveBalanceByID(currUserInfo.employee_id);

                    setCurrLeaveBalance(leaveBalance);
                } catch (error) {
                    console.log("Failed to fetch leave balance:", error);
                }
            }
        };

        if (currUserInfo) {
            fetchLeaveBalance();
        }
    }, [currUserInfo]);
    useEffect(() => {
        const fetchSupervisor = async () => {
            try {
                const supervisor: Employee = await getEmployeeByID(currUserInfo!.supervisor_id);
                setCurrSupervisor(supervisor);
            } catch (error) {
                console.log("Failed to fetch supervisor:", error);
            }
        };

        fetchSupervisor();

    }, [currUserInfo]);

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Profile" />
            <div className="bg-white dark:bg-boxdark shadow-lg rounded-lg p-6 space-y-4 border border-stroke dark:border-strokedark">
                <h2 className="text-2xl text-primary font-bold mb-3.5">Account Details</h2>

                <div className="space-y-2 text-base">
                    <p className="text-gray-700 dark:text-gray-300">
                        <span className="font-bold">User Name:</span> <span className="font-thin">{localStorage.getItem('username')}</span>
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                        <span className="font-bold">Role:</span> <span className="font-thin">{localStorage.getItem('role')}</span>
                    </p>
                </div>


                <button onClick={() => navigate('/auth/changepassword/' + user_id)} className="mt-4.5 w-full sm:w-auto flex items-center justify-center gap-1 rounded-lg border border-primary bg-primary py-2 px-4 text-center font-medium text-white transition hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                    Change Password
                </button>

            </div>
            <div className="mt-10.5 bg-white dark:bg-boxdark shadow-lg rounded-lg p-6 space-y-4 border border-stroke dark:border-strokedark">
                <h2 className="text-2xl text-primary font-bold mb-3.5">Personal Details</h2>

                <div className="space-y-2 text-base">
                    <p className="text-gray-700 dark:text-gray-300">
                        <span className="font-bold">Full Name:</span> <span className="font-thin">{currUserInfo?.first_name + ' ' + currUserInfo?.last_name}</span>
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                        <span className="font-bold">Gender:</span>  <span className="font-thin">{currUserInfo?.gender}</span>
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                        <span className="font-bold">Maritial Status:</span> <span className="font-thin">{currUserInfo?.marital_status}</span>
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                        <span className="font-bold">Date of Birth:</span> <span className="font-thin">{new Date(currUserInfo?.birth_date!).toLocaleDateString()}</span>
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                        <span className="font-bold">NIC:</span>  <span className="font-thin">{currUserInfo?.NIC}</span>
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                        <span className="font-bold">Contact Number:</span> <span className="font-thin">{currUserInfo?.contact_number}</span>
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                        <span className="font-bold">Email: </span> <span className="font-thin">{currUserInfo?.email}</span>
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                        <span className="font-bold">Address: </span> <span className="font-thin">{currUserInfo?.address}</span> {/*Change after backend */}
                    </p>
                </div>


                <button onClick={() => navigate('/employee/details/' + currUserInfo?.employee_id)} className="mt-4 w-auto flex items-center justify-center gap-1 rounded-lg border border-primary bg-primary py-2 px-4 text-center font-medium text-white transition hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                    View Dependents & Contacts
                </button>

            </div>
            <div className="mt-10.5 bg-white dark:bg-boxdark shadow-lg rounded-lg p-6 space-y-4 border border-stroke dark:border-strokedark">
                <h2 className="text-2xl text-primary font-bold mb-3.5">Work Details</h2>

                <div className="space-y-2 text-base">
                    <p className="text-gray-700 dark:text-gray-300">
                        <span className="font-bold">Branch:</span> <span className="font-thin">{currUserInfo?.branch_name}</span>
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                        <span className="font-bold">Department:</span>  <span className="font-thin">{currUserInfo?.department_name}</span>
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                        <span className="font-bold">Supervisor:</span> <span className="font-thin">{currSupervisor ? (currSupervisor?.first_name + " " + currSupervisor?.last_name) : "No supervisor"}</span> {/*Change after backend */}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                        <span className="font-bold">Paygrade:</span> <span className="font-thin">{currUserInfo?.pay_grade}</span> {/*Change after backend */}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                        <span className="font-bold">Job Title:</span>  <span className="font-thin">{currUserInfo?.job_title}</span>
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                        <span className="font-bold">Employment Status:</span> <span className="font-thin">{currUserInfo?.employment_status}</span> {/*Change after backend */}
                    </p>
                </div>
            </div>
        </DefaultLayout>
    )
}

export default Profile
