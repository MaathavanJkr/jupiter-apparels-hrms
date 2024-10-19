import React, { useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';

interface leaveAppData {
  employeeid: string;
  startdate: string;
  enddate: string;
  reason: string;
}

const defaultleaveAppData: leaveAppData = {
  employeeid: '',
  startdate: '',
  enddate: '',
  reason: '',
};

const Leaveapplication = () => {
  const [leaveAppData, setleaveAppData] =
    useState<leaveAppData>(defaultleaveAppData);

  const handleleaveAppDataChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newleaveAppData: leaveAppData = {
      ...leaveAppData,
      [event.target.name]: event.target.value,
    };

    setleaveAppData(newleaveAppData);
  };

  return (
    <DefaultLayout>
      <div className=" w-full h-screen flex items-center justify-center">
        <div className="w-[50%] h-[90%] bg-gray-300 p-6 rounded-lg shadow-lg dark:bg-blue-950">
          <h2 className="text-2xl font-bold text-black shadow-lg text-center bg-gray-200 py-5 dark:bg-blue-900 dark:text-white">
            Leave Application
          </h2>
          <div className="pt-5">
            <h1 className="text-lg text-black dark:text-white">Employee ID</h1>
            <input
              className="shadow-lg rounded-md p-3 mt-3 w-4/5  dark:bg-blue-900"
              name="employeeid"
              type="text"
              placeholder="Enter Employee ID"
              onChange={handleleaveAppDataChange}
            ></input>

            <h1 className="mt-4 text-lg text-black dark:text-white">
              Start Date
            </h1>
            <input
              className="shadow-lg rounded-md p-3 mt-3 w-4/5  dark:bg-blue-900 "
              name="startdate"
              type="date"
              placeholder="Enter start date"
              onChange={handleleaveAppDataChange}
            ></input>

            <h1 className="mt-4 text-lg text-black dark:text-white">
              End Date
            </h1>
            <input
              className="shadow-lg rounded-md p-3 mt-3 w-4/5  dark:bg-blue-900"
              name="enddate"
              type="date"
              placeholder="Enter end date"
              onChange={handleleaveAppDataChange}
            ></input>

            <h1 className="mt-4 text-lg text-black dark:text-white">Reason</h1>
            <input
              className="shadow-lg rounded-md p-3 mt-3 w-4/5 pb-10 dark:bg-blue-900"
              name="reason"
              type="text"
              placeholder="Enter reason"
              onChange={handleleaveAppDataChange}
            ></input>
          </div>
          <div className="mt-7 flex justify-normal">
            <button className="shadow-lg m-2 rounded-lg bg-blue-700 card-btn font-bold text-black self-center hover:bg-green-500 dark:text-white">
              Submit
            </button>
            <button className="shadow-lg card-btn rounded-lg bg-gray-500 text-black font-bold self-center hover:bg-red-600 dark:text-white">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Leaveapplication;
