import { EmployeeInfo } from "../../types/types";

interface EDRTableProps {
  reportdata: EmployeeInfo[];
}

const EDRTable: React.FC<EDRTableProps> = ({ reportdata }) => {
  return (
    <>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          {reportdata.length > 0 ? (
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="min-w-[80px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                    Name
                  </th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                    Job Title
                  </th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                    Pay Grade
                  </th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                    Employement Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {reportdata.map((employee, key) => (
                  <tr key={key}>
                    <td
                      rowSpan={1}
                      className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11"
                    >
                      <h5 className="font-medium text-black dark:text-white">
                        {employee.first_name} {employee.last_name}
                      </h5>
                    </td>
                    <td
                      rowSpan={1}
                      className="border-b border-[#eee] py-5 px-4 dark:border-strokedark"
                    >
                      <p className="text-black dark:text-white">
                        {employee.job_title}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {employee.pay_grade}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {employee.employment_status}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <tr>
              <td colSpan={5} className="border-b border-[#eee] py-5 px-4 text-center dark:border-strokedark">
                <p className="text-black dark:text-white">No Employees found.</p>
              </td>
            </tr>
          )}
        </div>
      </div>
    </>
  );
};

export default EDRTable;
