import { useEffect, useState } from "react";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb"
import DefaultLayout from "../../layout/DefaultLayout"
import { PayGrade } from "../../types/types";
import { getPayGrades } from "../../services/payGradeServices";
import { getLeaveCountByPaygrade, updateLeaveCountByPaygrade } from "../../services/allocatedLeaveServices";
import { notifyError, notifySuccess } from "../../services/notify";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";


const LeaveCountConfig = () => {
    const [payGrades, setPayGrades] = useState<PayGrade[]>([]);
    const [selectedPayGradeId, setSelectedPayGradeId] = useState<string>("PG001");

    const navigate = useNavigate();

    const [annualLeaves, setAnnualLeaves] = useState<string | null>(null);
    const [casualLeaves, setCasualLeaves] = useState<string | null>(null);
    const [maternityLeaves, setMaternityLeaves] = useState<string | null>(null);
    const [noPayLeaves, setNoPayLeaves] = useState<string | null>(null);

    const handleSave = async () => {
        try {
            if(!selectedPayGradeId){
                notifyError("Please select a paygrade");
                return;
            }
            if (annualLeaves === null || casualLeaves === null || maternityLeaves === null || noPayLeaves === null) {
                notifyError("Please fill all the fields");
                return;
            }
            if (
                isNaN(Number(annualLeaves)) ||
                isNaN(Number(casualLeaves)) ||
                isNaN(Number(maternityLeaves)) ||
                isNaN(Number(noPayLeaves))
            ) {
                notifyError("Please enter valid numbers for leave counts");
                return;
            }
            if (
                Number(annualLeaves) <= 0 ||
                Number(casualLeaves) <= 0 ||
                Number(maternityLeaves) <= 0 ||
                Number(noPayLeaves) <= 0
            ) {
                notifyError("Leave count cannot be zero");
                return;
            }
            if (Number(noPayLeaves) < 50) {
                notifyError("No pay leaves should be greater than 50");
                return;
            }
             await updateLeaveCountByPaygrade(selectedPayGradeId, Number(annualLeaves) ?? 0, Number(casualLeaves) ?? 0, Number(maternityLeaves) ?? 0, Number(noPayLeaves) ?? 0)
            .then(() => {
                notifySuccess("Leave count updated successfully");
            })
            .catch((error)=> {
                notifyError("Error Saving "+error);
            })
        } catch (error) {
            notifyError("Error Saving "+error);
        }
    }

    useEffect(()=>{
        const role = localStorage.getItem("role");
        if(role !== "Admin"){
            navigate("/dashboard");
        }

    })

    useEffect(()=>{
        const fetchPayGrades = async () => {
            try {
                const paygrades = await getPayGrades();
                setPayGrades(paygrades);
            } catch (error) {
                console.error("Error fetching paygrades: ", error);
            }
        }
        fetchPayGrades();
    },[]);

    useEffect(()=> {
        const fetchLeaveCount = async () => {
            if(selectedPayGradeId){
                try {
                    const response = await getLeaveCountByPaygrade(selectedPayGradeId);
                    console.log("Leave count response: ", response);
                    setAnnualLeaves(response.data.annual_leaves);
                    setCasualLeaves(response.data.casual_leaves);
                    setMaternityLeaves(response.data.maternity_leaves);
                    setNoPayLeaves(response.data.no_pay_leaves);
                } catch (error) {
                    console.error("Error fetching leave count: ", error);
                }
            }
        }
        fetchLeaveCount();
    },[selectedPayGradeId])


  return (
   <DefaultLayout>
    <Breadcrumb pageName="Leave Count Configuration" />
    <div className="">
        <select
            className="rounded border border-stroke bg-white py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            value={selectedPayGradeId}
            onChange={(e) => setSelectedPayGradeId(e.target.value)}
        >
            {payGrades.map((payGrade) => (
                <option key={payGrade.pay_grade_id} value={payGrade.pay_grade_id}>
                    {payGrade.grade_name}
                </option>
            ))}
        </select>

        <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Annual Leaves:
                </label>
                <input
                    type="text"
                    value={annualLeaves ?? ""}
                    onChange={(e) => setAnnualLeaves(e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-white py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"

                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Casual Leaves:
                </label>
                <input
                    type="text"
                    value={casualLeaves ?? ""}
                    onChange={(e) => setCasualLeaves(e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-white py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"

/>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Maternity Leaves:
                </label>
                <input
                    type="text"
                    value={maternityLeaves ?? ""}
                    onChange={(e) => setMaternityLeaves(e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-white py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    No Pay Leaves:
                </label>
                <input
                    type="text"
                    value={noPayLeaves ?? ""}
                    onChange={(e) => setNoPayLeaves(e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-white py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
            </div>
        </div>
        <button onClick={handleSave} className="mt-4.5 w-full sm:w-auto flex items-center justify-center gap-1 rounded-lg border border-primary bg-primary py-2 px-4 text-center font-medium text-white transition hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
            Save
        </button>
    </div>
    <ToastContainer></ToastContainer>
   </DefaultLayout>
  )
}

export default LeaveCountConfig
