import React, { useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';

interface userAccountData{
  employeeid : string,
  username : string,
  password : string
}

const deafultuserAccountData : userAccountData = {
  employeeid : '',
  username : '',
  password : ''
}

const UserAccount = () => {
  const [userAccountData,setuserAccountData] = useState<userAccountData>(deafultuserAccountData);

  const handleuserAccountDataChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newuserAccountData : userAccountData = {
        ...userAccountData,
        [event.target.name] : event.target.value
    }

    setuserAccountData(newuserAccountData);
};



  return (
    <DefaultLayout>
      <div className='flex items-center justify-center' >
        <div className='mr-30 w-[45%] h-[75%] bg-gray-300 p-6 rounded-lg shadow-lg dark:bg-blue-950'>
          <h2 className='text-2xl font-bold text-black shadow-lg text-center bg-gray-200 py-5 dark:bg-blue-900 dark:text-white'>User Account Creation</h2>
          <div className='pt-5'>
            <h1 className='text-lg text-black dark:text-white'>Employee ID</h1>
            <input className='shadow-lg rounded-md p-3 mt-3 w-4/5  dark:bg-blue-900' name='employeeid' type='text' placeholder='Enter Employee ID' onChange={handleuserAccountDataChange}></input>

            <h1 className='mt-4 text-lg text-black dark:text-white'>Username</h1>
            <input className='shadow-lg rounded-md p-3 mt-3 w-4/5  dark:bg-blue-900 ' name='username' type='text' placeholder='Enter username' onChange={handleuserAccountDataChange}></input>

            <h1 className='mt-4 text-lg text-black dark:text-white'>Password</h1>
            <input className='shadow-lg rounded-md p-3 mt-3 w-4/5  dark:bg-blue-900' name='password' type='text' placeholder='Enter password' onChange={handleuserAccountDataChange}></input>
          </div>
          <div className='mt-10 flex justify-normal'>
          <button className='shadow-lg m-2 rounded-lg bg-blue-700 card-btn font-bold text-black self-center hover:bg-green-500 dark:text-white' >Create Account</button>
          <button className='shadow-lg card-btn rounded-lg bg-gray-500 text-black font-bold self-center hover:bg-red-600 dark:text-white' >Cancel</button>
          </div>

      
        </div>
    </div>
    </DefaultLayout>

  );
}

export default UserAccount;
