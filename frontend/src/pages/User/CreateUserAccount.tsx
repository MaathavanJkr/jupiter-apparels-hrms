import React, { useEffect, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import { useNavigate, useParams } from 'react-router-dom';
import { createUserAccount } from '../../services/userServices';
import { notifyError, notifySuccess } from '../../services/notify';
import { ToastContainer } from 'react-toastify';
import { Employee } from '../../types/types';
import { getEmployeeByID } from '../../services/employeeServices';

interface userAccountData {
  username: string;
  password: string;
  role: string;
}

const deafultuserAccountData: userAccountData = {
  username: '',
  password: '',
  role: '',
};

const CreateUserAccount = () => {
  const navigate = useNavigate();
  const [userAccountData, setuserAccountData] = useState<userAccountData>(
    deafultuserAccountData,
  );
  const [employee, setEmployee] = useState<Employee>();


  const { employee_id } = useParams<{ employee_id: string }>();
  useEffect(()=>{
    const fetchEmployee = async () => {
     try {
      const employee : Employee = await getEmployeeByID(employee_id!);
      setEmployee(employee);
     } catch (error) {
      console.log("Error Fetching Employee", error);
     }
    }
    fetchEmployee();
  },[])
  const handleSubmit = async () => {
    try {
      await createUserAccount(
        employee_id!,
        userAccountData.role,
        userAccountData.username,
        userAccountData.password,
      ).then(() => {notifySuccess('User Account Created Successfully')})
      .catch((error) => {notifyError('User Account Creation Failed: '+ error.message)});
    } catch (error) {
      notifyError('User Account Creation Failed');  
  }
}
  const handleuserAccountDataChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const newuserAccountData: userAccountData = {
      ...userAccountData,
      [event.target.name]: event.target.value,
    };

    setuserAccountData(newuserAccountData);
  };

  return (
    <DefaultLayout>
      <div className="flex items-center justify-center">
        <div className="mr-30 w-[45%] h-[75%] bg-gray-300 p-6 rounded-lg shadow-lg dark:bg-blue-950">
          <h2 className="text-2xl font-bold text-black shadow-lg text-center bg-gray-200 py-5 dark:bg-blue-900 dark:text-white">
            User Account Creation
          </h2>
          <div className="pt-5">

            <h1 className="mt-4 text-lg text-black dark:text-white">
              Employee Name: {employee?.first_name + " " + employee?.last_name}
            </h1>
            
            <h1 className="mt-4 text-lg text-black dark:text-white">
              Username
            </h1>
            <input
              className="shadow-lg rounded-md p-3 mt-3 w-4/5  dark:bg-blue-900 "
              name="username"
              type="text"
              placeholder="Enter username"
              autoComplete='off'
              onChange={handleuserAccountDataChange}
            ></input>

            <h1 className="mt-4 text-lg text-black dark:text-white">
              Password
            </h1>
            <input
              className="shadow-lg rounded-md p-3 mt-3 w-4/5  dark:bg-blue-900"
              name="password"
              type="text"
              placeholder="Enter password"
              autoComplete='off'
              onChange={handleuserAccountDataChange}
            ></input>
            <h1 className="mt-4 text-lg text-black dark:text-white">
              Role
            </h1>
            <select
              className="shadow-lg rounded-md p-3 mt-3 w-4/5 dark:bg-blue-900"
              name="role"
              onChange={handleuserAccountDataChange}
              value={userAccountData.role}
            >
              <option value="" disabled>
              Select role
              </option>
              <option value="Employee">Employee</option>
              <option value="Manager">Manager</option>
            </select>
          </div>
          <div className="mt-10 flex justify-normal">
            <button className="shadow-lg m-2 rounded-lg bg-blue-700 card-btn font-bold text-black self-center hover:bg-green-500 dark:text-white" onClick={handleSubmit}>
              Create Account
            </button>
            <button className="shadow-lg card-btn rounded-lg bg-gray-500 text-black font-bold self-center hover:bg-red-600 dark:text-white" onClick={()=>navigate('/employee/all')}>
              Cancel
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </DefaultLayout>
  );
};

export default CreateUserAccount;
