import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

export const barOptions = (title: string) => ({
  indexAxis: "y" as const,
  elements: { bar: { borderWidth: 3 } },
  responsive: true,
  plugins: {
    legend: { position: "right" as const },
    title: {
      display: true,
      text: title,
    },
  },
});
