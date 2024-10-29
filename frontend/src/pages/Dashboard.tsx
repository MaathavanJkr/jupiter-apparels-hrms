import AdminDashboard from "../components/Dashboard/AdminDashboard"
import EmployeeDashboard from "../components/Dashboard/EmployeeDashboard"
import DefaultLayout from "../layout/DefaultLayout"

const Dashboard = () => {
  const role = localStorage.getItem('role');

  return (
    <DefaultLayout>
      {role === 'Admin' ? <AdminDashboard /> : <EmployeeDashboard />}
    </DefaultLayout>
  );
}


export default Dashboard
