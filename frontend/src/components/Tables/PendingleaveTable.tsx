import { useEffect, useState } from 'react';
import { LeaveApplication } from '../../types/types';
import { getPendingLeavesBySupervisorID } from '../../services/leaveServices'; // New service function
import { useNavigate } from 'react-router-dom';

const PendingleaveTable = ({ supervisor_id }: { supervisor_id: string }) => {
  const [leaves, setLeaves] = useState<LeaveApplication[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPendingLeaves = async () => {
      try {
        // Fetch pending leaves for the supervisor
        const pendingLeaves: LeaveApplication[] = [
          {
            application_id: '1',
            employee_id: 'E123',
            leave_type: 'Sick Leave',
            start_date: '2024-10-01',
            end_date: '2024-10-05',
            submission_date:'2024-10-18',
            reason: 'Flu and fever',
            status: 'Pending',
            response_date:'2024-10-18',
          },
          {
            application_id: '2',
            employee_id: 'E456',
            leave_type: 'Casual Leave',
            start_date: '2024-10-15',
            end_date: '2024-10-18',
            submission_date:'2024-10-18',
            reason: 'Family function',
            status: 'Pending',
            response_date:'2024-10-18',
          },
          {
            application_id: '3',
            employee_id: 'E789',
            leave_type: 'Maternity Leave',
            start_date: '2024-09-01',
            end_date: '2024-12-01',
            submission_date:'2024-10-18',
            reason: 'Childbirth',
            status: 'Pending',
            response_date:'2024-10-18'
          },
        ]; //= await getPendingLeavesBySupervisorID(supervisor_id);
        
        setLeaves(pendingLeaves);
      } catch (error) {
        console.log('Error fetching pending leaves:', error);
      }
    };

    fetchPendingLeaves();
  }, [supervisor_id]); // Add supervisor_id as a dependency to re-fetch when it changes

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[80px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Employee ID
              </th>
              <th className="min-w-[80px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Type
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                From
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                To
              </th>
              <th className="min-w-[80px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Reason
              </th>
              <th className="py-4 px-4 font-medium text-black text-center dark:text-white">
                Action
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
                          {leave.employee_id}
                        </h5>
                      </td>
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
                          {leave.reason}
                        </h5>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <button
                          onClick={() =>
                            navigate('/leave/view/' + leave.application_id)
                          }
                          className="hover:text-primary"
                        >
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
                              d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                            />
                          </svg>
                        </button>
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

export default PendingleaveTable;
