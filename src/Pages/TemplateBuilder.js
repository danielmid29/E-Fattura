import "../StyleSheets/CampaignBuilder.css";
import GetDetails from "./CampaignComponents/GetInvoiceDetails";
import { useEffect, useRef, useState } from "react";
import SurveyAndMarketing from "./CampaignComponents/SurveyAndMarketting";
import InvoiceDetails from "./CampaignComponents/InvoiceDetails";
import CompanyInformation from "./CampaignComponents/CompanyInfo";
import Template from "./CampaignComponents/Invoice-Template";
import * as BiIcons from "react-icons/bi";
import * as AiIcons from "react-icons/ai";
import React from "react";
import { SketchPicker } from "react-color";
import { Hourglass } from "react-loader-spinner";
const TemplateBuilder = () => {
  const invoiceDetails = {
    invoice_id: "1565644000000023005",
    invoice_number: "000002",
    date: "2023-11-23",
    customer_name: "Mr. Ranjeet",
    customer_custom_fields: [],
    email: "pramodhdaniel5@gmail.com",
    currency_code: "INR",
    currency_symbol: "₹",
    line_items: [
      {
        description: "Game",
        quantity: 1.0,
        rate: 1852.0,
        item_total: 1852.0,
      },
      {
        description: "24 Brooklyn",
        quantity: 1.0,
        rate: 1754.0,
        item_total: 1754.0,
      },
    ],
    sub_total: 3606.0,
    tax_total: 0.0,
    discount_total: 540.9,
    discount_percent: 15.0,
    discount_amount: 540.9,
    discount: "15.00%",
    discount_applied_on_amount: 3606.0,
    salesperson_name: "Arun",
    total: 3245.1,
    balance: 3245.1,
    contact_persons_details: [{ mobile: "1681354961" }],
    contact: "8608003636",
  };
  const [sam, setSam] = useState({});
  const [color, setColor] = useState("#4A4A4A");
  const [secondarycolor, setSecColor] = useState("#4A4A4A");
  const [ciData, setCIData] = useState({});
  const [data, setData] = useState({
    invoice: invoiceDetails,
    survey_and_marketing: {},
    company_info: {},
    customer: {
      customer_id: "1565644000000021286",
      customer_name: "Mr. Ranjeet",
      store: "Pondicherry",
      gender: "Do Not Disclose",
      contact: "860546540",
      email: "ranji@test.com",
      marital_status: "Unmarried",
      address: "White Field Road",
      city: "Bangalore",
      state: "Karnataka",
      country: "AUS",
      pincode: "54165-15",
    },
    template: {
      baseColor: color,
      secondarycolor: secondarycolor,
    },
  });

  useEffect(() => {
    setColor(data.template.baseColor);
    setSecColor(data.template.secondarycolor);
  }, [data]);
  const [buttonText, setButton] = useState("Generate Template");
  const [showCP, setShowCP] = useState(false);
  const [showSCP, setShowSCP] = useState(false);
  const [generatedMessage, setGeneratedMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const ref = useRef();
  const sref = useRef();

  useEffect(() => {
    fetchDetails();
    console.log(data);
  }, []);

  const fetchDetails = () => {
    fetch("http://16.170.159.223/invoice?id=152&api=ZOHO", {
      method: "GET",
    })
      .then(async (response) => {
        const data = await response.json();
        console.log(data);
        if (data) {
          if (response.status === 200) {
            data["customer"] = {
              customer_id: "1565644000000021286",
              customer_name: "Mr. Ranjeet",
              store: "Pondicherry",
              gender: "Do Not Disclose",
              contact: "860546540",
              email: "ranji@test.com",
              marital_status: "Unmarried",
              address: "White Field Road",
              city: "Bangalore",
              state: "Karnataka",
              country: "AUS",
              pincode: "54165-15",
            };
            setData(data);
            setButton("Update Template");
            console.log(data);
          } else {
            setError(data.error);
          }
        }
      })
      .catch();
  };

  const generateInvoice = () => {
    if (
      (Object.keys(sam).length !== 0) &
      sam.posterEnabled &
      (sam.poster === "")
    ) {
      setError("!!! Please select a poster file if its enabled !!!");
      console.log("Please select a poster file or disable poster");
    } else if (Object.keys(ciData).length !== 0) {
      if (
        (ciData.companyName === "") |
        (ciData.companyLogo === "") |
        (ciData.terms === "") |
        (ciData.message === "")
      ) {
        setError(
          "!!! Company Information missing. Please fill in mandatory fields !!!"
        );
        console.log(
          "Company Information missing. Please fill in mandatory fields"
        );
      } else if (
        (ciData.message.includes(`{invoice-number}`) === false) |
        (ciData.message.includes(`{billed-to}`) === false) |
        (ciData.message.includes(`{url}`) === false)
      ) {
        setError("!!! Please use the message elements in the template !!!");
        console.log("Please use the message elements in the template");
      } else if (
        (ciData.enableFacebook === true && ciData.facebook === "") ||
        (ciData.enableInsta === true && ciData.insta === "") ||
        (ciData.enableLinkedin === true && ciData.linkedin === "") ||
        (ciData.enableTwitter === true && ciData.twitter === "")
      ) {
        setError("!!! Please provide social media URL if enabled !!!");
        console.log("Please provide social media URL if enabled");
      } else {
        setData({
          invoice: invoiceDetails,
          survey_and_marketing: sam,
          company_info: ciData,
          template: {
            baseColor: color,
            secondarycolor: secondarycolor,
          },
          feedback: {},
        });

        console.log(invoiceDetails["invoice_number"]);
        let getmess = ciData.message.replace(
          "{invoice-number}",
          invoiceDetails.invoice_number
        );
        getmess = getmess.replace("{billed-to}", invoiceDetails.customer_name);
        getmess = getmess.replace("{url}", invoiceDetails.customer_name);

        setGeneratedMessage(getmess);
        console.log(generatedMessage);
        setButton("Update Template");
      }
    }
  };

  const saveChanges = () => {
    console.log(data);
    if (Object.keys(ciData).length !== 0 && Object.keys(sam).length !== 0) {
      let template = data;

      delete template["_id"];

      template["template"] = {
        baseColor: color,
        secondarycolor: secondarycolor,
      };

      fetch("http://16.170.159.223/template", {
        method: "POST",
        body: JSON.stringify(template),
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
        .catch((error) => console.log(error));
    }
  };

  useEffect(() => {
    function handleClickOutsideMenu(event) {
      if (ref.current && !ref.current.contains(event.target) && showCP) {
        setShowCP(false);
      }

      if (sref.current && !sref.current.contains(event.target) && showSCP) {
        setShowSCP(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutsideMenu, true);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutsideMenu, true);
    };
  }, [showCP, ref, showSCP, sref]);

  return (
    <div className="campaign-builder">
      <div className="title">Campaign Builder</div>
      <SurveyAndMarketing setSam={setSam} data={data.survey_and_marketing} />
      <CompanyInformation
        setCIData={setCIData}
        data={data.company_info}
        generatedMessage={generatedMessage}
      />

      <div className="cb-form-buttom-bottom">
        <div className="cb-form-buttom-bottom-up">
          <button className="cb-form-button cgi" onClick={generateInvoice}>
            {buttonText}
          </button>

          {buttonText !== "Generate Template" && (
            <button className="cb-form-button " onClick={saveChanges}>
              Save Changes
            </button>
          )}
        </div>
        <div>
          {buttonText !== "Generate Template" && (
            <div className="cb-form-bottom-dynamic nt">
              <div className="bs l">
                <button
                  className="cb-form-button l"
                  onClick={() => setShowCP(true)}
                >
                  <div
                    style={{ backgroundColor: color }}
                    className="basecolor"
                  />
                  Base Color
                  <div
                    className={`color-picker ${showCP && "visible"}`}
                    ref={ref}
                  >
                    <SketchPicker
                      color={color}
                      onChangeComplete={(color) => setColor(color.hex)}
                    />
                  </div>
                </button>
              </div>
              <div className="bs">
                <button
                  className="cb-form-button"
                  onClick={() => setShowSCP(true)}
                >
                  <div
                    style={{ backgroundColor: secondarycolor }}
                    className="basecolor"
                  />
                  Secondary Color
                  <div
                    className={`color-picker ${showSCP && "visible"}`}
                    ref={sref}
                  >
                    <SketchPicker
                      color={secondarycolor}
                      onChangeComplete={(color) => setSecColor(color.hex)}
                    />
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Popup error={error} setError={setError} />

      {Object.keys(data.company_info).length !== 0 && (
        <div className="tem-main-con">
          <div className="tem-sub-con">
            <Template
              data={data}
              model={true}
              color={color}
              secondarycolor={secondarycolor}
            />
          </div>
        </div>
      )}
    </div>
  );
};
export default TemplateBuilder;

let message = "";

const Popup = ({ error, setError }) => {
  if (error !== "") message = error;
  return (
    <div className={`popup ${error === "" && "hidden"}`}>
      <div className="popup-message">{message}</div>
      <div className="popup-top">
        <button className="popup-icon" onClick={() => setError("")}>
          X
        </button>
      </div>
    </div>
  );
};
