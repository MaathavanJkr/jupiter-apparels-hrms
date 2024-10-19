import Breadcrumb from "../components/Breadcrumbs/Breadcrumb"
import AdminDashboard from "../components/Dashboard/AdminDashboard"
import EmployeeDashboard from "../components/Dashboard/EmployeeDashboard"
import DefaultLayout from "../layout/DefaultLayout"

const Dashboard = () => {
  const role = localStorage.getItem('role');
  return (
    <DefaultLayout>
      <Breadcrumb pageName="" />
      {role === 'Admin' && <AdminDashboard />}
      {role !== 'Admin' && <EmployeeDashboard />}
    </DefaultLayout>
  )
}

export default Dashboard
