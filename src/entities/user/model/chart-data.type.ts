export type TChartData = {
  labels: string[];
  datasets: [
    {
      id: string;
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor: string;
      fill: true;
      tension: number;
    },
  ];
};
