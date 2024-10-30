import React, { useEffect, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import EDRTable from '../../components/Tables/EDRTable';
import TLDTable from '../../components/Tables/TLDTable';
import GERTable from '../../components/Tables/GERTable';
import { TLDData, EDRData, GERData, Department, CustomAttribute } from '../../types/types';
import {
  fetchEDRReportData,
  fetchTLDReportData,
  fetchGERReportData,
  fetchCAReportData,
} from '../../services/reportTableServices';
import { getDepartments } from '../../services/departmentServices';
import { getCustomAttributes } from '../../services/attributeServices';
import { formatString } from '../../utils/stringUtils';

const Report = () => {
  const [GERData, setGERData] = useState<GERData>({
    group: '',
  });
  const [GERReportData, setGERReportData] = useState<any>(null);

  const [TLDData, setTLDData] = useState<TLDData>({
    startdate: '',
    enddate: '',
  });
  const [TLDReportData, setTLDReportData] = useState<any>(null);

  const [EDRData, setEDRData] = useState<EDRData>({
    department: '',
  });
  const [EDRReportData, setEDRReportData] = useState<any>(null);
  const [customAttributeNo, setCustomAttributeNo] = useState<number>(1);
  const [customAttributeValue, setCustomAttributeValue] = useState<string>('');
  const [customAttributes, setCustomAttributes] = useState<CustomAttribute[]>([]);

  const [CAReportData, setCAReportData] = useState<any>(null);

  const resetReports = () => {
    setTLDReportData(null);
    setEDRReportData(null);
    setGERReportData(null);
    setCAReportData(null);
  };

  const handleGERChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setGERData((prevData) => ({ ...prevData, [name]: value }));
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

  const [departments, setDepartments] = useState<Department[]>([]);

  const handleGERGenerate = async () => {
    resetReports();
    setGERReportData(await fetchGERReportData(GERData));
  }

  const handleTLDGenerate = async () => {
    resetReports();
    setTLDReportData(await fetchTLDReportData(TLDData));
  }

  const handleEDRGenerate = async () => {
    resetReports();
    setEDRReportData(await fetchEDRReportData(EDRData));
  }

  const handleCARGenerate = async () => {
    resetReports(); 
    setCAReportData(await fetchCAReportData(customAttributeNo, customAttributeValue));
  }

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const departments = await getDepartments();
        const customAttributes = await getCustomAttributes();
        setDepartments(departments);
        setCustomAttributes(customAttributes);
      } catch (error) {
        console.log('Error Fetching Departments:', error);
      }
    };

    fetchDepartments();
  }, []);

  return (
    <DefaultLayout>
      <div className="w-full flex flex-col h-screen">
        <h1 className="font-bold text-2xl">Report Generation</h1>

        <div className="w-full flex flex-row flex-wrap items-start justify-between space-x-1 h-[80%] mb-10">
          <div className="shadow-lg flex flex-col w-[24%] my-5 bg-slate-200 rounded-3xl h-full dark:bg-blue-800">
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
                  className="p-3 dark:bg-blue-950 shadow-lg rounded-md text-black-2  dark:text-white"
                >
                  <option value="" disabled>
                    Select a Department
                  </option>
                  {departments.map((department) => (
                    <option key={department.department_id} value={department.department_id}>
                      {department.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button
              className="mt-10 hover:bg-green-500 card-btn text-gray-300 self-center dark:bg-blue-950 dark:hover:bg-green-500"
              onClick={handleEDRGenerate}
            >
              Generate
            </button>
          </div>

          <div className="shadow-lg flex flex-col w-[24%] my-5 bg-slate-200 rounded-3xl h-full dark:bg-blue-800">
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
                  className="p-2 dark:bg-blue-950 shadow-lg rounded-md"
                />
              </div>

              <div className="pb-3">
                <h2 className="p-3 text-black-2 dark:text-white">End Date</h2>
                <input
                  type="date"
                  value={TLDData.enddate}
                  name="enddate"
                  onChange={handleTLDChange}
                  className="p-2 dark:bg-blue-950 shadow-lg rounded-md"
                />
              </div>
            </div>
            <button
              className="mt-8 hover:bg-green-500 card-btn text-gray-300 self-center mt-3 dark:bg-blue-950 dark:hover:bg-green-500"
              onClick={handleTLDGenerate}
            >
              Generate
            </button>
          </div>

          <div className="shadow-lg flex flex-col w-[24%] my-5 bg-slate-200 rounded-3xl h-full dark:bg-blue-800">
            <h1 className="p-5 text-lg text-black font-bold bg-slate-300 text-center rounded-t-lg dark:text-white dark:bg-blue-950 shadow-lg">
              Grouped Employee Report
            </h1>
            <div className="w-full justify-around flex flex-col items-center">
              <div className="p-5 ">
                <h2 className="my-5 text-black-2 dark:text-white">Group By</h2>
                <select
                  value={GERData.group}
                  name="group"
                  onChange={handleGERChange}
                  className="p-3 dark:bg-blue-950 shadow-lg rounded-md text-black-2  dark:text-white"
                >
                  <option value="" disabled>
                    Select a Group
                  </option>
                  <option value="Department">Department</option>
                  <option value="PayGrade">Pay Grade</option>
                  <option value="JobTitle">Job Title</option>
                  <option value="EmploymentStatus">Employement Status</option>
                </select>
              </div>
            </div>
            <button
              className="mt-10 hover:bg-green-500 card-btn text-gray-300 self-center dark:bg-blue-950 dark:hover:bg-green-500"
              onClick={handleGERGenerate}
            >
              Generate
            </button>
          </div>
          <div className="shadow-lg flex flex-col w-[24%] my-5 bg-slate-200 rounded-3xl h-full dark:bg-blue-800">
            <h1 className="p-5 text-lg text-black font-bold bg-slate-300 text-center rounded-t-lg dark:text-white dark:bg-blue-950 shadow-lg">
              Custom Attribute Employee Report
            </h1>
            <div className="w-full justify-around flex flex-col items-center">
              <div className="p-5 ">
                <h2 className="my-5 text-black-2 dark:text-white">Attribute </h2>
                <select
                  value={customAttributeNo}
                  name="group"
                  onChange={(e)=>setCustomAttributeNo(parseInt(e.target.value))}
                  className="p-3 dark:bg-blue-950 shadow-lg rounded-md text-black-2  dark:text-white"
                >
                  <option value="" disabled>
                    Select an attribute
                  </option>
                  {customAttributes.map((attribute) => (
                    <option key={attribute.custom_attribute_key_id} value={attribute.custom_attribute_key_id}>
                      {formatString(attribute.name)}
                    </option>
                  ))}
                </select>
                  <h2 className="my-5 text-black-2 dark:text-white">Value</h2>
                  <input
                  type="text"
                  value={customAttributeValue}
                  placeholder='Enter value to search'
                  onChange={(e) => setCustomAttributeValue(e.target.value)}
                  className="p-3 dark:bg-blue-950 shadow-lg rounded-md text-black-2 dark:text-white"
                  />
              </div>
            </div>
            <button
              className="mt-10 hover:bg-green-500 card-btn text-gray-300 self-center dark:bg-blue-950 dark:hover:bg-green-500"
              onClick={handleCARGenerate}
            >
              Generate
            </button>
          </div>
        </div>

        <div className="w-full mt-10">
          {EDRReportData && <EDRTable reportdata={EDRReportData.data} />}
          {TLDReportData && <TLDTable reportdata={TLDReportData} />}
          {GERReportData && <GERTable reportdata={GERReportData} />}
          {CAReportData && <EDRTable reportdata={CAReportData.data} />}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Report;
