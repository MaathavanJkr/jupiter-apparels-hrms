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
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        {reportdata.data.length > 0 ? (
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[80px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Department
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Total Leaves
                </th>
              </tr>
            </thead>
            <tbody>
              {reportdata.data.map((department, key) => (
                <tr key={key}>
                  <td
                    className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11"
                  >
                    <h5 className="font-medium text-black dark:text-white">
                      {department.department_name}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {department.total_leaves}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <tr>
            <td colSpan={5} className="border-b border-[#eee] py-5 px-4 text-center dark:border-strokedark">
              <p className="text-black dark:text-white">No Leaves in the Given Period.</p>
            </td>
          </tr>
        )}
      </div>
    </div>
  );
};

export default TLDTable;
