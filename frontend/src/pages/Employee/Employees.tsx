import { useState, useEffect } from 'react';
import { getFilteredCount, getFilteredEmployees } from '../../services/employeeServices';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import {
  Branch,
  Department,
  Employee,
  EmploymentStatus,
  JobTitle,
  PayGrade,
  Supervisor,
} from '../../types/types';
import EmployeeTable from '../../components/Tables/EmployeeTable';
import { getBranches } from '../../services/branchService';
import { getDepartments } from '../../services/departmentServices';
import { getEmploymentStatuses } from '../../services/employmentStatusServices';
import { getJobTitles } from '../../services/jobTitleServices';
import { getPayGrades } from '../../services/payGradeServices';
import { Link } from 'react-router-dom';
import { getSupervisors } from '../../services/supervisorServices';
import DefaultLayout from '../../layout/DefaultLayout';
import ReactPaginate from 'react-paginate';

const Employees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);
  const [nameSearchKey, setNameSearchKey] = useState<string>('');

  const [branches, setBranches] = useState<Branch[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [jobTitles, setJobTitles] = useState<JobTitle[]>([]);
  const [employmentStatuses, setEmploymentStatuses] = useState<
    EmploymentStatus[]
  >([]);
  const [payGrades, setPayGardes] = useState<PayGrade[]>([]);
  const [supervisors, setSupervisors] = useState<Supervisor[]>([]);

  const [searchDepartment, setSearchDepartment] = useState<string>('');
  const [searchBranch, setSearchBranch] = useState<string>('');
  const [filteredCount, setFilteredCount] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const branches = await getBranches();
        const departments = await getDepartments();
        const jobTitles = await getJobTitles();
        const employmentStatuses = await getEmploymentStatuses();
        const payGrades = await getPayGrades();
        const supervisors = await getSupervisors();
        setJobTitles(jobTitles);
        setBranches(branches);
        setDepartments(departments);
        setEmploymentStatuses(employmentStatuses);
        setPayGardes(payGrades);
        setSupervisors(supervisors);
      } catch (error) {
        console.error('Failed to fetch Data', error);
      }
    };

    fetchData();
  }, []);

  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);

  const pageCount = Math.ceil(filteredCount / itemsPerPage);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % filteredCount;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const employees = await getFilteredEmployees(
          nameSearchKey,
          searchBranch,
          searchDepartment,
          itemOffset,
          itemsPerPage,
        );
        const filteredCount = await getFilteredCount(
          nameSearchKey,
          searchBranch,
          searchDepartment,
        );
        setEmployees(employees);
        setFilteredCount(filteredCount);
        console.log('Filtered Count:', filteredCount);
      } catch (error) {
        setError('Failed to fetch Employees');
        console.error('Failed to fetch Employees', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, [
    nameSearchKey,
    searchBranch,
    searchDepartment,
    itemOffset,
    endOffset,
    itemsPerPage,
  ]);

  if (error) {
    return <div>{error}</div>;
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
              onChange={(e) => setNameSearchKey(e.target.value)}
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
              <option value="" disabled>
                Select Branch
              </option>
              {branches?.map((branch) => (
                <option key={branch.branch_id} value={branch.branch_id}>
                  {branch.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4.5">
            <button onClick={() => setSearchBranch('')}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
            </button>
          </div>
          <div className="mb-4.5">
            <select
              className="rounded border border-stroke bg-white py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              name="selectDepartment"
              id="selectDepartment"
              value={searchDepartment}
              onChange={(e) => setSearchDepartment(e.target.value)}
            >
              <option value="" disabled>
                Select Department
              </option>
              {departments?.map((department) => (
                <option
                  key={department.department_id}
                  value={department.department_id}
                >
                  {department.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4.5">
            <button onClick={() => setSearchDepartment('')}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
            </button>
          </div>
          <div className="mb-4.5">
            <Link to={'/employee/add'}>
              <button className="flex gap-1 block w-full rounded border border-primary bg-primary p-3 text-center font-medium text-white transition hover:bg-primary-dark">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
                  />
                </svg>
                Add Employee
              </button>
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-10">
          {loading ? (
            <div> Loading</div>
          ) : (
            <EmployeeTable
              employeeData={employees}
              branchData={branches}
              departmentData={departments}
              payGradeData={payGrades}
              jobTitleData={jobTitles}
              statusData={employmentStatuses}
              supervisorData={supervisors}
            />
          )}
        </div>
        <div className="flex flex-wrap justify-between my-2">
          <div className="flex items-center my-2">
            Showing {itemOffset + 1} to{' '}
            {endOffset < filteredCount ? endOffset : filteredCount} out of{' '}
            {filteredCount}
          </div>
          <div className="overflow-x-auto my-2">
            <ReactPaginate
              breakLabel="..."
              nextLabel=">"
              onPageChange={handlePageClick}
              pageRangeDisplayed={1}
              pageCount={pageCount}
              previousLabel="<"
              renderOnZeroPageCount={null}
              containerClassName={
                'isolate inline-flex -space-x-px rounded-md shadow-sm'
              }
              pageLinkClassName={
                'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-secondary hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
              }
              breakLinkClassName={
                'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-secondary hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
              }
              activeLinkClassName={
                'z-10 bg-secondary text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600'
              }
              previousLinkClassName={
                'relative inline-flex items-center rounded-l-md px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-secondary hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
              }
              nextLinkClassName={
                'relative inline-flex items-center rounded-r-md px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-secondary hover:bg-gray-400'
              }
              disabledLinkClassName={'text-black-100'}
            />
          </div>
          <div></div>
        </div>
      </DefaultLayout>
    </>
  );
};

export default Employees;
