import { useEffect, useState } from "react";
import * as BiIcons from "react-icons/bi";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CompanyInformation = ({ setCIData, generatedMessage, data }) => {
  const [companyName, setCompanyName] = useState("");
  const [companyLogo, setCompanyLogo] = useState("");
  const [companyLogoName, setCompanyLogoName] = useState(data.companyLogoName);
  const [enableInsta, setEnableInsta] = useState(false);
  const [insta, setInsta] = useState("");
  const [enableLinkedin, setEnableLinkedin] = useState(false);
  const [linkedin, setLinkedin] = useState("");
  const [enableTwitter, setEnableTwitter] = useState(false);
  const [twitter, setTwitter] = useState("");
  const [enableFacebook, setEnableFacebook] = useState(false);
  const [facebook, setFacebook] = useState("");
  const [terms, setTerms] = useState("");
  const [message, setMessageTemplate] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");

  const [contact, setContact] = useState("");
  const [mail, setMail] = useState("");
  useEffect(() => {
    setCompanyInfo();
  }, [
    companyName,
    companyLogo,
    enableInsta,
    insta,
    enableLinkedin,
    linkedin,
    enableTwitter,
    twitter,
    enableFacebook,
    facebook,
    terms,
    message,
    contact,
    mail,
  ]);

  useEffect(() => {
    setCompanyName(data.companyName);
    setCompanyLogo(data.companyLogo);
    setCompanyLogoName(data.companyLogoName);
    setContact(data.contact);
    setMail(data.mail);
    setAddressLine1(data.addressLine1);
    setAddressLine2(data.addressLine2);
    setState(data.state);
    setCountry(data.country);
    setEnableInsta(data.enableInsta);
    setInsta(data.insta);
    setEnableLinkedin(data.enableLinkedin);
    setLinkedin(data.linkedin);
    setEnableTwitter(data.enableTwitter);
    setTwitter(data.twitter);
    setEnableFacebook(data.enableFacebook);
    setFacebook(data.facebook);
    setTerms(data.terms);
    setMessageTemplate(data.message);
  }, [data]);

  const setCompanyInfo = () => {
    const data = {
      companyName: companyName,
      companyLogo: companyLogo,
      companyLogoName: companyLogoName,
      contact: contact,
      mail: mail,
      addressLine1: addressLine1,
      addressLine2: addressLine2,
      state: state,
      country: country,
      enableInsta: enableInsta,
      insta: insta,
      enableLinkedin: enableLinkedin,
      linkedin: linkedin,
      enableTwitter: enableTwitter,
      twitter: twitter,
      enableFacebook: enableFacebook,
      facebook: facebook,
      terms: terms,
      message: message,
    };
    setCIData(data);
  };

  const handleCnc = (e) => {
    setCompanyName(e.target.value);
  };

  const handleCLUpload = (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      const reader = new FileReader();
      setCompanyLogoName(file.name);
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const base64String = reader.result
          .replace("data:", "")
          .replace(/^.+,/, "");

        setCompanyLogo(base64String);
      };
    }
  };

  const handleEIC = (e) => {
    console.log(e.target.checked);
    if (e.target.checked) setEnableInsta(true);
    else {
      setInsta("");
      setEnableInsta(false);
    }
  };

  const handleIC = (e) => {
    setInsta(e.target.value);
  };

  const handleETC = (e) => {
    console.log(e.target.checked);
    if (e.target.checked) setEnableTwitter(true);
    else {
      setTwitter("");
      setEnableTwitter(false);
    }
  };

  const handleTC = (e) => {
    setTwitter(e.target.value);
  };

  const handleELC = (e) => {
    console.log(e.target.checked);
    if (e.target.checked) setEnableLinkedin(true);
    else {
      setLinkedin("");
      setEnableLinkedin(false);
    }
  };

  const handleLC = (e) => {
    setLinkedin(e.target.value);
  };

  const handleEFC = (e) => {
    if (e.target.checked) setEnableFacebook(true);
    else {
      setFacebook("");
      setEnableFacebook(false);
    }
  };

  const handleFC = (e) => {
    setFacebook(e.target.value);
  };

  const handleTerms = (e) => {
    setTerms(e.target.value);
  };

  const handleMessage = (e) => {
    setMessageTemplate(e.target.value);
  };

  const modules = {
    toolbar: [
      ["bold", "underline", "link"],
      [{ list: "ordered" }, { list: "bullet" }],
    ],
  };

  return (
    <div className="cb-form-container">
      <div className="cb-form-title">Company Information</div>
      <div className="cb-form">
        <div className="cb-form-element">
          <div className="cb-form-element-name">Company Name*</div>
          <input
            name="company-name"
            className="cb-form-input-text"
            type="text"
            onChange={handleCnc}
            value={companyName}
          />
        </div>
        <div className="cb-form-element">
          <div className="cb-form-element-name">Company Logo*</div>
          <input
            name="company-logo"
            className="cb-form-input-text bt"
            type="text"
            value={companyLogoName}
            readOnly
          />
          <button className="cb-form-button icon">
            <input
              className="cb-form-button file"
              type="file"
              onChange={handleCLUpload}
            />
            <BiIcons.BiUpload />
          </button>
        </div>
        <div className="cb-form-element">
          <div className="cb-form-element-name">Contact*</div>
          <input
            name="contact"
            className="cb-form-input-text"
            type="text"
            onChange={(e) => setContact(e.target.value)}
            value={contact}
          />
        </div>
        <div className="cb-form-element">
          <div className="cb-form-element-name">Email*</div>
          <input
            name="mail"
            className="cb-form-input-text"
            type="text"
            onChange={(e) => setMail(e.target.value)}
            value={mail}
          />
        </div>
        {/* <div className="cb-form-element">
          <div className="cb-form-element-name">Address Line 1</div>
          <input
            name="address-line-1"
            className="cb-form-input-text"
            type="text"
            onChange={(e) => setAddressLine1(e.target.text)}
            value={addressLine1}
          />
        </div>
        <div className="cb-form-element">
          <div className="cb-form-element-name">Address Line 2</div>
          <input
            name="address-line-2"
            className="cb-form-input-text"
            type="text"
            onChange={(e) => setAddressLine2(e.target.text)}
            value={addressLine2}
          />
        </div>
        <div className="cb-form-element">
          <div className="cb-form-element-name">State</div>
          <input
            name="state"
            className="cb-form-input-text"
            type="text"
            onChange={(e) => setState(e.target.text)}
            value={state}
          />
        </div>
        <div className="cb-form-element">
          <div className="cb-form-element-name">Pincode</div>
          <input
            name="state"
            className="cb-form-input-text"
            type="text"
            onChange={(e) => setState(e.target.text)}
            value={state}
          />
        </div>
        <div className="cb-form-element">
          <div className="cb-form-element-name">Contact</div>
          <input
            name="state"
            className="cb-form-input-text"
            type="text"
            onChange={(e) => setState(e.target.text)}
            value={state}
          />
        </div>
        <div className="cb-form-element">
          <div className="cb-form-element-name">Email</div>
          <input
            name="state"
            className="cb-form-input-text"
            type="text"
            onChange={(e) => setState(e.target.text)}
            value={state}
          />
        </div>
        <div className="cb-form-element">
          <div className="cb-form-element-name">Country</div>
          <input
            name="country"
            className="cb-form-input-text"
            type="text"
            onChange={(e) => setCountry(e.target.text)}
            value={country}
          />
        </div> */}
        <div className="cb-form-element">
          <div className="cb-form-element-name ci">Facebook</div>
          <div className="switch-ci">
            <label class="switch">
              <input
                type="checkbox"
                onChange={handleEFC}
                checked={enableFacebook}
              />
              <span class="slider"></span>
            </label>
          </div>
          <input
            name="company-facebook"
            className="cb-form-input-text"
            type="text"
            onChange={handleFC}
            value={facebook}
          />
        </div>
        <div className="cb-form-element">
          <div className="cb-form-element-name ci">Instagram</div>
          <div className="switch-ci">
            <label class="switch">
              <input
                type="checkbox"
                onChange={handleEIC}
                checked={enableInsta}
              />
              <span class="slider"></span>
            </label>
          </div>
          <input
            name="company-insta"
            className="cb-form-input-text"
            type="text"
            onChange={handleIC}
            value={insta}
          />
        </div>
        <div className="cb-form-element">
          <div className="cb-form-element-name ci">Twitter</div>
          <div className="switch-ci">
            <label class="switch">
              <input
                type="checkbox"
                onChange={handleETC}
                checked={enableTwitter}
              />
              <span class="slider"></span>
            </label>
          </div>
          <input
            name="company-twitter"
            className="cb-form-input-text"
            type="text"
            onChange={handleTC}
            value={twitter}
          />
        </div>
        <div className="cb-form-element">
          <div className="cb-form-element-name ci">Linkedin</div>
          <div className="switch-ci">
            <label class="switch">
              <input
                type="checkbox"
                onChange={handleELC}
                checked={enableLinkedin}
              />
              <span class="slider"></span>
            </label>
          </div>
          <input
            name="company-linkedin"
            className="cb-form-input-text"
            type="text"
            onChange={handleLC}
            value={linkedin}
          />
        </div>
        <div className="cb-form-element">
          <div className="cb-form-element-name">Message Template*</div>
          <textarea
            name="no-of-products"
            className="cb-form-input-text ci"
            onChange={handleMessage}
            value={message}
          />
        </div>
        <div className="cb-form-element">
          <div className="cb-form-element-name">Sample Message</div>
          <textarea
            name="no-of-products"
            className="cb-form-input-text ci"
            value={generatedMessage}
            placeholder="Sample message will be generated"
            readOnly
          />
        </div>
        <div className="cb-form-element tnc">
          {/* <div className="cb-form-element-name tnc">Terms & Conditions*</div> */}
          <ReactQuill
            theme="snow"
            value={terms}
            onChange={setTerms}
            modules={modules}
            className="cb-form-input-text tnc"
            placeholder="Terms & Conditions*"
          />
        </div>
        <div className="cb-form message">{`(Message template elements : {invoice-number}, {billed-to}, {url})`}</div>
      </div>
    </div>
  );
};

export default CompanyInformation;
