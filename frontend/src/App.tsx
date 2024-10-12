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
import SupervisorLeave from './pages/SupervisorLeave';

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
          path="/supervisor/leaveview/:supervisor_id"
          element={
            <>
              <PageTitle title= "Leave | Jupiter Apparels" />
              <SupervisorLeave />
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
