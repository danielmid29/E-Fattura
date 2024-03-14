import { useEffect, useRef, useState } from "react";
import facebook from "../../assets/facebook.png";
import instagram from "../../assets/instagram.png";
import twitter from "../../assets/twitter.png";
import linkedin from "../../assets/linkedin.png";
import "../../StyleSheets/Template.css";
import { Hourglass } from "react-loader-spinner";
import * as BiIcons from "react-icons/bi";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { PDFDownloadLink, pdf } from "@react-pdf/renderer";
import PDFfile from "./Template-PDF";

const Template = ({ data, model, color, secondarycolor }) => {
  const [rating, setRating] = useState(7);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedbackSuccess, setFeedbackSuccess] = useState(false);
  const [allIn, setAllIn] = useState(false);
  const [tncIn, setTncIn] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);
  const [mail, setMail] = useState("");

  const sendFeedback = () => {
    setLoading(false);
    console.log("Send");
    fetch("http://16.170.159.223/feedback", {
      method: "POST",
      body: JSON.stringify({
        invoice_fk: data.invoice?.invoice_number,
        rating: rating,
        feedback: feedback,
      }),
    })
      .then(async (response) => {
        const data = await response.json();
        console.log(data);
        if (data) {
          if (response.status === 200) {
            setFeedbackSuccess(true);
          } else {
          }
        }
        setLoading(false);
      })
      .catch();
  };

  const sendMail = async () => {
    const element = (
      <PDFfile data={data} color={color} secondarycolor={secondarycolor} />
    );
    let myPdf = pdf();

    console.log("sending email ");
    myPdf.updateContainer(element);

    let fileBlob = await myPdf.toBlob();

    let file = new File([fileBlob], "invoice.pdf", {
      lastModified: new Date().getTime(),
    });

    const formData = new FormData();

    formData.append("pdf", file);
    formData.append("mail", mail);

    console.log("sending email ");
    fetch("http://16.170.159.223/send_email", {
      method: "POST",
      body: formData,
    })
      .then(async (response) => {
        const data = await response.json();
        console.log(data);
      })
      .catch();
  };

  const handleTermsChange = (e) => {
    setFeedback(e.target.value);
  };

  const getTncStyle = (string) => {
    if (string === undefined) return {};
    if (string.includes("li") === false)
      return { paddingLeft: "20px", color: secondarycolor };
    else
      return {
        color: secondarycolor,
      };
  };

  const [openEdit, setOpenEdit] = useState("");
  const handleOpenEdit = () => {
    console.log(`dummy ${openEdit}`);
    if (openEdit === "open") setOpenEdit("close");
    else setOpenEdit("open");
  };

  return (
    <div className="template" style={{ color: secondarycolor }}>
      {console.log(data.customer)}
      <Edit
        data={data.customer}
        handleOpenEdit={handleOpenEdit}
        openEdit={openEdit}
        setOpenEdit={setOpenEdit}
        modal={model}
      />
      <div className="company-info ls" style={{ color: color }}>
        <div className="company-info">
          <div className="ci-logo-con">
            <img
              src={`data:image;base64, ${data.company_info.companyLogo}`}
              alt={data.company_info.companyLogoName}
              className="company-logo"
            />
          </div>
          {data.company_info.companyName}
        </div>

        <BiIcons.BiSolidUserCircle
          className="profile-template"
          onClick={handleOpenEdit}
        />
      </div>
      {(data.survey_and_marketing.rating ||
        data.survey_and_marketing.feedback) && (
        <div>
          {feedbackSuccess || Object.keys(data.feedback).length !== 0 ? (
            <div className="rating-feedback">
              !! Thank you for giving us the feedback !!
            </div>
          ) : (
            <div className="rating-feedback">
              <div className="feedback-text">
                We would love to know a bit more on your feedback to help us
                serve you even better
              </div>
              {data.survey_and_marketing.rating && (
                <RatingComponent
                  rating={rating}
                  setRating={setRating}
                  color={color}
                />
              )}
              {data.survey_and_marketing.feedback && (
                <textarea
                  className="feedback"
                  placeholder="Leave a comment"
                  value={feedback}
                  onChange={handleTermsChange}
                />
              )}
              <button
                className="feedback-button"
                onClick={sendFeedback}
                disabled={model}
                style={{ backgroundColor: color }}
              >
                {loading ? (
                  <Hourglass
                    width={16}
                    height={16}
                    color="white"
                    colors={["white", "white"]}
                  />
                ) : (
                  "Submit Feedback"
                )}
              </button>
            </div>
          )}
        </div>
      )}

      <div className="thank-you">
        <div>
          Thank you for doing business with {data.company_info.companyName}!
        </div>
        <div className="ty-1">{data.invoice?.customer_name}</div>
      </div>

      <div className="thank-you">
        <div className="am-1">
          <div>Billed Date</div>
          <div className="am-2">{data.invoice?.date}</div>
        </div>
        <div className="am-1">
          <div>Invoice Number</div>
          <div className="am-2">{data.invoice?.invoice_number}</div>
        </div>
        <div className="am-1">
          <div>Amount paid</div>
          <div className="am-1-1">
            {data.invoice?.total + data.invoice?.currency_symbol}
          </div>
        </div>
        <div className="am-1">
          <div>Mode of payment</div>
          <div className="am-2">Cash</div>
        </div>
        <div className="am-1">
          <div>Sales Person</div>
          <div className="am-2">{data.invoice?.salesperson_name}</div>
        </div>
      </div>
      <div className="invoice-template">
        <div className="invoice-data header" style={{ color: color }}>
          <div>Order Summary</div>
        </div>
        <div className={`invoice-wrapper ${allIn ? "open" : ""}`}>
          <div>
            {data.invoice?.line_items?.map((product, index) => {
              return (
                <div className="invoice-data" key={index}>
                  <div className="id-l">
                    <div className="id-d">{product.description}</div>
                    <div className="id-l2">
                      <div>Price : {product.rate}</div>
                      <div>Qty : {product.quantity}</div>
                    </div>
                    <div className="id-d">Item Total</div>
                  </div>
                  <div className="invoice-right">{product.item_total}</div>
                </div>
              );
            })}
            <div className="invoice-divider" />
            <div className="invoice-data">
              <div>Sub-total</div>
              <div className="invoice-right">{data.invoice?.sub_total}</div>
            </div>

            {/* <div className="invoice-data">
            <div>VAT({data.invoice. })</div>
            <div className="invoice-right">{data.invoice.sub_total}</div>
          </div> */}

            <div className="invoice-data">
              <div>Discount({data.invoice?.discount})</div>
              <div className="invoice-right">
                {data.invoice?.discount_amount}
              </div>
            </div>
            <div
              className="invoice-data header"
              style={{ color: secondarycolor }}
            >
              <div>Total({data.invoice?.currency_code})</div>
              <div className="invoice-right">{data.invoice?.total}</div>
            </div>
          </div>
        </div>
        <div className="warpper-control" style={{ color: secondarycolor }}>
          {allIn ? (
            <div className="warpper-control-1" onClick={() => setAllIn(!allIn)}>
              Hide Details
              <BiIcons.BiChevronUp className="wc-icon" />
            </div>
          ) : (
            <div className="warpper-control-1" onClick={() => setAllIn(!allIn)}>
              Show Details
              <BiIcons.BiChevronDown className="wc-icon" />
            </div>
          )}
        </div>
      </div>
      <div className="rating-feedback">
        <div
          className="tnc-header"
          style={{ color: color }}
          onClick={() => setTncIn(!tncIn)}
        >
          Terms & Conditions
          {tncIn ? (
            <BiIcons.BiChevronUp className="wc-icon" />
          ) : (
            <BiIcons.BiChevronDown className="wc-icon" />
          )}
        </div>
        <div
          className={`tnc-template ${tncIn ? "allin" : ""}`}
          dangerouslySetInnerHTML={{ __html: data.company_info.terms }}
          style={getTncStyle(data.company_info.terms)}
          // style={{ color: color }}
        />
      </div>

      <div className="thank-you">
        {Object.keys(data.company_info).length !== 0 ? (
          <PDFDownloadLink
            document={
              <PDFfile
                data={data}
                color={color}
                secondarycolor={secondarycolor}
              />
            }
            fileName="Invoice"
          >
            {({ loading, error }) =>
              error ? (
                console.log(error)
              ) : loading ? (
                <button
                  className="feedback-button"
                  style={{ backgroundColor: color }}
                >
                  Loading Document ...
                </button>
              ) : (
                <button
                  className="feedback-button"
                  style={{ backgroundColor: color }}
                >
                  Download Invoice
                </button>
              )
            }
          </PDFDownloadLink>
        ) : (
          <button
            className="feedback-button"
            style={{ backgroundColor: color }}
          >
            Loading Document ...
          </button>
        )}
        <div className="mail-div">
          <input
            name="email-template"
            className="email-template"
            type="text"
            placeholder="Type in your Email "
            onChange={(e) => setMail(e.target.value)}
            value={mail}
          />
          <button
            className="mail-button"
            style={{ backgroundColor: color }}
            onClick={() => sendMail()}
          >
            <BiIcons.BiSolidSend />
          </button>
        </div>
      </div>
      {data.survey_and_marketing.posterEnabled && (
        <div className="poster-div">
          <img
            src={`data:image;base64, ${data.survey_and_marketing.poster}`}
            alt={data.survey_and_marketing.poster_name}
            className="poster"
          />
        </div>
      )}
      {canDisplaySocialMedia(
        data.company_info.enableFacebook,
        data.company_info.enableInsta,
        data.company_info.enableLinkedin,
        data.company_info.enableTwitter
      ) && (
        <div className="social-media">
          Follow us on our social media
          <div className="scl-con">
            {data.company_info.enableFacebook && (
              <a
                href={data.company_info.facebook}
                target="_blank"
                rel="noreferrer noopener"
              >
                <img
                  src={facebook}
                  alt="Facebook"
                  className="social-media-logo"
                />
              </a>
            )}
            {data.company_info.enableInsta && (
              <a
                href={data.company_info.insta}
                target="_blank"
                rel="noreferrer noopener"
              >
                <img
                  src={instagram}
                  alt="Instagram"
                  className="social-media-logo"
                />
              </a>
            )}
            {data.company_info.enableLinkedin && (
              <a
                href={data.company_info.linkedin}
                target="_blank"
                rel="noreferrer noopener"
              >
                <img
                  src={linkedin}
                  alt="Linkedin"
                  className="social-media-logo"
                />
              </a>
            )}
            {data.company_info.enableTwitter && (
              <a
                href={data.company_info.twitter}
                target="_blank"
                rel="noreferrer noopener"
              >
                <img
                  src={twitter}
                  alt="Twitter"
                  className="social-media-logo"
                />
              </a>
            )}
          </div>
        </div>
      )}
      <div className="support-div">
        <div
          className="support-dynamic open"
          onClick={() => setSupportOpen(false)}
        >
          <div className="support-top">
            <div className="store-title">Store Details</div>
            <div>{data.company_info.companyName}</div>
            <div>Bousher, Panorama Mall, Ground Floor</div>
            <div>133 Al Ghubrah St, Muscat</div>
          </div>
          <div className="support-bottom">
            <a
              className="support-button"
              style={{ backgroundColor: color }}
              href="tel:+96894761777"
            >
              Store
              <BiIcons.BiPhone className="support-icon" />
            </a>
            <button
              className="support-button"
              style={{ backgroundColor: color }}
              onClick={(e) => {
                window.location.href = "mailto:customerservice@almeera.com.qa";
                e.preventDefault();
              }}
            >
              Email
              <AiIcons.AiOutlineMail className="support-icon" />
            </button>
          </div>
          <a
            className="support-button cc"
            style={{ backgroundColor: color }}
            // onMouseEnter={}
            href="tel:+96894761777"
          >
            Customer Care
            <BiIcons.BiSupport className="support-icon" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Template;

const canDisplaySocialMedia = (insta, linkedin, facebook, twitter) => {
  if (insta || linkedin || facebook || twitter) return true;
  else return false;
};

const RatingComponent = ({ rating, setRating }) => {
  const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const [color, setColor] = useState("#fcba03");

  const handleClick = (index) => {
    setRating(index);
    if (index <= 3) setColor("#bd3d1a");
    else if (index <= 7) setColor("#c99b40");
    else setColor("#a4c940");
  };

  return (
    <div className="rating">
      {cards.map((index) => {
        if (index < rating) {
          return (
            <div
              className="rating-card selected"
              key={index}
              onClick={() => handleClick(index)}
              style={{ backgroundColor: color }}
            >
              {index}
            </div>
          );
        } else if (index === rating)
          return (
            <div
              className="rating-card active"
              key={index}
              style={{ backgroundColor: color }}
            >
              {index}
            </div>
          );
        else
          return (
            <div
              className="rating-card"
              key={index}
              onClick={() => handleClick(index)}
            >
              {index}
            </div>
          );
      })}
    </div>
  );
};

const Edit = ({ data, handleOpenEdit, openEdit, setOpenEdit, modal }) => {
  const [contact, setContact] = useState(data?.contact);
  const [mail, setMail] = useState(data?.email);
  const [gender, setGender] = useState(data?.gender);
  const [maritalStatus, setMaritalStatus] = useState(data?.marital_status);
  const [address, setAddress] = useState(data?.address);
  const [city, setCity] = useState(data?.city);
  const [state, setState] = useState(data?.state);
  const [country, setCountry] = useState(data?.country);
  const [pincode, setPincode] = useState(data?.pincode);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [json, setJson] = useState({});
  const [buttonText, setButtonText] = useState("Verify");

  useEffect(() => {
    setJson({
      _id: {
        $oid: data?._id?.$oid,
      },
      customer_id: data?.customer_id,
      customer_name: data?.customer_name,
      store: data?.store,
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

      fetch("http://16.170.159.223/customers", {
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
          <div>Personal Details</div>
          <div className="x" onClick={handleOpenEdit}>
            <BiIcons.BiXCircle />
          </div>
        </div>
        <div className="edit-element">
          <div className="ee-title">Name </div>
          <input
            type="text"
            className="edit-text"
            value={data?.customer_name}
            readOnly
          />
        </div>
        <div className="edit-element">
          <div className="ee-title">Store</div>
          <input
            type="text"
            className="edit-text"
            value={data?.store}
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
        <button
          className="edit-button"
          onClick={handleSubmit}
          disabled={buttonText === "Submit" && modal}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};
