import React, { useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import { CustomAttributeData } from '../../types/configuration';
import { ToastContainer } from 'react-toastify';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';


const EditCustomAttribute = () => {
  const [customAttributeData, setCustomAttributeData] =
    useState<CustomAttributeData>({
      cust_attr_1_value: '',
      cust_attr_2_value: '',
      cust_attr_3_value: '',
    });

  const handleCustomAttributeDataChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newCustomAttributeData: CustomAttributeData = {
      ...customAttributeData,
      [event.target.name]: event.target.value,
    };

    setCustomAttributeData(newCustomAttributeData);
  }

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Edit Custom Attributes" />
      <div className="mt-10 bg-white dark:bg-boxdark shadow-lg rounded-lg p-6 space-y-4 border border-stroke dark:border-strokedark">
        <div className="mb-4.5">
          <label className="mb-2.5 block text-black dark:text-white">
            Custom Attribute 1 <span className="text-meta-1">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter Custom Attribute"
            name="cust_attr_1_value"
            onChange={handleCustomAttributeDataChange}
            className="w-1/2 rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>
        <div className="mb-4.5">
          <label className="mb-2.5 block text-black dark:text-white">
            Custom Attribute 2 <span className="text-meta-1">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter Custom Attribute"
            name="cust_attr_2_value"
            onChange={handleCustomAttributeDataChange}
            className="w-1/2 rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>
        <div className="mb-4.5">
          <label className="mb-2.5 block text-black dark:text-white">
            Custom Attribute 3 <span className="text-meta-1">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter Custom Attribute"
            name="cust_attr_3_value"
            onChange={handleCustomAttributeDataChange}
            className="w-1/2 rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>

        <div className="w-full px-3 2xsm:w-1/2">
          <button
            // onClick={handleSubmit}
            className="block w-full rounded border border-primary bg-primary p-3 text-center font-medium text-white transition hover:bg-primary-dark"
          >
            Save
          </button>
        </div>
        <ToastContainer />
      </div>
    </DefaultLayout>
  );
};

export default EditCustomAttribute;
