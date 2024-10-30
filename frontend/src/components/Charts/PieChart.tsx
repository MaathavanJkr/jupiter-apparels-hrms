import { ApexOptions } from 'apexcharts';
import { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { getCountByDepartment } from '../../services/employeeServices'; // Assuming your service is here

interface PieChartState {
  series: number[];
  labels: string[];
}

interface DepartmentData {
  department_id: string;
  department_name: string;
  employee_count: number;
}

const options: ApexOptions = {
  chart: {
    fontFamily: 'Satoshi, sans-serif',
    type: 'donut',
  },
  colors: [
    '#AB47BC',
    '#1E3A5F',
    '#FF7043',
    '#66BB6A',
    '#FFEB3B',
    '#8D6E63',
    '#42A5F5',
    '#78909C',
    '#D4E157',
  ],
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
      const total = opts.w.globals.seriesTotals.reduce(
        (acc: number, value: number) => acc + value,
        0,
      );
      const percentage = (
        (opts.w.globals.series[opts.seriesIndex] / total) *
        100
      ).toFixed(2);
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

const PieChart = () => {
  const [state, setState] = useState<PieChartState>({
    series: [],
    labels: [],
  });

  useEffect(() => {
    // Check that response exists and has data before accessing
    const fetchData = async () => {
      try {
        const response = await getCountByDepartment();
        if (response && response.data) {
          const series = response.data.map(
            (department: DepartmentData) => department.employee_count,
          );
          const labels = response.data.map(
            (department: DepartmentData) => department.department_name,
          );

          setState({ series, labels });
        } else {
          console.warn('No data in response from getCountByDepartment');
        }
      } catch (error: any) {
        console.error(
          'Error fetching department counts:',
          error?.response || error,
        );
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="mb-4">
        <div id="chartThree" className="mx-auto flex justify-center">
          <ReactApexChart
            options={{ ...options, labels: state.labels }}
            series={state.series}
            type="pie"
          />
        </div>
      </div>
    </div>
  );
};

export default PieChart;
