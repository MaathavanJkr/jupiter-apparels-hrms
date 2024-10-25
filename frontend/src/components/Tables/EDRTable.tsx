interface EDRTableProps {
  reportdata: {
    data: Array<{
      first_name: string;
      last_name: string;
      department_id: string;
    }>;
  };
}

const EDRTable: React.FC<EDRTableProps> = ({ reportdata }) => {
  return (
    <div className=" mb-10 rounded-sm border border-stroke bg-slate-200 px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[80px] py-4 px-4 font-medium text-black-2 dark:text-white xl:pl-11">
                Department
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black-2 dark:text-white">
                Employees
              </th>
            </tr>
          </thead>
          <tbody>
            {reportdata.data.map((employee, index) => (
              <tr key={index}>
                <td className="py-4 px-4 text-black-2  dark:text-white">
                  {employee.department_id}
                </td>
                <td className="py-4 px-4 text-black-2  dark:text-white">
                  {employee.first_name} {employee.last_name}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EDRTable;
