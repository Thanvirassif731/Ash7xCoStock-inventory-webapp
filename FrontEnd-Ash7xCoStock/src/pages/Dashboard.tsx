// src/pages/Dashboard.tsx
import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import TopFilters from "../components/TopFilters/TopFilters";
import ChartCard from "../components/ChartCard/ChartCard";
import styles from "./Dashboard.module.scss";

/* chart.js imports */
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Pie, Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, PointElement, LineElement, Title, Tooltip, Legend);

/* MOCK DATA */
const items = ["Item A", "Item B", "Item C", "Item D", "Item E", "Item F"];

const topSellingData = {
  labels: items,
  datasets: [
    { label: "Kitchen", data: [40, 80, 60, 30, 70, 90], backgroundColor: "#66c26a", maxBarThickness: 56 },
    { label: "Pastry", data: [20, 30, 40, 60, 55, 20], backgroundColor: "#7fb8ff", maxBarThickness: 56 },
    { label: "Bar", data: [5, 25, 45, 10, 5, 15], backgroundColor: "#b9d1ff", maxBarThickness: 56 },
  ],
};

const salesVsCogsData = {
  labels: items,
  datasets: [
    { label: "Sales", data: [120, 80, 150, 90, 130, 160], backgroundColor: "#45a0ff", maxBarThickness: 56 },
    { label: "COGS", data: [90, 60, 110, 80, 95, 120], backgroundColor: "#ff7fa8", maxBarThickness: 56 },
  ],
};

const profitMarginData = {
  labels: ["Item A", "Item C", "Item E"],
  datasets: [
    { label: "Pastry", data: [12, 32, 28], backgroundColor: "#ff9db3", barThickness: 18 },
    { label: "Bar", data: [5, 10, 27], backgroundColor: "#9fd7ff", barThickness: 18 },
  ],
};

const salesDistributionData = {
  labels: ["Kitchen", "Pastry", "Bar"],
  datasets: [{ data: [60, 30, 10], backgroundColor: ["#f5a623", "#ff6b99", "#ff9f42"] }],
};

const wastageData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  datasets: [
    { label: "Kitchen", data: [30, 28, 35, 25, 34, 36, 30], borderColor: "#ff6b99", backgroundColor: "rgba(255,107,153,0.08)", tension: 0.25, pointRadius: 5, borderWidth: 3, fill: false },
    { label: "Pastry", data: [20, 22, 18, 30, 28, 26, 24], borderColor: "#7ed3ff", backgroundColor: "rgba(126,211,255,0.06)", tension: 0.25, pointRadius: 5, borderWidth: 3, fill: false },
    { label: "Bar", data: [10, 12, 16, 18, 20, 22, 18], borderColor: "#6aa3ff", backgroundColor: "rgba(106,163,255,0.06)", tension: 0.25, pointRadius: 5, borderWidth: 3, fill: false },
  ],
};

/* Options - type specific so pies don't get cartesian scales */
const commonCartesianOptions = {
  responsive: true,
  maintainAspectRatio: false,
  layout: { padding: { left: 6, right: 6, top: 6, bottom: 6 } },
  plugins: {
    legend: { position: "top" as const, labels: { boxWidth: 10, padding: 8, font: { size: 12 } } },
    tooltip: { enabled: true },
  },
  elements: { line: { tension: 0.2, borderWidth: 3 }, point: { radius: 4 } },
  scales: {
    x: { grid: { display: false }, ticks: { maxRotation: 0, font: { size: 11 } } },
    y: { grid: { display: true }, beginAtZero: true, ticks: { maxTicksLimit: 6, font: { size: 11 } } },
  },
};

const horizontalOptions = {
  ...commonCartesianOptions,
  indexAxis: "y" as const,
  elements: { ...commonCartesianOptions.elements, bar: { borderRadius: 8 } },
};

const barOptions = {
  ...commonCartesianOptions,
  elements: { ...commonCartesianOptions.elements, bar: { borderRadius: 8 } },
};

const lineOptions = {
  ...commonCartesianOptions,
  elements: { line: { ...commonCartesianOptions.elements.line, borderWidth: 4 }, point: { radius: 5 } },
};

const pieOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: "top" as const, labels: { boxWidth: 10, padding: 10, font: { size: 12 } } },
    tooltip: { enabled: true },
  },
  // optionally control pie radius:
  radius: "70%",
};

const Dashboard: React.FC = () => {
  return (
    <div className={styles.page}>
      <Sidebar />
      <div className={styles.content}>
        <TopFilters />

        <div className={styles.grid}>
          <div className={styles.row}>
            <ChartCard title="Top-Selling Items">
              <div className={styles.chartContainer}>
                <Bar data={topSellingData} options={barOptions} redraw />
              </div>
            </ChartCard>

            <ChartCard title="Sales vs COGS">
              <div className={styles.chartContainer}>
                <Bar data={salesVsCogsData} options={barOptions} redraw />
              </div>
            </ChartCard>
          </div>

          <div className={styles.row}>
            <ChartCard title="Percentage Profit Margin By Item">
              <div className={styles.chartContainer}>
                <Bar data={profitMarginData} options={horizontalOptions} redraw />
              </div>
            </ChartCard>

            <ChartCard title="Sales Distribution">
              <div className={styles.chartContainer}>
                <Pie data={salesDistributionData} options={pieOptions} redraw />
              </div>
            </ChartCard>
          </div>

          <div className={styles.row}>
            <ChartCard title="COGS Contribution">
              <div className={styles.chartContainer}>
                <Pie data={salesDistributionData} options={pieOptions} redraw />
              </div>
            </ChartCard>

            <ChartCard title="Wastages Per Item">
              <div className={styles.chartContainer}>
                <Line data={wastageData} options={lineOptions} redraw />
              </div>
            </ChartCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
