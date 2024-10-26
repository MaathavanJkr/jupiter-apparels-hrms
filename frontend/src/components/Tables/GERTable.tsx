import React from 'react';

interface ReportData {
  [key: string]: string;
  employee_id: string;
  first_name: string;
  last_name: string;
}

interface GERTableProps {
  reportdata: {
    data: ReportData[];
  };
}

const GERTable: React.FC<GERTableProps> = ({ reportdata }) => {
  const groupKey =
    Object.keys(reportdata.data[0]).find(
      (key) =>
        key !== 'employee_id' && key !== 'first_name' && key !== 'last_name',
    ) || 'Group';

  const groupedData = reportdata.data.reduce(
    (acc, item) => {
      const groupValue = item[groupKey];
      if (!acc[groupValue]) {
        acc[groupValue] = [];
      }
      acc[groupValue].push(item);
      return acc;
    },
    {} as Record<string, ReportData[]>,
  );

  return (
    <div className="mb-10 w-full rounded-sm border border-stroke bg-slate-200 px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead className="bg-gray-300">
            <tr className=" text-left dark:bg-meta-4">
              <th className="min-w-[80px] py-4 px-4 font-medium text-black-2 dark:text-white xl:pl-11">
                {groupKey}
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black-2 dark:text-white">
                Employee ID
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black-2 dark:text-white">
                Employees
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(groupedData).map(([group, employees]) => (
              <React.Fragment key={group}>
                <tr className="bg-gray-100 dark:bg-gray-700">
                  <td
                    className="py-4 px-4 font-semibold text-black-2 dark:text-white"
                    rowSpan={employees.length + 1}
                  >
                    {group}
                  </td>
                </tr>
                {employees.map((employee) => (
                  <tr key={employee.employee_id}>
                    <td className="bg-gray-100 py-4 px-4 border-b text-black-2 dark:text-white">
                      {employee.employee_id}
                    </td>
                    <td className="bg-gray-100 py-4 px-4 border-b text-black-2 dark:text-white">
                      {employee.first_name} {employee.last_name}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={3} className="py-4 bg-transparent"></td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GERTable;
