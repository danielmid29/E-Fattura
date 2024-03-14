import LineChart from "./LineChart";
import "../StyleSheets/Components/Chart.css";

const Income = ({ incomeGraph }) => {
  function getLineGradient(ctx, chartArea) {
    let gradient = ctx.createLinearGradient(
      0,
      chartArea.bottom,
      5,
      chartArea.top
    );
    gradient.addColorStop(1, "#AC1FCF70");
    gradient.addColorStop(0, "#04A1E470");

    return [gradient];
  }

  return (
    <div className="chart-bs">
      <div className="chart-title">Income Stats</div>
      <div className="chart-div">
        <LineChart
          showLabel={false}
          chartData={{
            labels: incomeGraph?.map((data) => data.date),
            datasets: [
              {
                data: incomeGraph?.map((data) => data.balance),
                borderWidth: 0,
                backgroundColor: function (context) {
                  const chart = context.chart;
                  const { ctx, chartArea } = chart;

                  // This case happens on initial chart load
                  if (!chartArea) return;
                  return getLineGradient(ctx, chartArea);
                },
                fill: true,
                pointBackgroundColor: function (context) {
                  const chart = context.chart;
                  const { ctx, chartArea } = chart;

                  // This case happens on initial chart load
                  if (!chartArea) return;
                  return getLineGradient(ctx, chartArea);
                },
                pointHoverBackgroundColor: "#04A1E4",
                pointBorderWidth: 0,
                pointRadius: 5,
              },
            ],
          }}
        />
      </div>
    </div>
  );
};

export default Income;
