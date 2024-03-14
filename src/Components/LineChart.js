import React from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

function LineChart({ chartData, showLabel }) {
  return (
    <Line
      id="canvas"
      data={chartData}
      options={{
        tension: "0.4",
        maintainAspectRatio: false,
        scales: {
          x: {
            beginAtZero: true,
            grid: {
              drawBorder: true,
              display: false,
            },
            border: {
              width: 0,
              color: "#556b805d",
            },
            ticks: {
              color: "#6a7181",
              font: {
                size: 11,
                family: "Poppins",
                weight: 400,
              },
              count: 6,
            },
          },
          y: {
            beginAtZero: true,
            grid: {
              borderWidth: 25,
              drawBorder: true,
              display: false,
            },
            border: {
              width: 0,
              color: "#556b805d",
            },
            ticks: {
              color: "#6a7181",
              font: {
                size: 11,
                family: "Poppins",
                weight: 400,
              },
              count: 3,
            },
          },
        },
        plugins: {
          legend: {
            display: showLabel,
            position: "bottom",
          },
        },
      }}
    />
  );
}

export default LineChart;
