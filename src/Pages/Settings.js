import { useEffect, useState } from "react";
import { Hourglass } from "react-loader-spinner";
import Popup from "./CampaignComponents/Popup";

const Settings = () => {
  return (
    <div className="campaign-builder">
      <div className="title">API Settings</div>
      <APISettings />
    </div>
  );
};

export default Settings;

const APISettings = () => {
  const [api, setApi] = useState("ZOHO");
  const [enabled, setEnabled] = useState(false);
  const [clientId, setClientId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [organizationId, setOrgId] = useState("");
  const [secretCode, setSecretCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [interval, setInterval] = useState("");
  const [sms, setSms] = useState(false);
  const [whatsapp, setWhatsapp] = useState(false);

  const testApi = () => {
    const body = {
      api_name: api,
      client_id: clientId,
      client_secret: clientSecret,
      scope_code: secretCode,
      organization_id: organizationId,
      invoice_number: "000002",
      status: enabled ? "enabled" : "disabled",
    };

    if (success) {
      fetch("http://103.91.187.65:8000/invoices-api/add/", {
        method: "POST",
        body: JSON.stringify(body),
      })
        .then(async (response) => {
          const data = await response.json();
          console.log(data);
          if (data) {
            if (response.status === 200) {
              setEnabled(false);
              setClientId("");
              setClientSecret("");
              setOrgId("");
              setSecretCode("");
              setSuccess(true);
              setError(data.message);
              setSuccess(false);
            } else {
              setError(data.error);
            }
          }
          setLoading(false);
        })
        .catch(setLoading(true));
    } else {
      fetch("http://103.91.187.65:8000/invoices-api/test/", {
        method: "POST",
        body: JSON.stringify(body),
      })
        .then(async (response) => {
          const data = await response.json();
          console.log(data);
          if (data) {
            if (response.status === 200) {
              setSuccess(true);
              setError(data.message);
            } else {
              setError(data.error);
            }
          }
          setLoading(false);
        })
        .catch(setLoading(true));
    }
  };

  const addSettings = () => {
    console.log(interval, sms, whatsapp);
    const body = {
      duration: interval,
      sms: sms,
      whatsapp: whatsapp,
    };

    fetch("http://103.91.187.65:8000/settings", {
      method: "POST",
      body: JSON.stringify(body),
    })
      .then(async (response) => {
        const data = await response.json();
        console.log(data);
        if (data) {
          if (response.status === 200) {
            setError(data.message);
          } else {
            setError(data.error);
          }
        }
        setLoading(false);
      })
      .catch(setLoading(true));
  };

  useEffect(() => {
    getSettings();
  }, []);

  const getSettings = () => {
    fetch("http://103.91.187.65:8000/settings", {
      method: "GET",
    })
      .then(async (response) => {
        const data = await response.json();
        console.log(data);
        if (data) {
          if (response.status === 200) {
            setSms(data.settings?.sms);
            setInterval(data.settings?.duration);
            setWhatsapp(data.settings?.whatsapp);
          } else {
            setError(data.error);
          }
        }
        setLoading(false);
      })
      .catch(setLoading(true));
  };
  return (
    <div>
      <div className="cb-form-container">
        <div className="cb-form-title">Invoice API</div>
        <div className="cb-form">
          <div className="cb-form-element">
            <div className="cb-form-element-name">Invoice Api</div>
            <select
              name="invoiceApi"
              className="cb-form-drop-down"
              onChange={(e) => setApi(e.target.value)}
            >
              <option className="cb-form-drop-down-option">Zoho</option>
            </select>
          </div>
          <div className="cb-form-element">
            <div className="cb-form-element-name">Availability</div>
            <label class="switch">
              <input
                type="checkbox"
                onChange={(e) => {
                  e.target.checked ? setEnabled(true) : setEnabled(false);
                }}
                checked={enabled}
              />
              <span class="slider"></span>
            </label>
          </div>
          <div className="cb-form-element">
            <div className="cb-form-element-name">Client ID</div>
            <input
              className="cb-form-input-text"
              type="text"
              onChange={(e) => setClientId(e.target.value)}
              value={clientId}
            />
          </div>
          <div className="cb-form-element">
            <div className="cb-form-element-name">Client Secret</div>
            <input
              className="cb-form-input-text"
              type="password"
              onChange={(e) => setClientSecret(e.target.value)}
              value={clientSecret}
            />
          </div>
          <div className="cb-form-element">
            <div className="cb-form-element-name">Organization Id</div>
            <input
              className="cb-form-input-text"
              type="text"
              onChange={(e) => setOrgId(e.target.value)}
              value={organizationId}
            />
          </div>
          <div className="cb-form-element">
            <div className="cb-form-element-name">Secret Code</div>
            <input
              className="cb-form-input-text bt"
              type="text"
              onChange={(e) => setSecretCode(e.target.value)}
              value={secretCode}
            />
            <button className="cb-form-button icon test" onClick={testApi}>
              {success ? "Add" : "Test"}
            </button>

            <Popup error={error} setError={setError} />
          </div>
        </div>
      </div>

      <div className="cb-form-container">
        <div className="cb-form-title">Data Refresh Interval</div>
        <div className="cb-form">
          <div className="cb-form-element">
            <div className="cb-form-element-name">SMS</div>

            <label class="switch">
              <input
                type="checkbox"
                onChange={(e) => setSms(e.target.checked)}
                checked={sms}
              />
              <span class="slider"></span>
            </label>
          </div>
          <div className="cb-form-element">
            <div className="cb-form-element-name">Whatsapp</div>
            <label class="switch">
              <input
                type="checkbox"
                onChange={(e) => setWhatsapp(e.target.checked)}
                checked={whatsapp}
              />
              <span class="slider"></span>
            </label>
          </div>
          <div className="cb-form-element">
            <div className="cb-form-element-name">Interval</div>
            <select
              name="invoiceApi"
              className="cb-form-drop-down"
              onChange={(e) => setInterval(e.target.value)}
              value={interval}
              defaultValue={5}
            >
              <option className="cb-form-drop-down-option" value={5}>
                5 Days
              </option>
              <option className="cb-form-drop-down-option" value={10}>
                10 Days
              </option>
              <option className="cb-form-drop-down-option" value={15}>
                15 Days
              </option>
            </select>
            <button className="cb-form-button icon test" onClick={addSettings}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
