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
                setLeaveApplications(applications || []);  // Default to empty array if no applications are found
            } catch (err) {
                console.log("Fetching leave applications failed", err);
            }
        };

        if (employee_id) {
            fetchLeaveApplications(employee_id);
        } else {
            console.log("Employee ID is not defined");
        }

    }, [employee_id]);

    const hasLeaveApplications = Array.isArray(leaveApplications) && leaveApplications.length > 0;

    return (
        <DefaultLayout>
            <Breadcrumb pageName="My Leave History" />
            
            {hasLeaveApplications ? (
                <LeaveTable leaveApplications={leaveApplications} />
            ) : (
                <p>No leave applications found.</p>
            )}
        </DefaultLayout>
    );
};

export default LeaveHistory;
