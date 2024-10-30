import { useEffect, useState } from 'react';
import { Organization } from '../../types/types';
import {
  getOrganization,
  updateOrganization,
} from '../../services/organizationServices';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { notifyError, notifySuccess } from '../../services/notify';
import { ToastContainer } from 'react-toastify';

const OrganizationConfig = () => {
  const [organization, setOrganization] = useState<Organization>({
    organization_id: '',
    name: '',
    address: '',
    reg_no: 0,
  });
  useEffect(() => {
    const fetchOrganization = async () => {
      try {
        const organization: Organization = await getOrganization();
        setOrganization(organization);
      } catch (error) {
        console.log('Error Fetching Organization: ', error);
      }
    };
    fetchOrganization();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOrganization((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (
      organization.name !== '' &&
      organization.address !== '' &&
      organization.reg_no !== 0
    ) {
      await updateOrganization(organization)
        .then(() => {
          notifySuccess('Successfully Updated');
        })
        .catch((error) => {
          notifyError(`Error Updating: ${error}`);
        });
    } else {
      notifyError('Fill All Fields!');
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Edit Organization" />
      <div className="mt-10 bg-white dark:bg-boxdark shadow-lg rounded-lg p-6 space-y-4 border border-stroke dark:border-strokedark">
        <div className="mb-4.5">
          <label className="mb-2.5 block text-black dark:text-white">
            Name <span className="text-meta-1">*</span>
          </label>
          <input
            type="text"
            name="name"
            autoComplete="off"
            value={organization.name}
            onChange={handleChange}
            placeholder="Enter Name"
            className="w-1/2 rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>
        <div className="mb-4.5">
          <label className="mb-2.5 block text-black dark:text-white">
            Address <span className="text-meta-1">*</span>
          </label>
          <input
            type="text"
            name="address"
            autoComplete="off"
            value={organization.address}
            onChange={handleChange}
            placeholder="Enter Address"
            className="w-1/2 rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>
        <div className="mb-4.5">
          <label className="mb-2.5 block text-black dark:text-white">
            Registration Number <span className="text-meta-1">*</span>
          </label>
          <input
            type="text"
            name="reg_no"
            autoComplete="off"
            value={organization.reg_no}
            onChange={handleChange}
            placeholder="Enter Registration number"
            className="w-1/2 rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>

        <div className="w-full px-3 2xsm:w-1/2">
          <button
            onClick={handleSubmit}
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

export default OrganizationConfig;
