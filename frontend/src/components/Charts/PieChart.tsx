import { ApexOptions } from 'apexcharts';
import  { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { EmployeeCountByDepartment } from '../../types/types';

interface PieChartState {
  series: number[];
}

const options: ApexOptions = {
  chart: {
    fontFamily: 'Satoshi, sans-serif',
    type: 'donut',
  },
  
  colors: ['#AB47BC', '#1E3A5F', '#FF7043', '#66BB6A', '#FFEB3B', '#8D6E63', '#42A5F5', '#78909C', '#D4E157'],
  
  
  labels: ['HR', 'Finance', 'IT', 'Marketing', 'Production', 'Customer Service', 'Sales', 'Quality Assurance', 'Corporate Management'],
  
  plotOptions: {
    pie: {
      donut: {
        size: '100%',  
        background: 'transparent',
      },
    },
  },
  
  dataLabels: {
    enabled: false,
  },

  legend: {
    show: true,
    position: 'right',  
    horizontalAlign: 'center',  
    formatter: function (val, opts) {
      const total = opts.w.globals.seriesTotals.reduce((acc: number, value: number) => acc + value, 0);
      const percentage = ((opts.w.globals.series[opts.seriesIndex] / total) * 100).toFixed(2);
      return `${val}: ${percentage}%`;
    },
  },
  
  

  responsive: [
    {
      breakpoint: 2600,
      options: {
        chart: {
          width: 580,
        },
      },
    },
    {
      breakpoint: 640,
      options: {
        chart: {
          width: 100,
        },
      },
    },
  ],
};

const PieChart = ({countData}:{countData:EmployeeCountByDepartment}) => {
  // const pending = (countData.dep1_count/countData.total_count)*100;
  // const pending = (countData.dep2_count/countData.total_count)*100;
  // const pending = (countData.dep3_count/countData.total_count)*100;
  // const pending = (countData.dep4_count/countData.total_count)*100;
  // const pending = (countData.dep5_count/countData.total_count)*100;
  // const pending = (countData.dep6_count/countData.total_count)*100;
  // const pending = (countData.dep7_count/countData.total_count)*100;
  // const pending = (countData.dep8_count/countData.total_count)*100;
  // const pending = (countData.dep9_count/countData.total_count)*100;
  
  const [state, setState] = useState<PieChartState>({
    series: [25,18,20,11,8,7,4,2,5],
  });

  const handleReset = () => {
    setState((prevState) => ({
      ...prevState,
      series: [25,18,20,11,8,7,4,2,5],
    }));
  };
  handleReset;

  return (
    <div>

      <div className="mb-4">
        <div id="chartThree" className="mx-auto flex justify-center">
          <ReactApexChart
            options={options}
            series={state.series}
            type="pie"
          />
        </div>
      </div>
    </div>
  );
};

export default PieChart;