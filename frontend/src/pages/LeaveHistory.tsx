import { useParams } from "react-router-dom"
import Breadcrumb from "../components/Breadcrumbs/Breadcrumb"
import DefaultLayout from "../layout/DefaultLayout"

const LeaveHistory = () => {
  const {employee_id} = useParams<{employee_id : string}>();
  return (
    <DefaultLayout>
        <Breadcrumb pageName="Leaves" />
    </DefaultLayout>
  )
}

export default LeaveHistory
