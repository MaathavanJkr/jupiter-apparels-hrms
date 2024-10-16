import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Employees from './pages/Employees';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import LogIn from './pages/Authentication/LogIn';


import AddEmployee from './pages/AddEmployee';
import EmployeeDetails from './pages/EmployeeDetails';
import AddDependent from './pages/AddDependent';
import AddContact from './pages/AddContact';
import Profile from './pages/Profile';
import ChangePassword from './pages/ChangePassword';
import LeaveHistory from './pages/LeaveHistory';
import ViewLeave from './pages/ViewLeave';

import Report from './pages/reportPage/Report';
import UserAccount from './pages/user_account_creation/UserAccount';
import Leaveapplication from './pages/leaveapplication/Leaveapplication';
import Addcustomattribute from './pages/addcustomatrribute/Addcustomattribute';
import Home from './pages/homepage/Home';

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
          path="/employees"
          element={
            <>
              <PageTitle title="Employees | Jupiter Apparels" />
              <Employees />
            </>
          }
        />

      <Route
          path="/homepage"
          element={
            <>
              <PageTitle title="Homepage | Jupiter Apparels" />
              <Home />
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
          path="/createuseraccount"
          element={
            <>
              <PageTitle title="User Account Creation | Jupiter Apparels" />
              <UserAccount/>
            </>
          }
        />
        <Route
          path="/leaveapplication"
          element={
            <>
              <PageTitle title="Leave Application Submission | Jupiter Apparels" />
              <Leaveapplication/>
            </>
          }
        />

        <Route
          path="/addcustomatrribute"
          element={
            <>
              <PageTitle title="Add Custom Atrribute | Jupiter Apparels" />
              <Addcustomattribute/>
            </>
          }
        />
        <Route
          path="/addEmployee"
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
              <PageTitle title= "Employee Details | Jupiter Apparels" />
              <EmployeeDetails />
            </>
          }
        />
        <Route
          path="/employee/adddependent/:employee_id"
          element={
            <>
              <PageTitle title= "Add Dependent | Jupiter Apparels" />
              <AddDependent />
            </>
          }
        />
        <Route
          path="/employee/addcontact/:employee_id"
          element={
            <>
              <PageTitle title= "Add Contact | Jupiter Apparels" />
              <AddContact />
            </>
          }
        />
        <Route
          path="/profile/:user_id"
          element={
            <>
              <PageTitle title= "Profile | Jupiter Apparels" />
              <Profile />
            </>
          }
        />
        <Route
          path="/leave/history/:employee_id"
          element={
            <>
              <PageTitle title= "Leave History | Jupiter Apparels" />
              <LeaveHistory />
            </>
          }
        />
        <Route
          path="/leave/view/:application_id"
          element={
            <>
              <PageTitle title= "Leave | Jupiter Apparels" />
              <ViewLeave />
            </>
          }
        />
        <Route
          path="/auth/changepassword/:user_id"
          element={
            <>
              <PageTitle title= "Change Password | Jupiter Apparels" />
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
