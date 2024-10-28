import { useEffect, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import { ToastContainer } from 'react-toastify';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { getCustomAttributes } from '../../services/attributeServices';


const EditCustomAttribute = () => {
  const [CustomAttribute1, setCustomAttribute1] = useState<string>('');
  const [CustomAttribute2, setCustomAttribute2] = useState<string>('');
  const [CustomAttribute3, setCustomAttribute3] = useState<string>('');

  useEffect(() => {
    // Fetch custom attribute data
    const fetchCustomAttributes = async () => {
      try {
        const attributes = await getCustomAttributes();
        setCustomAttribute1(attributes[0].name);
        setCustomAttribute2(attributes[1].name);
        setCustomAttribute3(attributes[2].name);
      } catch (error) {
        console.log('Error Fetching Custom Attributes: ', error);
      }
    }
    fetchCustomAttributes();
  }
  );

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
            name="cust_attr_1"
            value={CustomAttribute1}
            onChange={(e) => setCustomAttribute1(e.target.value)}
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
            name="cust_attr_2"
            value={CustomAttribute2}
            onChange={(e) => setCustomAttribute2(e.target.value)}
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
            name="cust_attr_3"
            value={CustomAttribute3}
            onChange={(e) => setCustomAttribute3(e.target.value)}
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
