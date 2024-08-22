import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
} from "chart.js";
import { ChartOptions, ChartData } from "chart.js";
import { TChartData } from "../model/chart-data.type";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Filler);

type Props = {
  data: TChartData | null;
};

const ExpensesChart = ({ data }: Props) => {
  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgba(34, 43, 68, 1)",
        },
      },
      y: {
        grid: {
          color: "rgba(34, 43, 68, 1)",
        },
      },
    },
  };

  if (!data) return null;

  return <Line data={data} options={options} datasetIdKey="id" />;
};

export default ExpensesChart;
