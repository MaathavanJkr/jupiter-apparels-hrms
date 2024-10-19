import React, { useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import { CustomAttributeData } from '../../types/configuration';


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
      <div className="flex items-center justify-center ">
        <div className="mt-10 w-[40%] h-[50%] bg-gray-300 p-6 rounded-lg shadow-lg dark:bg-blue-950">
          <h2 className="text-2xl font-bold text-black shadow-lg text-center bg-gray-200 py-5 dark:bg-blue-900 dark:text-white">
            Edit Custom Attribute
          </h2>
          <div className="pt-5">
            <h1 className="text-lg text-black dark:text-white">
              Custom Attribute 1
            </h1>
            <input
              className="shadow-lg rounded-md p-3 mt-3 w-4/5  dark:bg-blue-900"
              name="cust_attr_1_value"
              type="text"
              placeholder="Enter Custom Attribute"
              onChange={handleCustomAttributeDataChange}
            ></input>
          </div>
          <div className="pt-5">
            <h1 className="text-lg text-black dark:text-white">
              Custom Attribute 2
            </h1>
            <input
              className="shadow-lg rounded-md p-3 mt-3 w-4/5  dark:bg-blue-900"
              name="cust_attr_2_value"
              type="text"
              placeholder="Enter Custom Attribute"
              onChange={handleCustomAttributeDataChange}
            ></input>
          </div>
          <div className="pt-5">
            <h1 className="text-lg text-black dark:text-white">
              Custom Attribute 3
            </h1>
            <input
              className="shadow-lg rounded-md p-3 mt-3 w-4/5  dark:bg-blue-900"
              name="cust_attr_3_value"
              type="text"
              placeholder="Enter Custom Attribute"
              onChange={handleCustomAttributeDataChange}
            ></input>
          </div>
          <div className="mt-12 flex justify-normal">
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

export default EditCustomAttribute;
