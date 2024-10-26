import AdminDashboard from "../components/Dashboard/AdminDashboard"
import DefaultLayout from "../layout/DefaultLayout"

const Dashboard = () => {
  // const role = localStorage.getItem('role');
  return (
    <DefaultLayout>
      {/* {role === 'Admin' && <AdminDashboard />}
      {role !== 'Admin' && <EmployeeDashboard />} */}
      <AdminDashboard />
    </DefaultLayout>
  )
}

export default Dashboard
