import Breadcrumb from "../components/Breadcrumbs/Breadcrumb"
import EmployeeDashboard from "../components/Dashboard/EmployeeDashboard"
import DefaultLayout from "../layout/DefaultLayout"

const EmployeeDashboardPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="" />
      <EmployeeDashboard />
    </DefaultLayout>
  )
}

export default EmployeeDashboardPage
