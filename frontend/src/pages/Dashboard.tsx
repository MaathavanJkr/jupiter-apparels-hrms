import Breadcrumb from "../components/Breadcrumbs/Breadcrumb"
import AdminDashboard from "../components/Dashboard/AdminDashboard"
import DefaultLayout from "../layout/DefaultLayout"

const Dashboard = () => {
  // const role = localStorage.getItem('role');
  return (
    <DefaultLayout>
      <Breadcrumb pageName="" />
      {/* {role === 'Admin' && <AdminDashboard />}
      {role !== 'Admin' && <EmployeeDashboard />} */}
      <AdminDashboard />
    </DefaultLayout>
  )
}

export default Dashboard
