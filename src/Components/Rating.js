import "../StyleSheets/Components/Chart.css";
import BarChart from "./BarChart";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useEffect, useState } from "react";

const Rating = ({ rating, setRating, dashboardDetails }) => {
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

  const [size, setSize] = useState(window.innerWidth < 850 ? "11px" : "12px");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [branch, setBranch] = useState("");

  useEffect(() => {
    if (to < from) console.log(true);
    else {
      var today = new Date(),
        date =
          today.getMonth() +
          1 +
          "-" +
          today.getDate() +
          "-" +
          today.getFullYear();

      var currentDate = new Date();

      var pastDate = new Date();
      pastDate.setDate(currentDate.getDate() - 100);

      var formattedPastDate =
        pastDate.getMonth() +
        1 +
        "-" +
        pastDate.getDate() +
        "-" +
        pastDate.getFullYear();

      let store = branch === "All Stores" ? "" : branch;
      let rating_from =
        (from === ""
          ? formattedPastDate
          : from?.$d?.toLocaleDateString().replaceAll("/", "-")) + " 00:00:00";
      let rating_to = `${
        to === "" ? date : to?.$d?.toLocaleDateString().replaceAll("/", "-")
      } 23:59:59`;

      console.log(store, rating_from, rating_to);
      const data = {
        rating_from: "0",
        rating_to: "10",
        date_from: rating_from,
        date_to: rating_to,
        store_name: store,
      };
      const queryString = Object.keys(data)
        .map(
          (key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
        )
        .join("&");
      console.log(queryString);
      const urlWithQuery = `http://103.91.187.65:8000/rating?${decodeURIComponent(
        new URLSearchParams(data).toString()
      )}`;
      console.log(urlWithQuery);
      fetch(urlWithQuery)
        .then(async (response) => {
          const data = await response.json();
          console.log(data);
          if (data) {
            console.log(data);
            setRating(data.rating);
          }
        })
        .catch((error) => console.log(error));
    }
  }, [to, from, branch, setRating]);

  const detectSize = () => {
    if (window.innerWidth < 850) setSize("11px");
    else setSize("12px");
  };

  useEffect(() => {
    window.addEventListener("resize", detectSize);

    return () => {
      window.removeEventListener("resize", detectSize);
    };
  });
  return (
    <div className="chart-bs cs">
      <div className="chart-title">Customer Satisfaction</div>
      <div className="chart-div">
        <BarChart
          chartData={{
            labels: rating?.map((data) => data.rating),
            datasets: [
              {
                data: rating?.map((data) => data.count),
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

      <div className="chart-bottom">
        <select
          name="rating-dash"
          className="dash-rating"
          onChange={(e) => setBranch(e.target.value)}
          placeholder="Select Store"
        >
          <option className="dash-rating-option">All Stores</option>
          {dashboardDetails?.store_names?.map((data, index) => (
            <option className="dash-rating-option" key={index}>
              {data}
            </option>
          ))}
        </select>
        <div className="dash-rating-date">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MobileDatePicker
              label="Start"
              name="date_time_picker"
              onAccept={setFrom}
              inputFormat="dd-MM-yyyy"
              slotProps={{
                textField: {
                  InputProps: {
                    style: {
                      fontSize: size,
                      letterSpacing: "1px",
                      fontFamily: "Poppins",
                    },
                  },
                  InputLabelProps: {
                    style: {
                      fontSize: size,
                      letterSpacing: "1px",
                      fontFamily: "Poppins",
                    },
                  },
                  size: "small",
                },
              }}
              format="DD-MM-YYYY"
              sx={{
                "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                  border: "1px solid #81879570",
                }, // at page load
                "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                  { border: "1px solid #81879570" }, // at hover state
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  { border: "1px solid #81879570" }, // at focused state
              }}
            />
          </LocalizationProvider>
        </div>

        <div className="dash-rating-date">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MobileDatePicker
              label="End"
              name="date_time_picker"
              onAccept={setTo}
              format="DD-MM-YYYY"
              slotProps={{
                textField: {
                  InputProps: {
                    style: {
                      fontSize: size,
                      letterSpacing: "1px",
                      fontFamily: "Poppins",
                    },
                  },
                  InputLabelProps: {
                    style: {
                      fontSize: size,
                      letterSpacing: "1px",
                      fontFamily: "Poppins",
                    },
                  },
                  size: "small",
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                  border: "1px solid #81879570",
                }, // at page load
                "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                  { border: "1px solid #81879570" }, // at hover state
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  { border: "1px solid #81879570" }, // at focused state
              }}
            />
          </LocalizationProvider>
        </div>
        {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DateTimePicker
            className="dash-time"
            label="To"
            style={{ fontSize: "13px", border: "2px" }}
            name="date_time_picker"
            format="MM/dd/yyyy"
            sx={{
              "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                border: "1px solid yellow",
              }, // at page load
              "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                { border: "2px solid cyan" }, // at hover state
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                { border: "3px solid green" }, // at focused state
            }}
          />
        </MuiPickersUtilsProvider> */}
      </div>
    </div>
  );
};

export default Rating;
