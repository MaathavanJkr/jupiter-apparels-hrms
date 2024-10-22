import { useEffect, useState } from "react";
import { Branch, Department, JobTitle, EmploymentStatus, PayGrade, Supervisor } from "../../types/types";
import { getBranches } from "../../services/branchService";
import { getDepartments } from "../../services/departmentServices";
import { getEmploymentStatuses } from "../../services/employmentStatusServices";
import { getJobTitles } from "../../services/jobTitleServices";
import { getPayGrades } from "../../services/payGradeServices";
import { getSupervisors } from "../../services/supervisorServices";
import { addEmployee } from "../../services/employeeServices";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { notifyError, notifySuccess } from "../../services/notify";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../../layout/DefaultLayout";

const AddEmployee = () => {

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


  const [branches, setBranches] = useState<Branch[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [jobTitles, setJobTitles] = useState<JobTitle[]>([]);
  const [employmentStatuses, setEmploymentStatuses] = useState<EmploymentStatus[]>([]);
  const [payGrades, setPayGardes] = useState<PayGrade[]>([]);
  const [supervisors, setSupervisors] = useState<Supervisor[]>([]);

  const navigate = useNavigate();
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
        setSupervisors(supervisors || []);
        console.log(supervisors)
      } catch (error) {
        console.error("Failed to fetch Data", error);
      }
    }

    fetchData();
  }, [])

  const handleSubmit = () => {
    if (firstName !== "" && lastName !== "" && email !== "" && nic !== "" && contactNumber !== "" && birthday && maritalStatus !== "" && gender !== "" && address !== ""
      && jobTitleId !== "" && branchId !== "" && departmentId !== "" && employeeStatusId !== "" && payGradeId !== "" && supervisorId !== ""
    ) {
      addEmployee(departmentId, branchId, supervisorId, firstName, lastName, birthday, gender, maritalStatus, address, email, nic, jobTitleId, payGradeId, employeeStatusId, contactNumber).then(() => {
        notifySuccess("Employee Added Sucessfully");
        navigate("/employee");
      }).catch((error) => {
        notifyError(`Failed to Add Employee: ${error}`);
      })
    } else {
      notifyError("Please fill all fields");
    }
  }
  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="Add Employee" />
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
            <div className="mb-5.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Supervisors <span className="text-meta-1">*</span>
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
            <div className="mb-5.5">
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
            <div className="mb-3.5">
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
            <button onClick={handleSubmit} className="block w-full rounded border border-primary bg-primary p-3 text-center font-medium text-white transition hover:bg-primary-dark">
              Add Employee
            </button>
          </div>
          <div className="w-full px-3 2xsm:w-1/2">
            <button onClick={() => { navigate('/employee/all') }} className="block w-full rounded border border-stroke bg-gray p-3 text-center font-medium text-black transition hover:border-meta-1 hover:bg-meta-1 hover:text-white dark:border-strokedark dark:bg-meta-4 dark:text-white dark:hover:border-meta-1 dark:hover:bg-meta-1">
              Cancel
            </button>
          </div>
        </div>
        <ToastContainer />
      </DefaultLayout>
    </>
  )
}

export default AddEmployee;
