import { useState, useEffect } from "react";
import { getEmployees } from "../services/employeeServices";
import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../layout/DefaultLayout";
import { Employee } from "../types/types";
import EmployeeTable from "../components/Tables/EmployeeTable";

const Employees = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string|null>(null);
    const [itemsPerPage, setItemsPerPage] = useState<number>(0);
    const [searchKey, setSearchKey] = useState<string>('');

    useEffect(()=>{
        const fetchEmployees = async () => {
            try {
                const employees = await getEmployees();
                setEmployees(employees);
            }
            catch (error) {
                setError("Failed to fetch Employees");
            }
            finally {
                setLoading(false);
            }
        }

        fetchEmployees();
    },[])

    if (error) {
        return <div>{error}</div>
    }

    return (

            <>
                <Breadcrumb pageName="Employees" />
            <div className="flex gap-4">
                <div className="mb-5.5">
                <select
                    className="rounded border border-stroke bg-white py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    name="selectItemsPerPage"
                    id="selectItemsPerPage"
                    value={itemsPerPage}
                    onChange={(e) => setItemsPerPage(Number(e.target.value))}
                >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="100">100</option>
                    <option value="500">500</option>
                </select>
                </div>
                <div className="mb-4.5">
                <input
                    type="text"
                    value={searchKey}
                    onChange={(e) =>
                    setSearchKey(e.target.value)
                    }
                    placeholder="Search..."
                    className="w-full rounded border-[1.5px] border-stroke bg-white py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                </div>
            </div>
            <div className="flex flex-col gap-10">
                <EmployeeTable employeeData={employees} nameSearchKey={searchKey} itemsPerPage={itemsPerPage} />
            </div>

            </>
    )
}

export default Employees;
