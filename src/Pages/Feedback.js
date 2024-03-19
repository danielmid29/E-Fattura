import * as AiIcons from "react-icons/ai";
import "../StyleSheets/TablePage.css";
import { useEffect, useMemo, useState } from "react";
import PageOptions from "../Components/PageOptions";
import { CSVLink } from "react-csv";
import * as BiIcons from "react-icons/bi";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const Feedbacks = () => {
  return (
    <div className="campaign-builder">
      <h1 className="title">Feedbacks</h1>
      <TableContainer />
    </div>
  );
};

export default Feedbacks;

const TableContainer = () => {
  const [feedbacks, setFeedback] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [limit, setLimit] = useState(5);
  const [pageNumber, setPageNumber] = useState(1);
  const [count, setCount] = useState("");
  const [totalPages, setTotalPages] = useState(5);
  const [wordCount, setWordCount] = useState(window.innerWidth < 600 ? 20 : 35);
  const [size, setSize] = useState(window.innerWidth < 850 ? "11px" : "12px");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [branch, setBranch] = useState("");
  const [rateFrom, setRateFrom] = useState("0");
  const [rateTo, setRateTo] = useState("10");

  const [stores, setstores] = useState([]);

  useEffect(() => {
    const data = {
      search_value: "",
      limit: 100,
      page_number: 1,
    };
    const queryString = Object.keys(data)
      .map(
        (key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
      )
      .join("&");
    console.log(queryString);
    const urlWithQuery = `http://103.91.187.65:8000/stores?${decodeURIComponent(
      new URLSearchParams(data).toString()
    )}`;
    fetch(urlWithQuery)
      .then(async (response) => {
        const data = await response.json();
        console.log(data);
        if (data) {
          console.log(data);
          setstores(data.customers);
        }
      })
      .catch((error) => console.log(error));
  }, []);

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
        search_value: searchValue,
        limit: limit,
        page_number: pageNumber,
        rating_from: rateFrom,
        rating_to: rateTo,
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
      const urlWithQuery = `http://103.91.187.65:8000/feedback?${decodeURIComponent(
        new URLSearchParams(data).toString()
      )}`;
      console.log(urlWithQuery);
      fetch(urlWithQuery)
        .then(async (response) => {
          const data = await response.json();
          console.log(data);
          if (data) {
            console.log(data);
            setFeedback(data.feedback);
            setCount(data.count);
            setTotalPages(data.total_pages);
          }
        })
        .catch((error) => console.log(error));
    }
  }, [
    searchValue,
    limit,
    pageNumber,
    rateFrom,
    rateTo,
    to,
    from,
    branch,
    setFeedback,
  ]);

  const detectSize = () => {
    if (window.innerWidth < 600) setWordCount(20);
    else setWordCount(35);

    if (window.innerWidth < 850) setSize("11px");
    else setSize("12px");
  };

  useEffect(() => {
    window.addEventListener("resize", detectSize);

    return () => {
      window.removeEventListener("resize", detectSize);
    };
  });

  const handlePageChange = (e) => {
    setPageNumber(e.target.value);
  };

  const handleLimitChange = (e) => {
    setLimit(e.target.value);
    setPageNumber(1);
  };

  const handleRateOption = (e) => {
    if (e.target.value === "Less than 4") {
      setRateFrom("0");
      setRateTo("3");
    } else if (e.target.value === "Between 4 and 6") {
      setRateFrom("4");
      setRateTo("6");
    } else if (e.target.value === "Above 6") {
      setRateFrom("7");
      setRateTo("10");
    } else {
      setRateFrom("0");
      setRateTo("10");
    }
  };

  const headers = [
    { label: "Invoice Id", key: "invoice_fk" },
    { label: "Organization Id", key: "invoice_fk" },
    { label: "Rating", key: "rating" },
    { label: "Feedback", key: "feedback" },
  ];

  useEffect(() => {
    window.addEventListener("resize", detectSize);

    return () => {
      window.removeEventListener("resize", detectSize);
    };
  });

  return (
    <div className="table-container">
      <div className="table-top-div">
        <select
          name="rating-dash"
          className="dash-rating"
          onChange={(e) => handleRateOption(e)}
          placeholder="Select Store"
        >
          <option className="dash-rating-option">All Rates</option>

          <option className="dash-rating-option">Less than 4</option>
          <option className="dash-rating-option">Between 4 and 6</option>
          <option className="dash-rating-option">Above 6</option>
        </select>
        <select
          className="dash-rating"
          defaultValue={limit}
          onChange={handleLimitChange}
          value={limit}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>
        <select
          name="rating-dash"
          className="dash-rating"
          onChange={(e) => setBranch(e.target.value)}
          placeholder="Select Store"
        >
          <option className="dash-rating-option">All Stores</option>
          {stores?.map((data, index) => (
            <option className="dash-rating-option" key={index}>
              {data.store_name}
            </option>
          ))}
        </select>
      </div>
      <MessageTable messages={feedbacks} />
      <div className="table-bottom-div feed">
        <div>
          Page
          <PageOptions
            totalPage={totalPages}
            handlePageChange={handlePageChange}
            pageNumber={pageNumber}
          />
        </div>
        <div className="date-range">
          <div className="dash-rating-date">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileDatePicker
                label="Start"
                name="date_time_picker"
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
                    border: "1px solid transparent",
                  }, // at page load
                  "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                    {
                      border: "1px solid transparent",
                    }, // at hover state
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                    {
                      border: "1px solid transparent",
                    }, // at focused state
                }}
              />
            </LocalizationProvider>
          </div>

          <div className="dash-rating-date">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileDatePicker
                label="End"
                name="date_time_picker"
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
                    border: "1px solid transparent",
                  }, // at page load
                  "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                    {
                      border: "1px solid transparent",
                    }, // at hover state
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                    {
                      border: "1px solid transparent",
                    }, // at focused state
                }}
              />
            </LocalizationProvider>
          </div>
        </div>
      </div>
      {feedbacks?.length > 0 && (
        <div className="csv-feed">
          <CSVLink
            className="downloadbtn"
            filename="Customer-Staisfaction.csv"
            headers={headers}
            data={feedbacks}
          >
            Export
          </CSVLink>
        </div>
      )}
    </div>
  );
};

const MessageTable = ({ messages }) => {
  const [srtRating, setSrtRating] = useState("both");
  const [srtIcon, setSrtIcon] = useState(
    <BiIcons.BiCode
      className="wc-icon"
      style={{
        transform: "rotate(90deg)",
        paddingLeft: "10px",
        fontSize: "25px",
      }}
    />
  );

  const SortIcon = () => {
    if (srtRating === "both") {
      setSrtIcon(
        <BiIcons.BiChevronUp
          className="wc-icon"
          style={{
            fontSize: "25px",
            paddingTop: "10px",
          }}
        />
      );
      setSrtRating("up");
    } else if (srtRating === "up") {
      setSrtIcon(
        <BiIcons.BiChevronDown
          className="wc-icon"
          style={{
            fontSize: "25px",
            paddingTop: "10px",
          }}
        />
      );
      setSrtRating("down");
    } else {
      setSrtIcon(
        <BiIcons.BiCode
          className="wc-icon"
          style={{
            transform: "rotate(90deg)",
            paddingLeft: "10px",
            fontSize: "25px",
          }}
        />
      );
      setSrtRating("both");
    }
  };
  return (
    <div>
      <table className="table">
        <div className="table-header">
          <div
            className="table-header-data"
            style={{ width: "15%", minWidth: "140px", paddingLeft: "60px" }}
          >
            Invoice Id
          </div>
          <div
            className="table-header-data"
            style={{ width: "20%", minWidth: "140px", paddingLeft: "60px" }}
          >
            Organization Id
          </div>
          <div
            className="table-header-data"
            style={{
              width: "20%",
              minWidth: "120px",
            }}
          >
            Date
          </div>
          <div
            className="table-header-data"
            style={{
              width: "15%",
              minWidth: "120px",
              justifyContent: "center",
            }}
          >
            Rating
            <div onClick={SortIcon}>{srtIcon}</div>
          </div>
          <div
            className="table-header-data"
            style={{
              width: "30%",
              minWidth: "250px",
            }}
          >
            Feedback
          </div>
        </div>
        {messages?.map((data) => (
          <RowDate data={data} />
        ))}
      </table>
    </div>
  );
};

const RowDate = ({ data }) => {
  const addBreaks = (inputString, breakInterval) => {
    if (inputString == undefined) return `<div></div>`;

    var result = inputString[0];

    for (var i = 1; i < inputString.length; i++) {
      if (i % breakInterval == 0) {
        console.log(i);
        for (var j = i; j < inputString.length; j++) {
          result += "<br>";
          result += inputString[i];
          break;
        }
      }
      result += inputString[i];
    }
    return `<div>${result}</div>`;
  };

  const [wordCount, setWordCount] = useState(window.innerWidth < 600 ? 20 : 45);
  const [feedback, setFeedback] = useState("<div></div>");

  const detectSize = () => {
    if (window.innerWidth < 950) setWordCount(20);
    else setWordCount(35);
  };

  useEffect(() => {
    window.addEventListener("resize", detectSize);

    return () => {
      window.removeEventListener("resize", detectSize);
    };
  });

  useEffect(() => {
    setFeedback(addBreaks(data.feedback, wordCount));
  }, [wordCount, data]);
  return (
    <div className="table-row-container">
      <div className="table-row">
        <div
          className="table-row-data"
          style={{
            width: "15%",
            minWidth: "140px",
            paddingLeft: "60px",
          }}
        >
          {data.invoice_fk}
        </div>
        <div
          className="table-row-data"
          style={{
            width: "20%",
            minWidth: "140px",
            paddingLeft: "60px",
          }}
        >
          {data.store_name}
        </div>
        <div
          className="table-row-data"
          style={{
            width: "20%",
            minWidth: "140px",
          }}
        >
          {data?.date?.$date.replace("T", "  ").substring(0, 19)}
        </div>
        <div
          className="table-row-data"
          style={{
            width: "15%",
            minWidth: "120px",
            justifyContent: "center",
            paddingRight: "10px",
          }}
        >
          {data.rating}
        </div>
        <body
          className="table-row-data"
          style={{
            width: "30%",
            minWidth: "240px",
            maxWidth: "650px",
          }}
          dangerouslySetInnerHTML={{
            __html: feedback,
          }}
        />
      </div>
    </div>
  );
};
