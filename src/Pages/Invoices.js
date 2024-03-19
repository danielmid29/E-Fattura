import * as AiIcons from "react-icons/ai";
import "../StyleSheets/TablePage.css";
import { useEffect, useState } from "react";
import PageOptions from "../Components/PageOptions";

const Invoices = () => {
  return (
    <div className="campaign-builder">
      <h1 className="title">Invoices</h1>
      <TableContainer />
    </div>
  );
};

export default Invoices;

const TableContainer = () => {
  const [invoices, setInvoices] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [limit, setLimit] = useState(5);
  const [pageNumber, setPageNumber] = useState(1);
  const [count, setCount] = useState("");
  const [totalPages, setTotalPages] = useState(5);

  useEffect(() => {
    fetchInvoiceDetails(searchValue, limit, pageNumber);
  }, [searchValue, limit, pageNumber]);

  const fetchInvoiceDetails = (searchValue, limit, page_number) => {
    fetch(
      "http://103.91.187.65:8000/invoices?" +
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
          setInvoices(data.invoice);
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
      <InvoiceTable invoices={invoices} />
      <div className="table-bottom-div">
        Page
        <PageOptions
          totalPage={totalPages}
          handlePageChange={handlePageChange}
          pageNumber={pageNumber}
        />
      </div>
    </div>
  );
};

const InvoiceTable = ({ invoices }) => {
  console.log(invoices);
  return (
    <div>
      <table className="table">
        <div className="table-header">
          <div
            className="table-header-data"
            style={{ width: "15%", minWidth: "180px", paddingLeft: "60px" }}
          >
            Invoice Id
          </div>
          <div
            className="table-header-data"
            style={{
              width: "25%",
              minWidth: "150px",
            }}
          >
            Store Id
          </div>
          <div
            className="table-header-data"
            style={{ width: "20%", minWidth: "180px" }}
          >
            Billed to
          </div>
          <div
            className="table-header-data"
            style={{ width: "20%", minWidth: "130px" }}
          >
            Contact
          </div>
          <div
            className="table-header-data"
            style={{
              width: "20%",
              minWidth: "100px",
              justifyContent: "center",
            }}
          >
            Products
          </div>
          <div
            className="table-header-data"
            style={{
              width: "20%",
              minWidth: "160px",
              justifyContent: "center",
            }}
          >
            Total
          </div>
        </div>
        {invoices?.map((data) => (
          <RowData data={data} />
        ))}
      </table>
    </div>
  );
};

const RowData = ({ data }) => {
  return (
    <div className="table-row-container" key={data.invoice_id}>
      <div className="table-row">
        <div
          className="table-row-data"
          style={{
            width: "15%",
            minWidth: "180px",
            paddingLeft: "60px",
          }}
        >
          {data.invoice_number}
        </div>
        <div
          className="table-row-data"
          style={{ width: "25%", minWidth: "150px" }}
        >
          {data.invoice_number}
        </div>
        <div
          className="table-row-data"
          style={{ width: "20%", minWidth: "180px" }}
        >
          {data.customer_name}
        </div>
        <div
          className="table-row-data"
          style={{ width: "20%", minWidth: "130px" }}
        >
          {data.contact}
        </div>
        <div
          className="table-row-data"
          style={{ width: "20%", minWidth: "100px", justifyContent: "center" }}
        >
          {data?.line_items?.length}
        </div>
        <div
          className="table-row-data"
          style={{ width: "20%", minWidth: "160px", justifyContent: "center" }}
        >
          {`${data.total} (${
            data.currency_code === undefined ? "" : data.currency_code
          })`}
        </div>
      </div>
    </div>
  );
};
