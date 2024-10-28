import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../../layout/DefaultLayout";
import LeaveTable from "../../components/Tables/LeaveTable";
import { getMyLeaveApplications } from "../../services/leaveServices";

const MyLeaveHistory = () => {
    const [leaveApplications, setLeaveApplications] = useState<any[]>([]);

    useEffect(() => {
        const fetchLeaveApplications = async () => {
            try {
                const applications = await getMyLeaveApplications();
                setLeaveApplications(applications || []);  // Default to empty array if no applications are found
            } catch (err) {
                console.log("Fetching leave applications failed", err);
            }
        };

        fetchLeaveApplications();
    }, []);

    const hasLeaveApplications = Array.isArray(leaveApplications) && leaveApplications.length > 0;

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Leaves" />
            <div className="mb-6">
                <Link to={`/leave/apply`}>
                    <button className="flex gap-1 block rounded border border-primary bg-primary p-3 text-center font-medium text-white transition hover:bg-primary-dark">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Apply Leave
                    </button>
                </Link>
            </div>
            {hasLeaveApplications ? (
                <LeaveTable leaveApplications={leaveApplications} />  // Pass leaveApplications to LeaveTable
            ) : (
                <p>No leave applications found for this employee.</p>
            )}
        </DefaultLayout>
    );
};

export default MyLeaveHistory;
