import React, { useState } from 'react'
import DefaultLayout from '../../layout/DefaultLayout'
import ContactTable from '../../components/Tables/ContactTable'

const Report = () => {
    const[selectedDepartment,setDepartment] = useState("");
    const[selectedJobtitle,setJobtitle] = useState("");
    const[selectedPaygrade,setPaygrade] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setDepartment(event.target.value);
    };



  return (
    <DefaultLayout>
        <div className=' w-full flex flex-col '>
            <h1 className=' font-bold text-2xl'>
                Report Generation
            </h1>
            <div className=' w-full flex flex-row flex-wrap items-start justify-around'>
                <div className='flex flex-col w-4/5 sm:w-2/5 my-5 bg-slate-200 rounded-3xl h-[450px] lg:w-[30%]'>
                    <h1 className='p-5 text-lg text-blue-700 font-bold bg-slate-300 text-center rounded-lg' >Grouped Employee Report</h1>
                    <div className='w-full justify-around flex flex-col items-center'>
                        <div className='pt-5'>
                            <h2 className='p-3'>Department</h2>
                            <select value={selectedDepartment} onChange={handleChange} className='p-2 px-15'>
                                <option value="HR">Human Resource</option>
                                <option value="Packing">Packing</option>
                                <option value="Delivery">Delivery</option>
                            </select>
                        </div>

                        <div>
                            <h2 className='p-3'>Job Title</h2>
                            <select value={selectedJobtitle} onChange={handleChange} className='p-2 px-15'>
                                <option value="HR">Human Resource</option>
                                <option value="Packing">Packing</option>
                                <option value="Delivery">Delivery</option>
                            </select>
                        </div>

                        <div className='pb-8'>
                            <h2 className='p-3'>Pay Grade</h2>
                            <select value={selectedPaygrade} onChange={handleChange} className='p-2 px-15'>
                                <option value="HR">Human Resource</option>
                                <option value="Packing">Packing</option>
                                <option value="Delivery">Delivery</option>
                            </select>
                        </div>

                    </div>
                    <button className='card-btn text-gray-300 self-center' >Generate</button>
                </div>

                <div className='flex flex-col w-4/5 sm:w-2/5 my-5 bg-slate-200 rounded-3xl h-[450px] lg:w-[30%]'>
                    <h1 className='p-5 text-lg text-blue-700 font-bold bg-slate-300 text-center rounded-lg' >Total Leaves By Department Report</h1>
                    <div className='w-full justify-around flex flex-col items-center'>
                        <div className='pt-5'>
                            <h2 className='p-3'>Department</h2>
                            <select value={selectedDepartment} onChange={handleChange} className='p-2 px-15'>
                                <option value="HR">Human Resource</option>
                                <option value="Packing">Packing</option>
                                <option value="Delivery">Delivery</option>
                            </select>
                        </div>

                        <div>
                            <h2 className='p-3'>Job Title</h2>
                            <select value={selectedJobtitle} onChange={handleChange} className='p-2 px-15'>
                                <option value="HR">Human Resource</option>
                                <option value="Packing">Packing</option>
                                <option value="Delivery">Delivery</option>
                            </select>
                        </div>

                        <div className='pb-8'>
                            <h2 className='p-3'>Pay Grade</h2>
                            <select value={selectedPaygrade} onChange={handleChange} className='p-2 px-15'>
                                <option value="HR">Human Resource</option>
                                <option value="Packing">Packing</option>
                                <option value="Delivery">Delivery</option>
                            </select>
                        </div>

                    </div>
                    <button className='card-btn text-gray-300 self-center' >Generate</button>
                </div>

                <div className='flex flex-col w-4/5 sm:w-2/5 my-5 bg-slate-200 rounded-3xl h-[450px] lg:w-[30%] '>
                    <h1 className='text-lg p-5 text-blue-700 font-bold bg-slate-300 text-center rounded-lg' >Employee By Department Report</h1>
                    <div className='w-full justify-around flex flex-col items-center'>
                        <div className='pt-5'>
                            <h2 className='p-3'>Department</h2>
                            <select value={selectedDepartment} onChange={handleChange} className='p-2 px-15'>
                                <option value="HR">Human Resource</option>
                                <option value="Packing">Packing</option>
                                <option value="Delivery">Delivery</option>
                            </select>
                        </div>

                        <div>
                            <h2 className='p-3'>Job Title</h2>
                            <select value={selectedJobtitle} onChange={handleChange} className='p-2 px-15'>
                                <option value="HR">Human Resource</option>
                                <option value="Packing">Packing</option>
                                <option value="Delivery">Delivery</option>
                            </select>
                        </div>

                        <div className='pb-8'>
                            <h2 className='p-3'>Pay Grade</h2>
                            <select value={selectedPaygrade} onChange={handleChange} className='p-2 px-15'>
                                <option value="HR">Human Resource</option>
                                <option value="Packing">Packing</option>
                                <option value="Delivery">Delivery</option>
                            </select>
                        </div>

                    </div>
                    <button className='card-btn text-gray-300 self-center' >Generate</button>
                </div>

                <div className='flex flex-col w-4/5 sm:w-2/5 my-5 bg-slate-200 rounded-3xl h-[450px] lg:w-[30%]'>
                    <h1 className='text-lg p-5 text-blue-700 font-bold bg-slate-300 text-center rounded-lg' >Custom Report</h1>
                    <div className='w-full justify-around flex flex-col items-center'>
                        <div className='pt-5'>
                            <h2 className='p-3'>Department</h2>
                            <select value={selectedDepartment} onChange={handleChange} className='p-2 px-15'>
                                <option value="HR">Human Resource</option>
                                <option value="Packing">Packing</option>
                                <option value="Delivery">Delivery</option>
                            </select>
                        </div>

                        <div>
                            <h2 className='p-3'>Job Title</h2>
                            <select value={selectedJobtitle} onChange={handleChange} className='p-2 px-15'>
                                <option value="HR">Human Resource</option>
                                <option value="Packing">Packing</option>
                                <option value="Delivery">Delivery</option>
                            </select>
                        </div>

                        <div className='pb-8'>
                            <h2 className='p-3'>Pay Grade</h2>
                            <select value={selectedPaygrade} onChange={handleChange} className='p-2 px-15'>
                                <option value="HR">Human Resource</option>
                                <option value="Packing">Packing</option>
                                <option value="Delivery">Delivery</option>
                            </select>
                        </div>

                    </div>
                    <button className='card-btn text-gray-300 self-center' >Generate</button>
                </div>

            </div>
        </div>
    </DefaultLayout>
  )
}

export default Report