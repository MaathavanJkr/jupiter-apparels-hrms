import { Link, useParams } from "react-router-dom"
import Breadcrumb from "../components/Breadcrumbs/Breadcrumb"
import DefaultLayout from "../layout/DefaultLayout"
import LeaveTable from "../components/Tables/LeaveTable";

const LeaveHistory = () => {
  const {employee_id} = useParams<{employee_id : string}>();
  return (
    <DefaultLayout>
        <Breadcrumb pageName="Leaves" />
          <div className="mb-6">
            <Link to={'/leave/apply/'+employee_id}>
                <button className="flex gap-1 block  rounded border border-primary bg-primary p-3 text-center font-medium text-white transition hover:bg-primary-dark">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                    Apply Leave
                </button>
            </Link>
          </div>
        <LeaveTable  employee_id = {employee_id!} />

    </DefaultLayout>
  )
}

export default LeaveHistory
