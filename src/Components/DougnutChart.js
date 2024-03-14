import React from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function DoughnutChart({ chartData }) {
  return (
    <Doughnut
      data={chartData}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            grid: {
              drawBorder: false,
              display: false,
            },
            border: {
              width: 0,
              color: "#9B805B70",
            },
            ticks: {
              display: false,
              font: {
                size: 0,
              },
            },
          },
          y: {
            grid: {
              borderWidth: 15,
              drawBorder: false,
              display: false,
            },
            border: {
              width: 0,
              color: "#9B805B70",
            },
            ticks: {
              display: false,
              font: {
                size: 0,
              },
              count: 0,
            },
          },
        },
        plugins: {
          legend: {
            display: true,
            align: "start",
            position: "bottom",
            onHover: {},
          },
        },
      }}
    />
  );
}

export default DoughnutChart;
