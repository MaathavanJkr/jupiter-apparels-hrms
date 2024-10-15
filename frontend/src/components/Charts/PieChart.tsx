import { ApexOptions } from 'apexcharts';
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { LeaveCount } from '../../types/types';

interface PieChartState {
  series: number[];
}

const options: ApexOptions = {
  chart: {
    fontFamily: 'Satoshi, sans-serif',
    type: 'donut',
  },
  colors: ['#AB47BC', '#26C6DA', '#1E3A5F'],
  labels: ['Approved', 'Rejected', 'Pending'],
  legend: {
    show: false,
    position: 'bottom',
  },

  plotOptions: {
    pie: {
      donut: {
        size: '0%',
        background: 'transparent',
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  responsive: [
    {
      breakpoint: 2600,
      options: {
        chart: {
          width: 380,
        },
      },
    },
    {
      breakpoint: 640,
      options: {
        chart: {
          width: 200,
        },
      },
    },
  ],
};

const PieChart = ({countData}:{countData:LeaveCount}) => {
  const pending = (countData.pending_count/countData.total_count)*100;
  const approved = (countData.approved_count/countData.total_count)*100;
  const rejected = (countData.rejected_count/countData.total_count)*100;
  const [state, setState] = useState<PieChartState>({
    series: [65, 34, 12],
  });

  const handleReset = () => {
    setState((prevState) => ({
      ...prevState,
      series: [65, 34, 12],
    }));
  };
  handleReset;

  return (
    <div>

      <div className="mb-2">
        <div id="chartThree" className="mx-auto flex justify-center">
          <ReactApexChart
            options={options}
            series={state.series}
            type="donut"
          />
        </div>
      </div>

      <div className="-mx-8 flex flex-wrap items-center justify-center gap-y-3">
        <div className="sm:w-1/2 w-full px-8">
          <div className="flex w-full items-center">
            <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#AB47BC]"></span>
            <p className="flex w-full gap-2 text-sm font-medium text-black dark:text-white">
              <span> Approved </span>
              <span> 65% </span>
            </p>
          </div>
        </div>
        <div className="sm:w-1/2 w-full px-8">
          <div className="flex w-full items-center">
            <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#26C6DA]"></span>
            <p className="flex w-full gap-2 text-sm font-medium text-black dark:text-white">
              <span> Rejected </span>
              <span> 34% </span>
            </p>
          </div>
        </div>
        <div className="sm:w-1/2 w-full px-8">
          <div className="flex w-full items-center">
            <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#1E3A5F]"></span>
            <p className="flex w-full gap-2 text-sm font-medium text-black dark:text-white">
              <span> Pending </span>
              <span> 45% </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PieChart;
