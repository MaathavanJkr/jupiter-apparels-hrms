import { useState } from "react";
import { Employee,Branch,Department,JobTitle,EmploymentStatus,PayGrade, Supervisor } from "../../types/types";
import ReactPaginate from "react-paginate";
import {updateEmployee, deleteEmployee, getEmployeeByID } from "../../services/employeeServices";
import { filterIt } from "../../services/filter";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notifyError,notifySuccess } from "../../services/notify";
import { useNavigate } from "react-router-dom";

const EmployeeTable = ({employeeData,itemsPerPage,nameSearchKey,branchData, departmentData, payGradeData, jobTitleData, statusData, supervisorData}:{employeeData: Employee[], itemsPerPage: number, nameSearchKey: string, branchData:Branch[],departmentData:Department[], payGradeData:PayGrade[], jobTitleData:JobTitle[], statusData:EmploymentStatus[], supervisorData:Supervisor[]}) => {
    const items: Employee[] = Array.isArray(employeeData) ? (nameSearchKey !== "" ? filterIt(employeeData,nameSearchKey): employeeData) : [];

    const itemsLength = items.length;
    const [itemOffset, setItemOffset] = useState(0);

    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  
    const currentItems = Array.isArray(items) ? items.slice(itemOffset, endOffset) : [];
    const pageCount = Math.ceil(itemsLength / itemsPerPage);

    const handlePageClick = (event: { selected: number }) => {
        const newOffset = (event.selected * itemsPerPage) % itemsLength;
        setItemOffset(newOffset);
    };

    const navigate = useNavigate();


    const [employeeId, setEmployeeId] = useState<string>("");
    const [departmentId, setDepartmentId] = useState<string>('');
    const [branchId, setBranchId] = useState<string>('');
    const [supervisorId, setSupervisorId] = useState<string>('');
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [birthday, setBirthday] = useState<string>('');
    const [gender, setGender] = useState<string>("");
    const [maritalStatus, setMaritalStatus] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [nic, setNic] = useState<string>("");
    const [jobTitleId, setJobTitleId] = useState<string>('');
    const [payGradeId, setPayGradeId] = useState<string>('');
    const [employeeStatusId, setEmployeeStatusId] = useState<string>('');
    const [contactNumber, setContactNumber] = useState<string>("");

    const [CurrSupervisor, setCurrSupervisor] = useState<Employee>();

    const [action, setAction] = useState<string>("View");
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [viewSection, setViewSection] = useState<string>("Personal");

    const branches: Branch[] = Array.isArray(branchData) ? branchData : [];
    const departments : Department[] = Array.isArray(departmentData) ? departmentData : [];
    const jobTitles: JobTitle[] = Array.isArray(jobTitleData) ? jobTitleData : [];
    const employmentStatuses: EmploymentStatus[] = Array.isArray(statusData) ? statusData :[];
    const payGrades: PayGrade[] = Array.isArray(payGradeData) ? payGradeData : [];
    const supervisors : Supervisor[] = Array.isArray(supervisorData) ? supervisorData : [];
   


    const fetchEmployee = async (employee_id:string) => {
        try {
            const currEmployee: Employee = await getEmployeeByID(employee_id);
            if (currEmployee && currEmployee.supervisor_id) {
                const CurrSupervisor = await getEmployeeByID(currEmployee.supervisor_id);
                setCurrSupervisor(CurrSupervisor);
            } else {
                console.log ("no supervisor"); 
            }
            return currEmployee;
        } catch (error) {
            console.error("Failed to fetch Employee",error);
        }
    }

    const handleDeleteEmployee = () => {
        if (employeeId !== '') {
            deleteEmployee(employeeId)
            .then(() => {
                notifySuccess("Employee Deleted");
                setModalOpen(false);
            }).catch((error) => {
                notifyError(`Failed to delete: ${error}`);
                setModalOpen(false);
            })
        } else {
            notifyError("No Employee Selected");
        }
    }

    const handleEditEmployee = () => {
        if (firstName !== "" && lastName !== "" && email !== "" && nic !== "" && contactNumber !== "" && birthday && maritalStatus !== "" && gender !== "" && address !== ""
            && jobTitleId !== "" && branchId !== "" && departmentId !== "" && employeeStatusId !== "" && payGradeId !== "" && supervisorId !== ""
         ) {
            updateEmployee(employeeId,departmentId,branchId,supervisorId,firstName,lastName,birthday,gender,maritalStatus,address,email,nic,jobTitleId,payGradeId,employeeStatusId,contactNumber)
            .then(()=>{
                notifySuccess("Employee Updated");
                setModalOpen(false);
            }).catch((error) => {
                notifyError(`Failed to update: ${error}`);
            })
         } else {
            notifyError("Please fill all fields");
         }
    }

    const handleModalSubmit = () => {
        switch (action) {
            case "Edit":
                handleEditEmployee();
                break;
            case "Delete":
                handleDeleteEmployee();
                break;
            default:
                break;
                
        }

    }
    const handleViewModalOpen = async (employee_id:string) => {
        const employee = await fetchEmployee(employee_id);
        setAction("View");

        if (employee && employee.employee_id) {
            setEmployeeId(employee.employee_id);
            setDepartmentId(employee.department_id);
            setBranchId(employee.branch_id);
            setSupervisorId(employee.supervisor_id);
            setFirstName(employee.first_name);
            setLastName(employee.last_name);
            setBirthday(employee.birth_date);
            setGender(employee.gender);
            setMaritalStatus(employee.marital_status);
            setAddress(employee.address);
            setEmail(employee.email);
            setNic(employee.NIC);
            setJobTitleId(employee.job_title_id);
            setPayGradeId(employee.pay_grade_id);
            setEmployeeStatusId(employee.employment_status_id);
            setContactNumber(employee.contact_number);
            setModalOpen(true);
        }
        else {
            notifyError("Employee Not Found");
        }
    }

    const handleEditModalOpen = async (employee_id: string) => {
        setAction("Edit");
        const employee =  await fetchEmployee(employee_id);

        if (employee && employee.employee_id) {
          setEmployeeId(employee.employee_id);
          setDepartmentId(employee.department_id);
          setBranchId(employee.branch_id);
          setSupervisorId(employee.supervisor_id);
          setFirstName(employee.first_name);
          setLastName(employee.last_name);
          setBirthday(employee.birth_date);
          setGender(employee.gender);
          setMaritalStatus(employee.marital_status);
          setAddress(employee.address);
          setEmail(employee.email);
          setNic(employee.NIC);
          setJobTitleId(employee.job_title_id);
          setPayGradeId(employee.pay_grade_id);
          setEmployeeStatusId(employee.employment_status_id);
          setContactNumber(employee.contact_number);
          setModalOpen(true);
        }
        else {
            notifyError("Employee Not Found");
        }
    }

    const handleDeleteModalOpen =async (employee_id: string) => {
        if (employee_id !== "") {
            setAction("Delete");
            const employee = await fetchEmployee(employee_id);
            if (employee && employee.employee_id) {
                setEmployeeId(employee.employee_id);
                setFirstName(employee.first_name);
                setLastName(employee.last_name);
                setModalOpen(true);
            } else {
                notifyError("Employee Not Found");
            }
        } else {
            notifyError("Employee ID is required");
        }
    }


    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className="max-w-full overflow-x-auto">
                <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-gray-2 text-left dark:bg-meta-4">
                        <th className="min-w-[80px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                            Name
                        </th>
                        <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                            Branch
                        </th>
                        <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                            Department
                        </th>
                        <th className="py-4 px-4 font-medium text-black text-center dark:text-white">
                            Job Title
                        </th>
                        <th className="py-4 px-4 font-medium text-black text-center dark:text-white">
                            Employment Status
                        </th>
                        <th className="py-4 px-4 font-medium text-black text-center dark:text-white">
                            Actions
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        <>
                        {currentItems &&
                            currentItems.map((employee, key) => {


                            
                            return (
                                <tr key={key}>

                                <td rowSpan={1} className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                    <h5 className="font-medium text-black dark:text-white">
                                    {employee.first_name + ' ' + employee.last_name}
                                    </h5>
                                </td>
                                <td rowSpan={1} className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p className="text-black dark:text-white">
                                        {branches?.find(branch => branch.branch_id === employee.branch_id)?.name}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p className="text-black dark:text-white">
                                        {departments?.find(dept => dept.department_id === employee.department_id)?.name}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p className="text-black dark:text-white">
                                        {jobTitles?.find(title => title.job_title_id === employee.job_title_id)?.title}
                                    </p>
                                </td>
                                <td>
                                    <div className="flex items-center justify-center">
                                        {employmentStatuses?.find(status => status.employment_status_id === employee.employment_status_id)?.status}
                                    </div>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <div className="flex items-center justify-center space-x-3.5">
                                    <button onClick={() => handleViewModalOpen(employee.employee_id!)} className="hover:text-primary">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        </svg>
                                    </button>
                                    <button onClick={() => handleEditModalOpen(employee.employee_id)} className="hover:text-primary">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                        </svg>
                                    </button>
                                    <button onClick={() => handleDeleteModalOpen(employee.employee_id)} className="hover:text-primary">
                                        <svg
                                        className="fill-current"
                                        width="18"
                                        height="18"
                                        viewBox="0 0 18 18"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        >
                                        <path
                                            d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                                            fill=""
                                        />
                                        <path
                                            d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                                            fill=""
                                        />
                                        <path
                                            d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                                            fill=""
                                        />
                                        <path
                                            d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                                            fill=""
                                        />
                                        </svg>
                                    </button>
                                    </div>
                                </td>

                                </tr>
                            )
                            })}
                        </>
                    </tbody>
                </table>
            </div>
            <div className="flex flex-wrap justify-between my-2">
                <div className="flex items-center my-2">
                Showing {itemOffset + 1} to {endOffset < itemsLength ? endOffset : itemsLength} out of {itemsLength}
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
                    containerClassName={"isolate inline-flex -space-x-px rounded-md shadow-sm"}
                    pageLinkClassName={"relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-secondary hover:bg-gray-50 focus:z-20 focus:outline-offset-0"}
                    breakLinkClassName={"relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-secondary hover:bg-gray-50 focus:z-20 focus:outline-offset-0"}
                    activeLinkClassName={"z-10 bg-secondary text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"}
                    previousLinkClassName={"relative inline-flex items-center rounded-l-md px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-secondary hover:bg-gray-50 focus:z-20 focus:outline-offset-0"}
                    nextLinkClassName={"relative inline-flex items-center rounded-r-md px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-secondary hover:bg-gray-400"}
                    disabledLinkClassName={"text-black-100"}
                />
                </div>
            </div>
            <div className={`fixed left-0 top-0 z-999999 flex h-full min-h-screen w-full items-center justify-center bg-black/90 px-4 py-5 overflow-y-auto ${!modalOpen && 'hidden'}`}
      >
        <div className="w-full max-w-142.5 rounded-lg bg-white px-8 py-12 dark:bg-boxdark md:px-17.5 md:py-15 max-h-screen overflow-y-auto">
          <h3 className="pb-2 text-xl font-bold text-black dark:text-white sm:text-2xl">
            {{
              'Edit': `Edit Employee`,
              'Delete': 'Delete Employee',
              'View': 'View Employee'
            }[action]}
          </h3>
          <span className="mx-auto mb-6 inline-block h-1 w-25 rounded bg-primary"></span>
          {action == "View" && (
            <>
              <div className="flex justify-around pb-8">
                <div className="flex flex-wrap items-center rounded-lg">
                  <button onClick={() => setViewSection("Personal")} className={`inline-flex items-center gap-2.5 border-y border-primary px-2 py-1 font-medium text-primary hover:border-primary hover:bg-primary hover:text-white dark:border-strokedark dark:text-white dark:hover:border-primary sm:px-6 sm:py-3 ${viewSection == 'Personal' && 'border-primary bg-primary text-white'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                  </svg>
                    Personal
                  </button>
                  <button onClick={() => setViewSection("Work")} className={`inline-flex items-center gap-2.5 border-y border-primary px-2 py-1 font-medium text-primary hover:border-primary hover:bg-primary hover:text-white dark:border-strokedark dark:text-white dark:hover:border-primary sm:px-6 sm:py-3 ${viewSection == 'Work' && 'border-primary bg-primary text-white'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                  </svg>
                    Work
                  </button>
                  <button onClick={() => setViewSection("Contact")} className={`inline-flex items-center gap-2.5 rounded-r-lg border border-primary px-2 py-1 font-medium text-primary hover:border-primary hover:bg-primary hover:text-white dark:border-strokedark dark:text-white dark:hover:border-primary sm:px-6 sm:py-3 ${viewSection == 'Contact' && 'border-primary bg-primary text-white'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                    </svg>
                    Contact
                  </button>
                </div>
              </div>
              <div className="mb-6">
                {viewSection === "Personal" && (
                  <div className="space-y-2">
                    <div>Name : {firstName+" "+lastName}</div>
                    <div>NIC : {nic}</div>
                    <div>Birthday : {new Date(birthday).toLocaleDateString() }</div>
                    <div>Gender : {gender}</div>
                    <div>Marital Status: {maritalStatus}</div>
                  </div>
                )}
                {viewSection === "Work" && (
                  <div className="space-y-2">
                    <div>Branch : {branches?.find(branch=> branch.branch_id === branchId)?.name}</div>
                    <div>Department: {departments?.find(department=> department.department_id === departmentId)?.name}</div>
                    <div>Job Title: {jobTitles?.find(jobTitle => jobTitle.job_title_id === jobTitleId)?.title}</div>
                    <div>Employment Status: {employmentStatuses?.find(status => status.employment_status_id === employeeStatusId)?.status}</div>
                    <div>Supervisor: {CurrSupervisor ? (CurrSupervisor?.first_name + " " + CurrSupervisor?.last_name) : ""}</div>
                    <div>Paygrade: {payGrades?.find(grade => grade.pay_grade_id === payGradeId)?.grade_name}</div>
                  </div>
                )}

                {viewSection === "Contact" && (
                  <div className="space-y-2">
                    <div>Phone : {contactNumber}</div>
                    <div>Email: {email}</div>
                    <div>Address: {address}</div>
                  </div>
                )}
              </div>

              <div className="-mx-3 flex flex-wrap gap-y-4">
                <div className="w-full px-3 2xsm:w-1/2">
                  <button onClick={() => {
                    handleEditModalOpen(employeeId)
                  }} className="block w-full rounded border border-primary bg-primary p-3 text-center font-medium text-white transition hover:bg-primary-dark">
                    Edit
                  </button>
                </div>
                <div className="w-full px-3 2xsm:w-1/2">
                  <button onClick={() => {
                    navigate('/employee/details/'+employeeId);
                  }} className="block w-full rounded border border-primary bg-primary p-3 text-center font-medium text-white transition hover:bg-primary-dark">
                    Dependents & contacts
                  </button>
                </div>
                <div className="w-full px-3 2xsm:w-1/2">
                  <button onClick={() => {setViewSection("Personal");setModalOpen(false);}} className="block w-full rounded border border-stroke bg-gray p-3 text-center font-medium text-black transition hover:border-meta-1 hover:bg-meta-1 hover:text-white dark:border-strokedark dark:bg-meta-4 dark:text-white dark:hover:border-meta-1 dark:hover:bg-meta-1">
                    Close
                  </button>
                </div>
              </div>
            </>
          )}
          {action == "Delete" && (
            <>
              <div className="mb-4.5">Confirm to delete Employee: {firstName+" "+lastName}</div>
              <div className="-mx-3 flex flex-wrap gap-y-4">
                <div className="w-full px-3 2xsm:w-1/2">
                  <button onClick={() => setModalOpen(false)} className="block w-full rounded border border-stroke bg-gray p-3 text-center font-medium text-black transition hover:border-meta-1 hover:bg-meta-1 hover:text-white dark:border-strokedark dark:bg-meta-4 dark:text-white dark:hover:border-meta-1 dark:hover:bg-meta-1">
                    Cancel
                  </button>
                </div>
                <div className="w-full px-3 2xsm:w-1/2">
                  <button onClick={handleModalSubmit} className="block w-full rounded border border-primary bg-primary p-3 text-center font-medium text-white transition hover:bg-primary-dark">
                    {action} Employee
                  </button>
                </div>
              </div>
            </>
          )}

          {(action == "Edit") && (
            <>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      First Name <span className="text-meta-1">*</span>
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) =>
                        setFirstName(e.target.value)
                      }
                      placeholder="Enter First Name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Last Name <span className="text-meta-1">*</span>
                    </label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) =>
                        setLastName(e.target.value)
                      }
                      placeholder="Enter Last Name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      NIC <span className="text-meta-1">*</span>
                    </label>
                    <input
                      type="text"
                      value={nic}
                      onChange={(e) =>
                        setNic(e.target.value)
                      }
                      placeholder="Enter NIC"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Birth Date <span className="text-meta-1">*</span>
                    </label>
                    <input
                      type="date"
                      value={birthday}
                      onChange={(e) =>
                        setBirthday(e.target.value)
                      }
                      placeholder="Enter NIC"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Gender <span className="text-meta-1">*</span>
                    </label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    >
                      <option value="" disabled>
                        Select Gender
                      </option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Marital Status <span className="text-meta-1">*</span>
                    </label>
                    <select
                      value={maritalStatus}
                      onChange={(e) => setMaritalStatus(e.target.value)}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    >
                      <option value="" disabled>
                        Select Marital Status
                      </option>
                      <option value="Single">Single</option>
                      <option value="Married">Married</option>
                      <option value="Divorced">Divorced</option>
                      <option value="Widowed">Widowed</option>
                    </select>
                  </div>
                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Email <span className="text-meta-1">*</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) =>
                        setEmail(e.target.value)
                      }
                      placeholder="Enter Email Address"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
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
                      placeholder="Enter Address"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>
                <div>
                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Branch <span className="text-meta-1">*</span>
                    </label>
                    <select
                      value={branchId}
                      onChange={(e) => setBranchId(e.target.value)}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    >
                      <option value="" disabled>Select Branch</option>
                      {branches?.map(branch => (
                        <option key={branch.branch_id} value={branch.branch_id}>{branch.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Department <span className="text-meta-1">*</span>
                    </label>
                    <select
                      value={departmentId}
                      onChange={(e) => setDepartmentId(e.target.value)}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    >
                      <option value="" disabled>Select Department</option>
                      {departments?.map(department => (
                        <option key={department.department_id} value={department.department_id}>{department.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-5.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Supervisor <span className="text-meta-1">*</span>
                    </label>
                    <select
                      value={supervisorId}
                      onChange={(e) => setSupervisorId(e.target.value)}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    >
                      <option value="" disabled>Select Supervisor</option>
                      {supervisors?.map(supervisor => (
                        <option key={supervisor.supervisor_id} value={supervisor.supervisor_id}>{supervisor.full_name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Pay Grade <span className="text-meta-1">*</span>
                    </label>
                    <select
                      value={payGradeId}
                      onChange={(e) => setPayGradeId(e.target.value)}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    >
                      <option value="" disabled>Select Paygrade</option>
                      {payGrades?.map(grade => (
                        <option key={grade.pay_grade_id} value={grade.pay_grade_id}>
                          {grade.grade_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                     Employment Status <span className="text-meta-1">*</span>
                    </label>
                    <select
                      value={employeeStatusId}
                      onChange={(e) => setEmployeeStatusId(e.target.value)}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    >
                      <option value="" disabled>Select Employment Status</option>
                      {employmentStatuses?.map(status => (
                        <option key={status.employment_status_id} value={status.employment_status_id}>
                          {status.status}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Job Title <span className="text-meta-1">*</span>
                    </label>
                    <select
                      value={jobTitleId}
                      onChange={(e) => {
                        setJobTitleId(e.target.value); 
                      }}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    >
                      <option value="" disabled>Select Job Title</option>
                      {
                        jobTitles?.map(title => (
                          <option key={title.job_title_id} value={title.job_title_id} >
                            {title.title}
                          </option>
                        ))
                      }
                    </select>
                  </div>
                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Phone <span className="text-meta-1">*</span>
                    </label>
                    <input
                      type="text"
                      value={contactNumber}
                      onChange={(e) =>
                        setContactNumber(e.target.value)
                      }
                      placeholder="Enter Contact Number"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>
              </div>
              <div className="-mx-3 flex flex-wrap gap-y-4">
                <div className="w-full px-3 2xsm:w-1/2">
                  <button onClick={() => setModalOpen(false)} className="block w-full rounded border border-stroke bg-gray p-3 text-center font-medium text-black transition hover:border-meta-1 hover:bg-meta-1 hover:text-white dark:border-strokedark dark:bg-meta-4 dark:text-white dark:hover:border-meta-1 dark:hover:bg-meta-1">
                    Cancel
                  </button>
                </div>
                <div className="w-full px-3 2xsm:w-1/2">
                  <button onClick={handleModalSubmit} className="block w-full rounded border border-primary bg-primary p-3 text-center font-medium text-white transition hover:bg-primary-dark">
                    {action} Employee
                  </button>
                </div>
              </div>
            </>
          )}

        </div>
      </div >
      <ToastContainer />
    </div>
    );
}

export default EmployeeTable;