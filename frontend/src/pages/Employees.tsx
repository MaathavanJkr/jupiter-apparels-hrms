import { useState, useEffect } from "react";
import { getEmployees } from "../services/employeeServices";
import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";
import { Branch, Department, Employee, EmploymentStatus, JobTitle, PayGrade, Supervisor } from "../types/types";
import EmployeeTable from "../components/Tables/EmployeeTable";
import { getBranches } from "../services/branchService";
import { getDepartments } from "../services/departmentServices";
import { getEmploymentStatuses } from "../services/employmentStatusServices";
import { getJobTitles } from "../services/jobTitleServices";
import { getPayGrades } from "../services/payGradeServices";
import { Link } from "react-router-dom";
import { getSupervisors } from "../services/supervisorServices";
import DefaultLayout from "../layout/DefaultLayout";

const Employees = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string|null>(null);
    const [itemsPerPage, setItemsPerPage] = useState<number>(5);
    const [nameSearchKey, setNameSearchKey] = useState<string>('');

    const [branches, setBranches] = useState<Branch[]>([]);
    const [departments, setDepartments] = useState<Department[]>([]);
    const [jobTitles, setJobTitles] = useState<JobTitle[]>([]);
    const [employmentStatuses, setEmploymentStatuses] = useState<EmploymentStatus[]>([]);
    const [payGrades, setPayGardes] = useState<PayGrade[]>([]);
    const [supervisors, setSupervisors] = useState<Supervisor[]>([]);

    const [searchDepartment, setSearchDepartment] = useState<string>('');
    const [searchBranch, setSearchBranch] = useState<string>('');

    // useEffect(()=>{
    //     const fetchData = async () => {
    //         try {
    //             const branches = await getBranches();
    //             const departments = await getDepartments();
    //             const jobTitles = await getJobTitles();
    //             const employmentStatuses = await getEmploymentStatuses();
    //             const payGrades = await getPayGrades();
    //             const supervisors = await getSupervisors();
    //             setJobTitles(jobTitles);
    //             setBranches(branches);
    //             setDepartments(departments);
    //             setEmploymentStatuses(employmentStatuses);
    //             setPayGardes(payGrades);
    //             setSupervisors(supervisors);
    //         } catch (error) {
    //             console.error("Failed to fetch Data",error);
    //         }
    //     }

    //     fetchData();
    // },[])

    // useEffect(()=>{
    //     const fetchEmployees = async () => {
    //         try {
    //             const employees = await getEmployees();
    //             setEmployees(employees);
    //         }
    //         catch (error) {
    //             setError("Failed to fetch Employees");
    //         }
    //         finally {
    //             setLoading(false);
    //         }
    //     }

    //     fetchEmployees();
    // },[])

    if (error) {
        return <div>{error}</div>
    }

    return (

            <>
                <DefaultLayout>
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
                            value={nameSearchKey}
                            onChange={(e) =>
                            setNameSearchKey(e.target.value)
                            }
                            placeholder="Search..."
                            className="w-full rounded border-[1.5px] border-stroke bg-white py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                        </div>
                        <div className="mb-4.5">
                            <select
                                className="rounded border border-stroke bg-white py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                name="selectBranch"
                                id="selectBranch"
                                value={searchBranch}
                                onChange={(e) => setSearchBranch(e.target.value)}
                            >
                                <option value="" disabled>Select Branch</option>
                                {branches?.map(branch=> 
                                    <option key={branch.branch_id} value={branch.branch_id}>{branch.name}</option>
                                )}
                            </select>
                        </div>
                        <div className="mb-4.5">
                            <select
                                className="rounded border border-stroke bg-white py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                name="selectDepartment"
                                id="selectDepartment"
                                value={searchDepartment}
                                onChange={(e) => setSearchDepartment(e.target.value)}
                            >
                                <option value="" disabled>Select Department</option>
                                {departments?.map(department=> 
                                    <option key={department.department_id} value={department.department_id}>{department.name}</option>
                                )}
                            </select>
                        </div>
                        <div className="mb-4.5">
                            <Link to={'/addEmployee'}>
                                <button className="flex gap-1 block w-full rounded border border-primary bg-primary p-3 text-center font-medium text-white transition hover:bg-primary-dark">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                                    </svg>
                                    Add Employee
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className="flex flex-col gap-10">
                        {loading ? <div> Loading</div>:<EmployeeTable employeeData={employees} nameSearchKey={nameSearchKey} itemsPerPage={itemsPerPage} branchData={branches} departmentData={departments} payGradeData={payGrades} jobTitleData={jobTitles} statusData={employmentStatuses} supervisorData={supervisors}/> }
                    </div>

                </DefaultLayout>

            </>
    )
}

export default Employees;
