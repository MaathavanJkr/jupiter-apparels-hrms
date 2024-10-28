import { ApexOptions } from 'apexcharts';
import { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { EmployeeCount } from '../../types/types';

interface RingChartState {
  series: number[];
}

const options: ApexOptions = {
  chart: {
    fontFamily: 'Satoshi, sans-serif',
    type: 'donut',
  },
  colors: ['#3C50E0', '#ec11c2'],
  labels: ['Male', 'Female'],
  legend: {
    show: false,
    position: 'bottom',
  },
  plotOptions: {
    pie: {
      donut: {
        size: '65%',
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

const RingChart = ({ countData }: { countData?: EmployeeCount }) => {
  const [state, setState] = useState<RingChartState>({ series: [0, 0] });

  useEffect(() => {
    if (countData) {
      const malePercentage = (countData.male_count / countData.total_count) * 100;
      const femalePercentage = (countData.female_count / countData.total_count) * 100;
      setState({ series: [malePercentage, femalePercentage] });
    }
  }, [countData]);

  if (!countData) return null; // Prevent rendering until countData is available

  return (
      <>
        <div className="mb-2">
          <div id="chartThree" className="mx-auto flex justify-center">
            <ReactApexChart options={options} series={state.series} type="donut" />
          </div>
        </div>

        <div className="-mx-8 flex flex-wrap items-center justify-center gap-y-3">
          <div className="sm:w-1/2 w-full px-8">
            <div className="flex w-full items-center">
              <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-primary"></span>
              <p className="flex w-full gap-2 text-sm font-medium text-black dark:text-white">
                <span> Male: </span>
                <span> {state.series[0].toFixed(0)}% </span>
              </p>
            </div>
          </div>
          <div className="sm:w-1/2 w-full px-8">
            <div className="flex w-full items-center">
              <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#ec11c2]"></span>
              <p className="flex w-full gap-2 text-sm font-medium text-black dark:text-white">
                <span> Female: </span>
                <span> {state.series[1].toFixed(0)}% </span>
              </p>
            </div>
          </div>
        </div>
      </>
  );
};

export default RingChart;
