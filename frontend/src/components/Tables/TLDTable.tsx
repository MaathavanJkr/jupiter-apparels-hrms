import React from 'react';

interface ReportData {
  department_id: string;
  department_name: string;
  total_leaves: number;
}

interface TLDTableProps {
  reportdata: {
    data: ReportData[];
  };
}

const TLDTable: React.FC<TLDTableProps> = ({ reportdata }) => {
  return (
    <div className="mb-10 w-full rounded-sm border border-stroke bg-slate-200 px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead className="bg-gray-300">
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[80px] py-4 px-4 font-medium text-black-2 dark:text-white xl:pl-11">
                Department
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black-2 dark:text-white">
                Total Leaves
              </th>
            </tr>
          </thead>
          <tbody>
            {reportdata.data.map((item) => (
              <tr key={item.department_id}>
                <td className="py-4 px-4 border-b text-black-2  dark:text-white">
                  {item.department_name}
                </td>
                <td className="py-4 px-4 border-b text-black-2  dark:text-white">
                  {item.total_leaves}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TLDTable;