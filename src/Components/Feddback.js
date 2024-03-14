import LineChart from "./LineChart";
import "../StyleSheets/Components/Chart.css";
import DoughnutChart from "./DougnutChart";

const Feedback = ({
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
      0,
      chartArea.top
    );
    gradient.addColorStop(0.9, "#04a1e470");
    gradient.addColorStop(0, "#fafafa");

    return [gradient];
  }

  function getGradient(ctx, chartArea) {
    let gradient = ctx.createLinearGradient(
      0,
      chartArea.bottom,
      5,
      chartArea.top
    );
    gradient.addColorStop(1, "#AC1FCF70");
    gradient.addColorStop(0, "#04A1E470");

    let gradient2 = ctx.createLinearGradient(
      0,
      chartArea.bottom,
      0,
      chartArea.top
    );
    gradient2.addColorStop(0.9, "#04A1E470");
    gradient2.addColorStop(0, "#AC1FCF");
    return [gradient, gradient2];
  }

  return (
    <div className="chart-bs feed">
      <div className="chart-title">Feedback</div>
      <div className="chart-div dg">
        <DoughnutChart
          chartData={{
            labels: ["Invoices", "Feedbacks Recieved"],
            datasets: [
              {
                data: [invoices, feedbacks],
                borderWidth: 1,
                backgroundColor: function (context) {
                  const chart = context.chart;
                  const { ctx, chartArea } = chart;

                  // This case happens on initial chart load
                  if (!chartArea) return;
                  return getGradient(ctx, chartArea);
                },
                fill: true,
                pointBackgroundColor: "#6a718198",
                pointHoverBackgroundColor: "#6a7181",
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

export default Feedback;
