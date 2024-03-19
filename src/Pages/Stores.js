import * as AiIcons from "react-icons/ai";
import "../StyleSheets/TablePage.css";
import { useEffect, useRef, useState } from "react";
import PageOptions from "../Components/PageOptions";
import * as BiIcons from "react-icons/bi";

const Stores = () => {
  return (
    <div className="campaign-builder">
      <h1 className="title">Stores</h1>
      <TableContainer />
    </div>
  );
};

export default Stores;

const TableContainer = () => {
  const [stores, setStores] = useState([]);
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
      "http://103.91.187.65:8000/stores?" +
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
          setStores(data.customers);
          setCount(data.count);
          setTotalPages(data.total_pages);
        }
      })
      .catch((error) => console.log(error));
  };
  const fetchInvoiceDetail = () => {
    fetch(
      "http://103.91.187.65:8000/stores?" +
        new URLSearchParams({
          search_value: searchValue,
          limit: limit,
          page_number: pageNumber,
        })
    )
      .then(async (response) => {
        const data = await response.json();
        console.log(data);
        if (data) {
          console.log(data);
          setStores(data.customers);
          setCount(data.count);
          setTotalPages(data.total_pages);
        }
      })
      .catch((error) => console.log(error));
  };

  const handlePageChange = (e) => {
    setPageNumber(e.target.value);
    setOpenEdit("");
  };

  const handleLimitChange = (e) => {
    setLimit(e.target.value);
    setPageNumber(1);
    setOpenEdit("");
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    setOpenEdit("");
  };

  const [openEdit, setOpenEdit] = useState("");
  const handleOpenEdit = () => {
    console.log(`dummy ${openEdit}`);
    if (openEdit === "open") setOpenEdit("close");
    else setOpenEdit("open");
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
      <InvoiceTable
        invoices={stores}
        openEdit={openEdit}
        handleOpenEdit={handleOpenEdit}
        fetchInvoiceDetail={fetchInvoiceDetail}
      />
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

const InvoiceTable = ({
  invoices,
  openEdit,
  handleOpenEdit,
  fetchInvoiceDetail,
}) => {
  console.log(invoices);
  return (
    <div>
      <table className="table">
        <div className="table-header">
          <div
            className="table-header-data"
            style={{ width: "20%", minWidth: "200px", paddingLeft: "60px" }}
          >
            Name
          </div>
          <div
            className="table-header-data"
            style={{ width: "20%", minWidth: "190px" }}
          >
            Store Id
          </div>
          <div
            className="table-header-data"
            style={{ width: "20%", minWidth: "190px" }}
          >
            Manager
          </div>
          <div
            className="table-header-data"
            style={{
              width: "20%",
              minWidth: "220px",
            }}
          >
            Email
          </div>
          <div
            className="table-header-data"
            style={{
              width: "20%",
              minWidth: "180px",
              justifyContent: "center",
            }}
          >
            Actions
          </div>
        </div>
        {invoices?.map((data) => (
          <RowData
            data={data}
            openEdit={openEdit}
            handleOpenEdit={handleOpenEdit}
            fetchInvoiceDetail={fetchInvoiceDetail}
          />
        ))}
      </table>
    </div>
  );
};

const RowData = ({ data, fetchInvoiceDetail }) => {
  const [customer, setCustomer] = useState({});

  const [openEdit, setOpenEdit] = useState("");
  const handleOpenEdit = () => {
    console.log(`dummy ${openEdit}`);
    if (openEdit === "open") setOpenEdit("close");
    else setOpenEdit("open");
  };
  return (
    <div className="table-row-container" key={data.invoice_id}>
      <Edit
        data={data}
        handleOpenEdit={handleOpenEdit}
        openEdit={openEdit}
        setOpenEdit={setOpenEdit}
        fetchInvoiceDetail={fetchInvoiceDetail}
      />
      <div className="table-row">
        <div
          className="table-row-data"
          style={{
            width: "20%",
            minWidth: "200px",
            paddingLeft: "60px",
          }}
        >
          {data.store_name}
        </div>
        <div
          className="table-row-data"
          style={{ width: "20%", minWidth: "190px" }}
        >
          {data.store_id}
        </div>
        <div
          className="table-row-data"
          style={{ width: "20%", minWidth: "190px" }}
        >
          {data.manager}
        </div>
        <div
          className="table-row-data"
          style={{ width: "20%", minWidth: "220px" }}
        >
          {data.manager_email}
        </div>
        <div
          className="table-row-data "
          style={{
            width: "20%",
            minWidth: "180px",
            justifyContent: "center",
            cursor: "pointer",
          }}
          onClick={handleOpenEdit}
        >
          Edit
          <BiIcons.BiEdit
            className="support-icon"
            style={{ fontSize: "27px" }}
          />
        </div>
      </div>
    </div>
  );
};

const Edit = ({
  data,
  handleOpenEdit,
  openEdit,
  setOpenEdit,
  fetchInvoiceDetail,
}) => {
  const [manager, setManager] = useState(data.manager);
  const [mail, setMail] = useState(data.manager_email);
  const [contact, setContact] = useState(data.manager_contact);
  const [json, setJson] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setJson({
      _id: {
        $oid: data._id.$oid,
      },
      store_id: data.store_id,
      store_name: data.store_name,
      manager: manager,
      manager_contact: contact,
      manager_email: mail,
    });
  }, [manager, mail, contact, data]);

  const handleSubmit = () => {
    console.log(JSON.stringify(json));

    fetch("http://103.91.187.65:8000/stores", {
      method: "POST",
      body: JSON.stringify(json),
    })
      .then(async (response) => {
        const data = await response.json();
        console.log(data);
        if (data) {
          if (response.status === 200) {
            handleOpenEdit();
            setError(data.message);
            fetchInvoiceDetail();
          } else {
            handleOpenEdit();
            setError(data.error);
          }
        }
        setLoading(false);
      })
      .catch(setLoading(true));
  };

  const ref = useRef();
  useEffect(() => {
    function handleClickOutsideMenu(event) {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        openEdit === "open"
      ) {
        setOpenEdit("close");
      }
    }

    document.addEventListener("mousedown", handleClickOutsideMenu, true);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutsideMenu, true);
    };
  }, [openEdit, ref, setOpenEdit]);
  return (
    <div className={`dummy ${openEdit}`}>
      <div className="edit-card" ref={ref}>
        <div className="edit-title">
          <div>Edit Details</div>
          <div className="x" onClick={handleOpenEdit}>
            <BiIcons.BiXCircle />
          </div>
        </div>
        <div className="edit-element">
          <div className="ee-title">Name </div>
          <input
            type="text"
            className="edit-text"
            value={data.store_name}
            readOnly
          />
        </div>
        <div className="edit-element">
          <div className="ee-title">Store Id </div>
          <input
            type="text"
            className="edit-text"
            value={data.store_id}
            readOnly
          />
        </div>
        <div className="edit-element">
          <div className="ee-title">Manager</div>
          <input
            type="text"
            className="edit-text"
            value={manager}
            onChange={(e) => setManager(e.target.value)}
          />
        </div>
        <div className="edit-element">
          <div className="ee-title">Email</div>
          <input
            type="text"
            className="edit-text"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
          />
        </div>
        <div className="edit-element">
          <div className="ee-title">Contact</div>
          <input
            type="text"
            className="edit-text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
        </div>
        <button className="edit-button" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};
