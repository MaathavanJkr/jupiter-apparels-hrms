import React, { useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import ContactTable from '../../components/Tables/ContactTable';

interface GERData {
  department: string;
  jobtitle: string;
  paygrade: string;
}

const defaultGERData: GERData = {
  department: '',
  jobtitle: '',
  paygrade: '',
};

interface TLDData {
  department: string;
  startdate: string;
  enddate: string;
}

const defaultTLDData: TLDData = {
  department: '',
  startdate: '',
  enddate: '',
};

interface EDRData {
  department: string;
}

const defaultEDRData: EDRData = {
  department: '',
};

const attributes = ['atr1', 'atr2', 'atr3'];

const Report = () => {
  const [GERData, setGERData] = useState<GERData>(defaultGERData);
  const [TLDData, setTLDData] = useState<TLDData>(defaultTLDData);
  const [EDRData, setEDRData] = useState<EDRData>(defaultEDRData);
  const [count, setCount] = useState('0');

  const handleGERChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newGERData: GERData = {
      ...GERData,
      [event.target.name]: event.target.value,
    };

    setGERData(newGERData);
  };

  const handleTLDChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setTLDData({
      ...TLDData,
      [name]: value,
    });
  };

  const handleEDRChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setEDRData({
      ...EDRData,
      [name]: value,
    });
  };

  const handleCountChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCount(event.target.value);
  };

  // const fields = [];

  // for(let i = 0 ; i < parseInt(count); i++){
  //     fields.push(
  //         <div>
  //             <h2 className='p-3'>SF</h2>
  //             <select value={selectedJobtitle} onChange={handleGERChange} className='p-2 px-15'>
  //                 {
  //                     attributes.map((val, key))
  //                 }
  //             </select>
  //         </div>
  //     )
  // }

  return (
    <DefaultLayout>
      <div className=" w-full flex flex-col ">
        <h1 className=" font-bold text-2xl">Report Generation</h1>
        <div className=" w-full flex flex-row flex-wrap items-start justify-around ">
          <div className="shadow-lg flex flex-col w-4/5 sm:w-2/5 my-5 bg-slate-200 rounded-3xl h-[450px] lg:w-[30%] dark:bg-blue-800">
            <h1 className="p-5 text-lg text-black font-bold bg-slate-300 text-center rounded-t-lg dark:text-white dark:bg-blue-950 shadow-lg">
              Grouped Employee Report
            </h1>
            <div className="w-full justify-around flex flex-col items-center ">
              <div className="pt-5">
                <h2 className="p-3 text-black-2 dark:text-white">Department</h2>
                <select
                  value={GERData.department}
                  name="department"
                  onChange={handleGERChange}
                  className="p-2 px-15  dark:bg-blue-950 shadow-lg"
                >
                  <option value="HR">Human Resource</option>
                  <option value="Packing">Packing</option>
                  <option value="Delivery">Delivery</option>
                </select>
              </div>

              <div>
                <h2 className="p-3  text-black-2 dark:text-white">Job Title</h2>
                <select
                  value={GERData.jobtitle}
                  name="jobtitle"
                  onChange={handleGERChange}
                  className="p-2 px-15  dark:bg-blue-950 shadow-lg"
                >
                  <option value="HR">Human Resource</option>
                  <option value="Packing">Packing</option>
                  <option value="Delivery">Delivery</option>
                </select>
              </div>

              <div className="pb-8">
                <h2 className="p-3  text-black-2 dark:text-white">Pay Grade</h2>
                <select
                  value={GERData.paygrade}
                  name="paygrade"
                  onChange={handleGERChange}
                  className="p-2 px-15  dark:bg-blue-950 shadow-lg"
                >
                  <option value="HR">Human Resource</option>
                  <option value="Packing">Packing</option>
                  <option value="Delivery">Delivery</option>
                </select>
              </div>
            </div>
            <button className=" hover:bg-green-500 card-btn text-gray-300 self-center  dark:bg-blue-950 dark:hover:bg-green-500">
              Generate
            </button>
          </div>

          <div className="shadow-lg flex flex-col w-4/5 sm:w-2/5 my-5 bg-slate-200 rounded-3xl h-[450px] lg:w-[30%] dark:bg-blue-800">
            <h1 className="p-5 text-lg  text-black font-bold bg-slate-300 text-center rounded-t-lg dark:text-white  dark:bg-blue-950 shadow-lg">
              Total Leaves By Department Report
            </h1>
            <div className="w-full justify-around flex flex-col items-center">
              <div className="pt-5">
                <h2 className="p-3  text-black-2 dark:text-white">
                  Department
                </h2>
                <select
                  value={TLDData.department}
                  name="department"
                  onChange={handleTLDChange}
                  className="p-2 px-15  dark:bg-blue-950 shadow-lg"
                >
                  <option value="HR">Human Resource</option>
                  <option value="Packing">Packing</option>
                  <option value="Delivery">Delivery</option>
                </select>
              </div>

              <div>
                <h2 className="p-3  text-black-2 dark:text-white">
                  Start Date
                </h2>
                <input
                  type="date"
                  value={TLDData.startdate}
                  name="startdate"
                  onChange={handleTLDChange}
                  className="p-2 px-15  dark:bg-blue-950 shadow-lg"
                />
              </div>

              <div className="pb-3">
                <h2 className="p-3  text-black-2 dark:text-white">End Date</h2>
                <input
                  type="date"
                  value={TLDData.enddate}
                  name="enddate"
                  onChange={handleTLDChange}
                  className="p-2 px-15  dark:bg-blue-950 shadow-lg"
                />
              </div>
            </div>
            <button className="hover:bg-green-500 card-btn text-gray-300 self-center mt-3  dark:bg-blue-950 dark:hover:bg-green-500">
              Generate
            </button>
          </div>

          <div className="shadow-lg flex flex-col w-4/5 sm:w-2/5 my-5 bg-slate-200 rounded-3xl h-[450px] lg:w-[30%] dark:bg-blue-800">
            <h1 className="text-lg p-5  text-black font-bold bg-slate-300 text-center rounded-t-lg dark:text-white  dark:bg-blue-950 shadow-lg">
              Employee By Department Report
            </h1>
            <div className="w-full justify-around flex flex-col items-center pb-20">
              <div className="pt-5">
                <h2 className="p-3  text-black-2 dark:text-white">
                  Department
                </h2>
                <select
                  value={EDRData.department}
                  name="department"
                  onChange={handleEDRChange}
                  className="p-2 px-15  dark:bg-blue-950 shadow-lg"
                >
                  <option value="HR">Human Resource</option>
                  <option value="Packing">Packing</option>
                  <option value="Delivery">Delivery</option>
                </select>
              </div>
            </div>
            <button className="card-btn text-gray-300 self-center hover:bg-green-500 dark:bg-blue-950 dark:hover:bg-green-500">
              Generate
            </button>
          </div>
          {/* 
                <div className='flex flex-col w-4/5 sm:w-2/5 my-5 bg-slate-200 rounded-3xl h-[450px] lg:w-[30%]'>
                    <h1 className='text-lg p-5 text-blue-700 font-bold bg-slate-300 text-center rounded-lg' >Custom Report</h1>
                    <div className='w-full justify-around flex flex-col items-center'>
                        <div className='pt-5'>
                            <h2 className='p-3'>Count</h2>
                            <select value={count} onChange={handleCountChange} className='p-2 px-15'>
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </select>
                        </div>

                        <div>
                            <h2 className='p-3'>Job Title</h2>
                            <select value={selectedJobtitle} onChange={handleGERChange} className='p-2 px-15'>
                                <option value="HR">Human Resource</option>
                                <option value="Packing">Packing</option>
                                <option value="Delivery">Delivery</option>
                            </select>
                        </div>

                        <div className='pb-8'>
                            <h2 className='p-3'>Pay Grade</h2>
                            <select value={selectedPaygrade} onChange={handleGERChange} className='p-2 px-15'>
                                <option value="HR">Human Resource</option>
                                <option value="Packing">Packing</option>
                                <option value="Delivery">Delivery</option>
                            </select>
                        </div>

                    </div>
                    <button className='card-btn text-gray-300 self-center' >Generate</button>
                </div> */}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Report;
