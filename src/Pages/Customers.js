import * as AiIcons from "react-icons/ai";
import "../StyleSheets/TablePage.css";
import { useEffect, useRef, useState } from "react";
import PageOptions from "../Components/PageOptions";
import * as BiIcons from "react-icons/bi";

const Customers = () => {
  return (
    <div className="campaign-builder">
      <h1 className="title">Customers</h1>
      <TableContainer />
    </div>
  );
};

export default Customers;

const TableContainer = () => {
  const [customers, setCustomers] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [limit, setLimit] = useState(5);
  const [pageNumber, setPageNumber] = useState(1);
  const [count, setCount] = useState("");
  const [totalPages, setTotalPages] = useState(5);

  useEffect(() => {
    fetchCustomerDetails(searchValue, limit, pageNumber);
  }, [searchValue, limit, pageNumber]);

  const fetchCustomerDetails = (searchValue, limit, page_number) => {
    fetch(
      "http://103.91.187.65:8000/customers?" +
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
          setCustomers(data.customers);
          setCount(data.count);
          setTotalPages(data.total_pages);
        }
      })
      .catch((error) => console.log(error));
  };

  const fetchCustomerDetail = () => {
    fetch(
      "http://103.91.187.65:8000/customers?" +
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
          setCustomers(data.customers);
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
      <CustomerTable
        customers={customers}
        openEdit={openEdit}
        handleOpenEdit={handleOpenEdit}
        fetchCustomerDetail={fetchCustomerDetail}
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

const CustomerTable = ({
  customers,
  openEdit,
  handleOpenEdit,
  fetchCustomerDetail,
}) => {
  return (
    <div>
      <table className="table">
        <div className="table-header">
          <div
            className="table-header-data"
            style={{ width: "20%", minWidth: "180px", paddingLeft: "60px" }}
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
            style={{ width: "20%", minWidth: "130px" }}
          >
            Contact
          </div>
          <div
            className="table-header-data"
            style={{
              width: "20%",
              minWidth: "120px",
            }}
          >
            Email
          </div>
          <div
            className="table-header-data"
            style={{
              width: "20%",
              minWidth: "130px",
              justifyContent: "center",
            }}
          >
            Actions
          </div>
        </div>
        {customers?.map((data) => (
          <RowData
            data={data}
            openEdit={openEdit}
            handleOpenEdit={handleOpenEdit}
            fetchCustomerDetail={fetchCustomerDetail}
          />
        ))}
      </table>
    </div>
  );
};

const RowData = ({ data, fetchCustomerDetail }) => {
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
        fetchCustomerDetail={fetchCustomerDetail}
      />
      <div className="table-row">
        <div
          className="table-row-data"
          style={{
            width: "20%",
            minWidth: "180px",
            paddingLeft: "60px",
          }}
        >
          {data.customer_name}
        </div>
        <div
          className="table-row-data"
          style={{ width: "20%", minWidth: "190px" }}
        >
          {data.store}
        </div>
        <div
          className="table-row-data"
          style={{ width: "20%", minWidth: "130px" }}
        >
          {data.contact}
        </div>
        <div
          className="table-row-data"
          style={{ width: "20%", minWidth: "120px" }}
        >
          {data.email}
        </div>
        <div
          className="table-row-data "
          style={{
            width: "20%",
            minWidth: "130px",
            justifyContent: "center",
            cursor: "pointer",
          }}
          onClick={() => handleOpenEdit()}
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
  fetchCustomerDetail,
}) => {
  const [contact, setContact] = useState(data.contact);
  const [mail, setMail] = useState(data.email);
  const [gender, setGender] = useState(data.gender);
  const [maritalStatus, setMaritalStatus] = useState(data.marital_status);
  const [address, setAddress] = useState(data.address);
  const [city, setCity] = useState(data.city);
  const [state, setState] = useState(data.state);
  const [country, setCountry] = useState(data.country);
  const [pincode, setPincode] = useState(data.pincode);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [json, setJson] = useState({});
  const [buttonText, setButtonText] = useState("Verify");

  useEffect(() => {
    setJson({
      _id: {
        $oid: data._id.$oid,
      },
      customer_id: data.customer_id,
      customer_name: data.customer_name,
      store: data.store,
      gender: gender,
      contact: contact,
      email: mail,
      marital_status: maritalStatus,
      address: address,
      city: city,
      state: state,
      country: country,
      pincode: pincode,
    });
  }, [
    data,
    contact,
    mail,
    gender,
    maritalStatus,
    address,
    city,
    state,
    country,
    pincode,
  ]);

  const handleSubmit = () => {
    if (buttonText === "Verify") {
      setButtonText("Submit");
    } else {
      console.log(JSON.stringify(json));

      fetch("http://103.91.187.65:8000/customers", {
        method: "POST",
        body: JSON.stringify(json),
      })
        .then(async (response) => {
          const data = await response.json();
          console.log(data);
          if (data) {
            if (response.status === 200) {
              setButtonText("Verify");
              handleOpenEdit();
              setError(data.message);
              fetchCustomerDetail();
            } else {
              handleOpenEdit();
              setError(data.error);
            }
          }
          setLoading(false);
        })
        .catch(setLoading(true));
    }
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
          <div className="ee-title">Customer Name </div>
          <input
            type="text"
            className="edit-text"
            value={data.customer_name}
            readOnly
          />
        </div>
        <div className="edit-element">
          <div className="ee-title">Customer Id </div>
          <input
            type="text"
            className="edit-text"
            value={data.customer_id}
            readOnly
          />
        </div>
        <div className="edit-element">
          <div className="ee-title">Store</div>
          <input
            type="text"
            className="edit-text"
            value={data.store}
            readOnly
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
          <div className="ee-title">Gender</div>
          <div className="radio-div">
            <div className="radio">
              <input
                name="gender"
                className="radio-gender"
                type="radio"
                value="Male"
                onChange={(e) => setGender(e.target.value)}
                checked={gender === "Male"}
              />
              Male
            </div>
            <div className="radio">
              <input
                name="gender"
                type="radio"
                className="radio-gender"
                value="Female"
                onChange={(e) => setGender(e.target.value)}
                checked={gender === "Female"}
              />
              Female
            </div>
            <div className="radio">
              <input
                name="gender"
                className="radio-gender"
                type="radio"
                value="Do Not Disclose"
                onChange={(e) => setGender(e.target.value)}
                checked={gender === "Do Not Disclose"}
              />
              Do Not Disclose
            </div>
          </div>
        </div>
        <div className="edit-element">
          <div className="ee-title">Marital Status</div>
          <div className="radio-div">
            <div className="radio">
              <input
                name="ms"
                className="radio-gender"
                type="radio"
                value="Married"
                onChange={(e) => setMaritalStatus(e.target.value)}
                checked={maritalStatus === "Married"}
              />
              Married
            </div>
            <div className="radio">
              <input
                name="ms"
                type="radio"
                className="radio-gender"
                value="Unmarried"
                onChange={(e) => setMaritalStatus(e.target.value)}
                checked={maritalStatus === "Unmarried"}
              />
              Unmarried
            </div>
            <div className="radio">
              <input
                name="ms"
                className="radio-gender"
                type="radio"
                value="Do Not Disclose"
                onChange={(e) => setMaritalStatus(e.target.value)}
                checked={maritalStatus === "Do Not Disclose"}
              />
              Do Not Disclose
            </div>
          </div>
        </div>
        <div className="edit-element">
          <div className="ee-title">Address</div>
          <input
            type="text"
            className="edit-text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="edit-element">
          <div className="ee-title">City</div>
          <input
            type="text"
            className="edit-text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className="edit-element">
          <div className="ee-title">State</div>
          <input
            type="text"
            className="edit-text"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </div>
        <div className="edit-element">
          <div className="ee-title">Country</div>
          <input
            type="text"
            className="edit-text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
        <div className="edit-element">
          <div className="ee-title">Pincode</div>
          <input
            type="text"
            className="edit-text"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
          />
        </div>
        <div className={`otp ${buttonText === "Submit" ? "open" : ""}`}>
          <div className="otp-text">
            Please Fill in the One Time Password that is recieved<br></br> in
            the registered email or contact
          </div>
          <div className="edit-element">
            <input
              type="text"
              className="edit-text otpt"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>
        </div>
        <button className="edit-button" onClick={handleSubmit}>
          {buttonText}
        </button>
      </div>
    </div>
  );
};
