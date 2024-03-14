import LineChart from "./LineChart";
import "../StyleSheets/Components/Chart.css";
import DoughnutChart from "./DougnutChart";

const MessageStats = ({
  messageSuccessGraph,
  messageFailureGraph,
  invoices,
  feedbacks,
}) => {
  console.log(messageFailureGraph);

  function getLineGradient(ctx, chartArea) {
    let gradient = ctx.createLinearGradient(
      0,
      chartArea.bottom,
      90,
      chartArea.top
    );
    gradient.addColorStop(0.9, "#04A1E470");
    gradient.addColorStop(0, "#fafafa");

    return [gradient];
  }

  function getGradient(ctx, chartArea) {
    let gradient = ctx.createLinearGradient(
      0,
      chartArea.bottom,
      0,
      chartArea.top
    );
    gradient.addColorStop(0.9, "#AC1FCFaf");
    gradient.addColorStop(0, "#AC1FCF70");
    return [gradient];
  }

  return (
    <div className="chart-bs">
      <div className="chart-title">Messages Stats</div>
      <div className="chart-div">
        <LineChart
          showLabel={true}
          chartData={{
            labels: messageSuccessGraph?.map((data) => data.date),
            datasets: [
              {
                label: ["Success"],
                data: messageSuccessGraph?.map((data) => data.count),
                borderWidth: 3,

                fill: false,
                borderColor: function (context) {
                  const chart = context.chart;
                  const { ctx, chartArea } = chart;

                  // This case happens on initial chart load
                  if (!chartArea) return;
                  return getLineGradient(ctx, chartArea);
                },

                pointBackgroundColor: function (context) {
                  const chart = context.chart;
                  const { ctx, chartArea } = chart;

                  // This case happens on initial chart load
                  if (!chartArea) return;
                  return getLineGradient(ctx, chartArea);
                },
                pointHoverBackgroundColor: function (context) {
                  const chart = context.chart;
                  const { ctx, chartArea } = chart;

                  // This case happens on initial chart load
                  if (!chartArea) return;
                  return getLineGradient(ctx, chartArea);
                },
                pointBorderWidth: 0,
                pointHoverRadius: 7,
                pointRadius: 5,
              },
              {
                label: ["Failure"],
                data: messageFailureGraph?.map((data) => data.count),
                borderWidth: 3,
                borderColor: function (context) {
                  const chart = context.chart;
                  const { ctx, chartArea } = chart;

                  // This case happens on initial chart load
                  if (!chartArea) return;
                  return getGradient(ctx, chartArea);
                },
                fill: false,
                pointBackgroundColor: function (context) {
                  const chart = context.chart;
                  const { ctx, chartArea } = chart;

                  // This case happens on initial chart load
                  if (!chartArea) return;
                  return getGradient(ctx, chartArea);
                },
                pointHoverBackgroundColor: function (context) {
                  const chart = context.chart;
                  const { ctx, chartArea } = chart;

                  // This case happens on initial chart load
                  if (!chartArea) return;
                  return getGradient(ctx, chartArea);
                },
                pointBorderWidth: 0,
                pointHoverRadius: 7,
                pointRadius: 5,
              },
            ],
          }}
        />
      </div>
    </div>
  );
};

export default MessageStats;
