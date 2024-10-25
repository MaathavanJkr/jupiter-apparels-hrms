import React, { useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import EDRTable from '../../components/Tables/EDRTable';
import TLDTable from '../../components/Tables/TLDTable';
import axiosInstance from '../../axiosConfig';

interface TLDData {
  startdate: string;
  enddate: string;
}
const defaultTLDData: TLDData = {
  startdate: '',
  enddate: '',
};

interface EDRData {
  department: string;
}

const defaultEDRData: EDRData = {
  department: '',
};

const Report = () => {
  const [TLDData, setTLDData] = useState<TLDData>(defaultTLDData);
  const [TLDReportData, setTLDReportData] = useState<any>(null);

  const [EDRData, setEDRData] = useState<EDRData>(defaultEDRData);
  const [EDRReportData, setEDRReportData] = useState<any>(null);

  const resetReports = () => {
    setTLDReportData(null);
    setEDRReportData(null);
  };

  const handleEDRChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEDRData((prevData: any) => ({ ...prevData, [name]: value }));
  };

  const handleTLDChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setTLDData((prevData) => ({ ...prevData, [name]: value }));
  };

  const fetchEDRReportData = async () => {
    try {
      resetReports();
      const response = await axiosInstance.get(
        `/report/employee/dept/${EDRData.department}`,
      );
      setEDRReportData(response.data);
    } catch (error) {
      console.error('Error fetching report data:', error);
    }
  };

  const fetchTLDReportData = async () => {
    try {
      resetReports();
      const response = await axiosInstance.get(`/report/totalleaves`, {
        params: {
          start_date: TLDData.startdate,
          end_date: TLDData.enddate,
        },
      });
      setTLDReportData(response.data);
    } catch (error) {
      console.error('Error fetching report data:', error);
    }
  };

  return (
    <DefaultLayout>
      <div className="w-full flex flex-col h-screen">
        <h1 className="font-bold text-2xl">Report Generation</h1>

        <div className="w-full flex flex-row flex-wrap items-start justify-between space-x-4 h-[80%] mb-10">
          <div className="shadow-lg flex flex-col w-[30%] my-5 bg-slate-200 rounded-3xl h-full dark:bg-blue-800">
            <h1 className="text-lg p-5 text-black font-bold bg-slate-300 text-center rounded-t-lg dark:text-white dark:bg-blue-950 shadow-lg">
              Employee By Department Report
            </h1>
            <div className="w-full justify-around flex flex-col items-center ">
              <div className="p-5">
                <h2 className="my-5 text-black-2 dark:text-white">
                  Department
                </h2>
                <select
                  value={EDRData.department}
                  name="department"
                  onChange={handleEDRChange}
                  className="p-3 px-10 dark:bg-blue-950 shadow-lg rounded-md text-black-2  dark:text-white"
                >
                  <option value="" disabled>
                    Select a Department
                  </option>
                  <option value="D001">HR</option>
                  <option value="D002">Finance</option>
                  <option value="D003">IT</option>
                  <option value="D004">Marketing</option>
                  <option value="D005">Production</option>
                  <option value="D006">Customer Service</option>
                  <option value="D007">Sales</option>
                  <option value="D008">Quality Assurance</option>
                  <option value="D009">Corporate Management</option>
                </select>
              </div>
            </div>
            <button
              className="mt-10 hover:bg-green-500 card-btn text-gray-300 self-center dark:bg-blue-950 dark:hover:bg-green-500"
              onClick={fetchEDRReportData}
            >
              Generate
            </button>
          </div>

          <div className="shadow-lg flex flex-col w-[30%] my-5 bg-slate-200 rounded-3xl h-full dark:bg-blue-800">
            <h1 className="p-5 text-lg text-black font-bold bg-slate-300 text-center rounded-t-lg dark:text-white dark:bg-blue-950 shadow-lg">
              Total Leaves By Department Report
            </h1>
            <div className="w-full justify-around flex flex-col items-center">
              <div className="p-5">
                <h2 className="my-5 text-black-2 dark:text-white">
                  Start Date
                </h2>
                <input
                  type="date"
                  value={TLDData.startdate}
                  name="startdate"
                  onChange={handleTLDChange}
                  className="p-2 px-15 dark:bg-blue-950 shadow-lg rounded-md"
                />
              </div>

              <div className="pb-3">
                <h2 className="p-3 text-black-2 dark:text-white">End Date</h2>
                <input
                  type="date"
                  value={TLDData.enddate}
                  name="enddate"
                  onChange={handleTLDChange}
                  className="p-2 px-15 dark:bg-blue-950 shadow-lg rounded-md"
                />
              </div>
            </div>
            <button
              className="mt-8 hover:bg-green-500 card-btn text-gray-300 self-center mt-3 dark:bg-blue-950 dark:hover:bg-green-500"
              onClick={fetchTLDReportData}
            >
              Generate
            </button>
          </div>
        </div>

        <div className="w-full mt-5">
          {EDRReportData && <EDRTable reportdata={EDRReportData} />}
          {TLDReportData && <TLDTable reportdata={TLDReportData} />}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Report;
