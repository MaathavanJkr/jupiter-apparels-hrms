import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumbs/Breadcrumb"
import { Employee } from "../types/types";
import { getEmployeeByID } from "../services/employeeServices";
import { useState } from "react";
import { notifyError, notifySuccess } from "../services/notify";
import { ToastContainer } from "react-toastify";
import { addContact } from "../services/emergencyContactServices";


const AddDependent = () => {
    const { employee_id } = useParams<{ employee_id: string }>();
    const [currEmployee, setCurrEmployee] = useState<Employee>();
    const fetchEmployee = async (employee_id:string) => {
        try {
            const currEmployee: Employee = await getEmployeeByID(employee_id);
            setCurrEmployee(currEmployee);
        } catch (error) {
            console.error("Failed to fetch Employee",error);
        }
    }

    fetchEmployee(employee_id!);

    const navigate = useNavigate();

    const [name, setName] = useState<string>('');
    const [relationship, setRelationship] = useState<string>('');
    const [contactNo, setContactNo] = useState<string>('');
    const [address, setAddress] = useState<string>('');

    const handleSubmit = () => {
        if (name !== '' && relationship !== '' && contactNo !== '') {
            addContact(employee_id!,name,relationship,contactNo,address)
            .then(()=> {
                notifySuccess("Successfully added Contact");
                navigate('/employee/details/'+employee_id)
            })
        } else {
            notifyError('Fill all Fields');
        }
    }
  return (
    <div>
      <Breadcrumb pageName="Add Contact" />
      <h4>Add Contact for Employee: &nbsp;  <b className="text-primary">{currEmployee?.first_name + ' ' + currEmployee?.last_name}</b></h4>
      
      <div className="mt-6.5">
            <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                    Name <span className="text-meta-1">*</span>
                </label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) =>
                    setName(e.target.value)
                    }
                    placeholder="Enter Name"
                    className="rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                </div>
                <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                    Relationship <span className="text-meta-1">*</span>
                </label>
                <input
                    type="text"
                    value={relationship}
                    onChange={(e) =>
                    setRelationship(e.target.value)
                    }
                    placeholder="Enter Relationship"
                    className="rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                </div>
                <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                    Contact No <span className="text-meta-1">*</span>
                </label>
                <input
                    type="text"
                    value={contactNo}
                    onChange={(e) =>
                    setContactNo(e.target.value)
                    }
                    placeholder="Enter Contact Number"
                    className="rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                </div>
                <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                    Address <span className="text-meta-1">*</span>
                </label>
                <input
                    type="text"
                    value={address}
                    onChange={(e) =>
                    setAddress(e.target.value)
                    }
                    placeholder="Enter Contact Number"
                    className="rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                </div>
                

                <div className="-mx-3 flex flex-wrap gap-y-4">
                <div className="w-full px-3 2xsm:w-1/2">
                  <button onClick={handleSubmit} className="block w-full rounded border border-primary bg-primary p-3 text-center font-medium text-white transition hover:bg-primary-dark">
                    Add Contact
                  </button>
                </div>
                <div className="w-full px-3 2xsm:w-1/2">
                  <button onClick={() =>{navigate("/employee/details/"+employee_id)}} className="block w-full rounded border border-stroke bg-gray p-3 text-center font-medium text-black transition hover:border-meta-1 hover:bg-meta-1 hover:text-white dark:border-strokedark dark:bg-meta-4 dark:text-white dark:hover:border-meta-1 dark:hover:bg-meta-1">
                    Cancel
                  </button>
                </div>
              </div>
        </div>
        <ToastContainer />
    </div>
  )
}

export default AddDependent
