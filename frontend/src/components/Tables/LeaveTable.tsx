
import { useEffect, useState } from 'react';
import { LeaveApplication } from '../../types/types';
import {
  getLatestLeaveApplicationsByID as getLatestLeaveApplicationsByID,
} from '../../services/leaveServices';


const LeaveTable = ({
  employee_id
}: {
  employee_id: string
}) => {
  const [leaves, setLeaves] = useState<LeaveApplication[]>([]);
  
  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        let leaves: LeaveApplication[];
        leaves = [
          {
            application_id: '1',
            employee_id: 'E123',
            leave_type: 'Sick Leave',
            start_date: '2024-09-10',
            end_date: '2024-09-12',
            submission_date:'2024-09-05',
            status: 'Pending',
            reason: 'Flu',
            response_date:'-',
          },
          {
            application_id: '2',
            employee_id: 'E123',
            leave_type: 'Casual Leave',
            start_date: '2024-09-20',
            end_date: '2024-09-22',
            submission_date:'2024-09-05',
            status: 'Approved',
            reason: 'Personal work',
            response_date:'-',
          },
          {
            application_id: '3',
            employee_id: 'E123',
            leave_type: 'Maternity Leave',
            start_date: '2024-10-01',
            end_date: '2025-01-01',
            submission_date:'2024-09-05',
            status: 'Approved',
            reason: 'Childbirth',
            response_date:'-',
          },
        ];

        //= await getLatestLeaveApplicationsByID(employee_id);
        setLeaves(leaves);
      } catch (error) {
        console.log('Error fetching leaves:', error);
      }
    };

    fetchLeaves();
  }, []);

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[80px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Type
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                From
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                To
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            <>
              {leaves &&
                leaves.map((leave, key) => {
                  return (
                    <tr key={key}>
                      <td
                        rowSpan={1}
                        className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11"
                      >
                        <h5 className="font-medium text-black dark:text-white">
                          {leave.leave_type}
                        </h5>
                      </td>
                      <td
                        rowSpan={1}
                        className="border-b border-[#eee] py-5 px-4 dark:border-strokedark"
                      >
                        <p className="text-black dark:text-white">
                          {new Date(leave.start_date).toLocaleDateString()}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {new Date(leave.end_date).toLocaleDateString()}
                        </p>
                      </td>
                      <td
                        rowSpan={1}
                        className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11"
                      >
                        <h5 className="font-medium text-black dark:text-white">
                          {leave.status}
                        </h5>
                      </td>
                    </tr>
                  );
                })}
            </>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveTable;