import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Employees from './pages/Employee/Employees';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import LogIn from './pages/Authentication/LogIn';

import AddEmployee from './pages/Employee/AddEmployee';
import EmployeeDetails from './pages/Employee/EmployeeDetails';
import AddDependent from './pages/Employee/AddDependent';
import AddContact from './pages/Employee/AddContact';
import Profile from './pages/User/Profile';
import ChangePassword from './pages/User/ChangePassword';
import LeaveHistory from './pages/Leaves/LeaveHistory';
import ViewLeave from './pages/Leaves/ViewLeave';
import SupervisorLeave from './pages/Leaves/SupervisorLeave';
import Dashboard from './pages/Dashboard';
import OrganizationConfig from './pages/Configuration/OrganizationConfig';

import Report from './pages/Reports/Report';
import CreateUserAccount from './pages/User/CreateUserAccount';
import ApplyLeave from './pages/Leaves/ApplyLeave';
import Home from './pages/Home/Home';
import About from './pages/Home/About';
import Contact from './pages/Home/Contact';
import Features from './pages/Home/Features';
import EditCustomAttribute from './pages/Configuration/EditCustomAttribute';
import EmployeeDashboardPage from './pages/EmployeeDashboard';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <PageTitle title="Homepage | Jupiter Apparels" />
            <Home />
          </>
        }
      />

      <Route
        path="/about"
        element={
          <>
            <PageTitle title="About | Jupiter Apparels" />
            <About />
          </>
        }
      />

      <Route
        path="/features"
        element={
          <>
            <PageTitle title="Features | Jupiter Apparels" />
            <Features />
          </>
        }
      />

      <Route
        path="/contact"
        element={
          <>
            <PageTitle title="Contact | Jupiter Apparels" />
            <Contact />
          </>
        }
      />
      <Route
        path="/dashboard"
        element={
          <>
            <PageTitle title="Dashboard | Jupiter Apparels" />
            <Dashboard />
          </>
        }
      />
      <Route
        path="/dashboard/employee"
        element={
          <>
            <PageTitle title="Dashboard | Jupiter Apparels" />
            <EmployeeDashboardPage />
          </>
        }
      />
      <Route
        path="/employee/all"
        element={
          <>
            <PageTitle title="Employees | Jupiter Apparels" />
            <Employees />
          </>
        }
      />
      <Route
        path="/employee/add"
        element={
          <>
            <PageTitle title="Add Employee | Jupiter Apparels" />
            <AddEmployee />
          </>
        }
      />
      <Route
        path="/employee/details/:employee_id"
        element={
          <>
            <PageTitle title="Employee Details | Jupiter Apparels" />
            <EmployeeDetails />
          </>
        }
      />
      <Route
        path="/employee/adddependent/:employee_id"
        element={
          <>
            <PageTitle title="Add Dependent | Jupiter Apparels" />
            <AddDependent />
          </>
        }
      />
      <Route
        path="/employee/addcontact/:employee_id"
        element={
          <>
            <PageTitle title="Add Contact | Jupiter Apparels" />
            <AddContact />
          </>
        }
      />

      <Route
        path="/report"
        element={
          <>
            <PageTitle title="Report | Jupiter Apparels" />
            <Report />
          </>
        }
      />
      <Route
        path="/user/create"
        element={
          <>
            <PageTitle title="User Account Creation | Jupiter Apparels" />
            <CreateUserAccount />
          </>
        }
      />
      <Route
        path="/config/organization"
        element={
          <>
            <PageTitle title="Organization | Jupiter Apparels" />
            <OrganizationConfig />
          </>
        }
      />
      <Route
        path="/config/customattribute/edit"
        element={
          <>
            <PageTitle title="Edit Custom Atrribute | Jupiter Apparels" />
            <EditCustomAttribute />
          </>
        }
      />
      <Route
        path="/profile/:user_id"
        element={
          <>
            <PageTitle title="Profile | Jupiter Apparels" />
            <Profile />
          </>
        }
      />

      <Route
        path="/leave/apply"
        element={
          <>
            <PageTitle title="Apply Leave | Jupiter Apparels" />
            <ApplyLeave />
          </>
        }
      />
      <Route
        path="/leave/history/:employee_id"
        //   path="/leave/history/test"
        element={
          <>
            <PageTitle title="Leave History | Jupiter Apparels" />
            <LeaveHistory />
          </>
        }
      />
      <Route
        path="/leave/view/:application_id"
        element={
          <>
            <PageTitle title="Leave | Jupiter Apparels" />
            <ViewLeave />
          </>
        }
      />
      <Route
        path="/supervisor/leaveview/:supervisor_id"
        element={
          <>
            <PageTitle title="Leave | Jupiter Apparels" />
            <SupervisorLeave />
          </>
        }
      />
      <Route
        path="/auth/changepassword/:user_id"
        element={
          <>
            <PageTitle title="Change Password | Jupiter Apparels" />
            <ChangePassword />
          </>
        }
      />
      <Route
        path="/auth/login"
        element={
          <>
            <PageTitle title="Log in | Jupiter Apparels" />
            <LogIn />
          </>
        }
      />
    </Routes>
  );
}

export default App;
