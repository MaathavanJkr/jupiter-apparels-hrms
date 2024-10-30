import React from 'react';
import { EmployeeInfo } from '../../types/types';
import EDRTable from './EDRTable';

interface ReportData {
  name: string;
  employees: EmployeeInfo[];
}

interface GERTableProps {
  reportdata: {
    data: ReportData[];
  };
}

const GERTable: React.FC<GERTableProps> = ({ reportdata }) => {
  return (
    <div className="mb-10 w-full rounded-sm border border-stroke bg-slate-200 px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      {reportdata.data.map((data, key) => (
<div key={key}>
  <h1>{data.name}</h1>
  <EDRTable reportdata={data.employees} />
  </div>
      ))}
    </div>
  );
};

export default GERTable;
