import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../../layout/DefaultLayout";
import LeaveTable from "../../components/Tables/LeaveTable";
import { getLeaveApplicationsByID } from "../../services/leaveServices";

const LeaveHistory = () => {
    const { employee_id } = useParams<{ employee_id: string }>();
    const [leaveApplications, setLeaveApplications] = useState<any[]>([]);

    useEffect(() => {
        const fetchLeaveApplications = async (employee_id: string) => {

            try {
                const applications = await getLeaveApplicationsByID(employee_id);
                setLeaveApplications(applications);
                console.log(applications);

            } catch (err) {
                console.log("fetching failed");
            } finally {
                console.log("Finally")

            }
        };

        if (employee_id) {
            fetchLeaveApplications(employee_id);
      } else {
            console.log("Employee ID is not defined");
        }

    }, [employee_id]);


    return (
        <DefaultLayout>
            <Breadcrumb pageName="Leaves" />
            <div className="mb-6">
                <Link to={`/leave/apply/${employee_id}`}>
                    <button className="flex gap-1 block rounded border border-primary bg-primary p-3 text-center font-medium text-white transition hover:bg-primary-dark">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Apply Leave
                    </button>
                </Link>
            </div>
            {leaveApplications.length > 0 ? (
                <LeaveTable leaveApplications={leaveApplications} /> // Pass leaveApplications to LeaveTable
            ) : (
                <p>No leave applications found for this employee.</p>
            )}
        </DefaultLayout>
    );
};

export default LeaveHistory;