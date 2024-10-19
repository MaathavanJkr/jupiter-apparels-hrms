import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb"
import { Employee } from "../../types/types";
import { getEmployeeByID } from "../../services/employeeServices";
import { useEffect, useState } from "react";
import { notifyError, notifySuccess } from "../../services/notify";
import { ToastContainer } from "react-toastify";
import { addDependent } from "../../services/dependentServices";
import DefaultLayout from "../../layout/DefaultLayout";


const AddDependent = () => {
    const { employee_id } = useParams<{ employee_id: string }>();
    const [currEmployee, setCurrEmployee] = useState<Employee>();
    useEffect(() => {
        const fetchEmployee = async (employee_id: string) => {
            try {
                const currEmployee: Employee = await getEmployeeByID(employee_id);
                setCurrEmployee(currEmployee);
            } catch (error) {
                console.error("Failed to fetch Employee", error);
            }
        }

        fetchEmployee(employee_id!);
    }, [])

    const navigate = useNavigate();

    const [name, setName] = useState<string>('');
    const [relationship, setRelationship] = useState<string>('');
    const [birthdate, setBirthdate] = useState<string>('');

    const handleSubmit = () => {
        if (name !== '' && relationship !== '' && birthdate !== '') {
            addDependent(employee_id!, name, relationship, birthdate)
                .then(() => {
                    notifySuccess("Successfully added dependent");
                    navigate('/employee/details/' + employee_id)
                })
        } else {
            notifyError('Fill all Fields');
        }
    }
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Add Dependent" />
            <h4>Add dependent for Employee: &nbsp;  <b className="text-primary">{currEmployee?.first_name + ' ' + currEmployee?.last_name}</b></h4>

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
                        Birth Date <span className="text-meta-1">*</span>
                    </label>
                    <input
                        type="date"
                        value={birthdate}
                        onChange={(e) =>
                            setBirthdate(e.target.value)
                        }
                        placeholder="Enter Last Name"
                        className="rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                </div>

                <div className="-mx-3 flex flex-wrap gap-y-4">
                    <div className="w-full px-3 2xsm:w-1/2">
                        <button onClick={handleSubmit} className="block w-full rounded border border-primary bg-primary p-3 text-center font-medium text-white transition hover:bg-primary-dark">
                            Add Dependent
                        </button>
                    </div>
                    <div className="w-full px-3 2xsm:w-1/2">
                        <button onClick={() => { navigate("/employee/details/" + employee_id) }} className="block w-full rounded border border-stroke bg-gray p-3 text-center font-medium text-black transition hover:border-meta-1 hover:bg-meta-1 hover:text-white dark:border-strokedark dark:bg-meta-4 dark:text-white dark:hover:border-meta-1 dark:hover:bg-meta-1">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </DefaultLayout>
    )
}

export default AddDependent
