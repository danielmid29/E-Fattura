import { useState } from "react";
import { Hourglass } from "react-loader-spinner";

const GetDetails = ({ setInvoiceDetails, setError, invoiceDetails }) => {
  const [invoiceId, setInvoiceId] = useState("");
  const [api, setApi] = useState("ZOHO");
  const [loading, setLoading] = useState(false);

  const do_get_call = () => {
    if (invoiceId !== "") {
      fetch(
        "http://103.91.187.65:8000/invoice-api/?" +
          new URLSearchParams({
            id: invoiceId,
            api: api,
          })
      )
        .then(async (response) => {
          setLoading(false);
          const data = await response.json();
          console.log(data);
          if (data) {
            if (response.status === 200) {
              setInvoiceDetails(data?.invoice?.invoice);
              data.invoice["api"] = api;
            } else {
              setError(data.error);
            }
          }
        })
        .catch(setLoading(true));
    } else {
      setError("!!! Please fill in Invoice id !!!");
    }
  };

  const handleInvoiceIdChange = (e) => {
    invoiceDetails.invoice_number = e.target.value;
    setInvoiceDetails(invoiceDetails);
    setInvoiceId(e.target.value);
  };

  const handleApiChange = (e) => {
    setApi(e.target.value);
  };
  return (
    <div className="cb-form-container">
      <div className="cb-form-title">Get Invoice Details*</div>
      <div className="cb-form">
        <div className="cb-form-element">
          <div className="cb-form-element-name">Invoice Id</div>
          <input
            name="invoiceId"
            className="cb-form-input-text"
            type="text"
            onChange={handleInvoiceIdChange}
          />
        </div>
        <div className="cb-form-element">
          <div className="cb-form-element-name">Invoice Api</div>
          <select
            name="invoiceApi"
            className="cb-form-drop-down"
            onChange={handleApiChange}
          >
            <option className="cb-form-drop-down-option">Zoho</option>
          </select>
          <button className="cb-form-button" onClick={do_get_call}>
            {loading ? (
              <Hourglass
                width={16}
                height={16}
                color="white"
                colors={["white", "white"]}
              />
            ) : (
              "Get"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GetDetails;
