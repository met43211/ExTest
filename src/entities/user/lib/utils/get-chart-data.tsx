import { TChartData } from "../../model/chart-data.type";
import { TTransaction } from "../../model/transaction.type";

export const getChartData = (data: TTransaction[]) => {
  const sorted = structuredClone(data).sort(
    (a, b) =>
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  );

  const hours = sorted.map((transaction) =>
    transaction.created_at.slice(11, 16)
  );

  const values = sorted.map((transaction) => transaction.amount);

  const chart: TChartData = {
    labels: hours,
    datasets: [
      {
        id: "values",
        label: "Расходы",
        data: values,
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };
  return chart;
};
