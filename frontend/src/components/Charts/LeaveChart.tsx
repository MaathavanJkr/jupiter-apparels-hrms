import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface LeaveChartProps {
  leaveTypes: string[];
  remainingLeaves: number[];
  usedLeaves: number[];
}

const LeaveChart: React.FC<LeaveChartProps> = ({ leaveTypes, remainingLeaves, usedLeaves }) => {
  const data = {
    labels: leaveTypes,
    datasets: [
      {
        label: 'Used Leaves',
        data: usedLeaves,
        backgroundColor: '#3C50E0', // Color for allocated leaves
      },
      {
        label: 'Remaining Leaves',
        data: remainingLeaves,
        backgroundColor: '#69717d', // Color for used leaves
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
        text: 'Allocated vs Used Leaves',
      },
    },
    scales: {
      x: {
        stacked: true, // Enable stacked bars for the x-axis
      },
      y: {
        stacked: true, // Enable stacked bars for the y-axis
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default LeaveChart;
