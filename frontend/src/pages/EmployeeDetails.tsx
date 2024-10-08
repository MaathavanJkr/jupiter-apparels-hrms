import { Link, useParams } from "react-router-dom";
import DependentTable from "../components/Tables/DependentTable";
import ContactTable from "../components/Tables/ContactTable";
import { ToastContainer } from "react-toastify";

const EmployeeDetails = () => {

    const { employee_id } = useParams<{ employee_id: string }>();
  return (
    <>
        <div className="flex-col gap-6">
            <h3 className="pb-2 text-xl font-bold text-black dark:text-white sm:text-2xl">
                Dependent Details
            </h3>
            <span className="mx-auto mb-6 inline-block h-1 w-25 rounded bg-primary"></span>
            <div className="mb-6">
                <Link to={'/employee/adddependent/'+employee_id}>
                    <button className="flex gap-1 block  rounded border border-primary bg-primary p-3 text-center font-medium text-white transition hover:bg-primary-dark">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                        </svg>
                        Add Dependent
                    </button>
                </Link>
            </div>
            <div className="mb-6">
                <DependentTable employee_id={employee_id!}  />
            </div>
            

            <h3 className="pb-2 text-xl font-bold text-black dark:text-white sm:text-2xl">
                Emergency Contact  Details
            </h3>
            <span className="mx-auto mb-6 inline-block h-1 w-25 rounded bg-primary"></span>
            <div className="mb-6">
                <Link to={'/employee/addcontact/'+employee_id}>
                    <button className="flex gap-1 block  rounded border border-primary bg-primary p-3 text-center font-medium text-white transition hover:bg-primary-dark">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        Add Contact
                    </button>
                </Link>
            </div>
            <ContactTable employee_id= {employee_id!} />
        </div>
        <ToastContainer />

    </>
  )
}

export default EmployeeDetails
