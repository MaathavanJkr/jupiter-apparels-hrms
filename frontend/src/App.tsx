import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Employees from './pages/Employees';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import LogIn from './pages/Authentication/LogIn';

import DefaultLayout from './layout/DefaultLayout';
import AddEmployee from './pages/AddEmployee';
import EmployeeDetails from './pages/EmployeeDetails';

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
    <DefaultLayout>
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
          path="/auth/login"
          element={
            <>
              <PageTitle title="Log in | Jupiter Apparels" />
              <LogIn />
            </>
          }
        />
      </Routes>
    </DefaultLayout>
  );
}

export default App;
