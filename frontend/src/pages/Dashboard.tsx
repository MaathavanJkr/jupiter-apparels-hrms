import Breadcrumb from "../components/Breadcrumbs/Breadcrumb"
import AdminDashboard from "../components/Dashboard/AdminDashboard"
import DefaultLayout from "../layout/DefaultLayout"

const Dashboard = () => {
  return (
    <DefaultLayout>
        <Breadcrumb pageName="Dashboard" />
        <AdminDashboard />
    </DefaultLayout>
  )
}

export default Dashboard
