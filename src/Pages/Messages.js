import * as AiIcons from "react-icons/ai";
import "../StyleSheets/TablePage.css";
import { useEffect, useState } from "react";
import PageOptions from "../Components/PageOptions";

const Messages = () => {
  return (
    <div className="campaign-builder">
      <h1 className="title">Messages</h1>
      <TableContainer />
    </div>
  );
};

export default Messages;

const TableContainer = () => {
  const [messages, setMessages] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [limit, setLimit] = useState(5);
  const [pageNumber, setPageNumber] = useState(1);
  const [count, setCount] = useState("");
  const [totalPages, setTotalPages] = useState(5);

  useEffect(() => {
    fetchMessageDetails(searchValue, limit, pageNumber);
  }, [searchValue, limit, pageNumber]);

  const fetchMessageDetails = (searchValue, limit, page_number) => {
    fetch(
      "http://103.91.187.65:8000/message?" +
        new URLSearchParams({
          search_value: searchValue,
          limit: limit,
          page_number: page_number,
        })
    )
      .then(async (response) => {
        const data = await response.json();
        console.log(data);
        if (data) {
          console.log(data);
          setMessages(data.message);
          setCount(data.count);
          setTotalPages(data.total_pages);
        }
      })
      .catch((error) => console.log(error));
  };

  const handlePageChange = (e) => {
    setPageNumber(e.target.value);
  };

  const handleLimitChange = (e) => {
    setLimit(e.target.value);
    setPageNumber(1);
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };
  return (
    <div className="table-container">
      <div className="table-top-div">
        <div className="dropdown-container">
          <select
            className="count-drop-down"
            defaultValue={limit}
            onChange={handleLimitChange}
            value={limit}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
        </div>
        <div className="search-bar-div">
          <input
            className="search-bar"
            type={"text"}
            value={searchValue}
            onChange={handleSearchChange}
          />
          <div className="search-bar-icon">
            <AiIcons.AiOutlineSearch />
          </div>
        </div>
      </div>
      <MessageTable messages={messages} />
      <div className="table-bottom-div">
        <PageOptions
          totalPage={totalPages}
          handlePageChange={handlePageChange}
          pageNumber={pageNumber}
        />
      </div>
    </div>
  );
};

const MessageTable = ({ messages }) => {
  return (
    <div>
      <table className="table">
        <div className="table-header">
          <div
            className="table-header-data"
            style={{ width: "20%", minWidth: "170px", paddingLeft: "60px" }}
          >
            Invoice Id
          </div>
          <div
            className="table-header-data"
            style={{ width: "20%", minWidth: "130px" }}
          >
            Contact
          </div>
          <div
            className="table-header-data"
            style={{ width: "15%", minWidth: "150px" }}
          >
            Message Status
          </div>
          <div
            className="table-header-data"
            style={{ width: "25%", minWidth: "250px" }}
          >
            Message
          </div>
          <div
            className="table-header-data"
            style={{ width: "20%", minWidth: "180px" }}
          >
            Error
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

  const [wordCount, setWordCount] = useState(window.innerWidth < 600 ? 20 : 35);

  const detectSize = () => {
    console.log(window.innerWidth);
    if (window.innerWidth < 600) setWordCount(20);
    else setWordCount(35);
  };

  useEffect(() => {
    window.addEventListener("resize", detectSize);

    return () => {
      window.removeEventListener("resize", detectSize);
    };
  });
  return (
    <div className="table-row-container">
      <div className="table-row">
        <div
          className="table-row-data"
          style={{
            width: "20%",
            minWidth: "170px",
            paddingLeft: "60px",
          }}
        >
          {data.invoice_id}
        </div>
        <div
          className="table-row-data"
          style={{ width: "20%", minWidth: "130px" }}
        >
          {data.contact}
        </div>
        <div
          className="table-row-data"
          style={{ width: "15%", minWidth: "150px" }}
        >
          {data.status}
        </div>
        <div
          className="table-row-data"
          style={{ width: "25%", minWidth: "250px", maxWidth: "400px" }}
          dangerouslySetInnerHTML={{
            __html: addBreaks(data.message, wordCount),
          }}
        />
        <div
          className="table-row-data"
          style={{ width: "20%", minWidth: "180px" }}
          dangerouslySetInnerHTML={{
            __html: addBreaks(data.error, wordCount),
          }}
        />
      </div>
    </div>
  );
};
