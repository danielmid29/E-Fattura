import { useEffect, useRef } from "react";
import "../../StyleSheets/Template-PDF.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useHistory, useNavigate, useNavigation } from "react-router-dom";

const TemplatePdf = ({ data, model, color, secondarycolor }) => {
  const getTncStyle = (string) => {
    if (string == undefined) return {};
    if (string.includes("li") == false)
      return { paddingLeft: "20px", color: secondarycolor };
    else
      return {
        color: secondarycolor,
      };
  };
  useEffect(() => {
    // call api or anything
    if (data.template.baseColor !== "") downloadPDF();
  }, [data]);
  const pdfRef = useRef();

  const navigation = useNavigate();
  const downloadPDF = () => {
    const input = pdfRef.current;
    html2canvas(input, {
      dpi: 72,
      scale: 2,
    }).then((canvas) => {
      const image = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "px", "a4", true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;
      console.log(image);
      pdf.addImage(image, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("invoice.pdf");
      navigation(-1);
    });
    return <div></div>;
  };

  return (
    <div
      className="template-pdf"
      style={{ color: secondarycolor }}
      ref={pdfRef}
    >
      <div>
        <div className="top-info">
          <div className="info-l">
            <div className="company-info-pdf">
              <img
                src={`data:image;base64, ${data.company_info.companyLogo}`}
                alt={data.company_info.companyLogoName}
                className="info-logo"
              />
              <div>{data.company_info.companyName}</div>
            </div>
          </div>
        </div>
        <div className="row-2">
          <div className="r2-l">
            <div className="r2-ldiv">
              <div className="r2-lh">Branch</div>
              <div className="r2-ld">: Pondicherry</div>
            </div>

            <div className="r2-ldiv">
              <div className="r2-lh">Branch Id</div>
              <div className="r2-ld">: 155a1685asdf</div>
            </div>

            <div className="r2-ldiv">
              <div className="r2-lh">Branch Head</div>
              <div className="r2-ld">: Benedict</div>
            </div>
          </div>
          <div className="r2-r">
            <div className="r2-ldiv">
              <div className="r2-lh">Invoice Date</div>
              <div className="r2-ld">: {data.invoice?.date}</div>
            </div>
            <div className="r2-ldiv">
              <div className="r2-lh">Invoice Number</div>
              <div className="r2-ld">: {data.invoice?.invoice_number}</div>
            </div>
            <div className="r2-ldiv">
              <div className="r2-lh">Billed To</div>
              <div className="r2-ld">: {data.invoice?.customer_name}</div>
            </div>

            <div className="r2-ldiv">
              <div className="r2-lh">Customer Id</div>
              <div className="r2-ld">: {data.invoice?.customer_id}</div>
            </div>
          </div>
        </div>

        <div className="order">Order Summary</div>
        <div className="table-pdf">
          <div className="order-sum-head">
            <div style={{ width: "10%", textAlign: "center" }}>S. No.</div>
            <div style={{ width: "30%" }}>Description</div>
            <div style={{ width: "20%" }}>Price</div>
            <div
              style={{ width: "10%", textAlign: "center", marginRight: "60px" }}
            >
              Quantity
            </div>
            <div style={{ width: "20%" }}>Item Total</div>
          </div>
          <div style={{ padding: "5px 0" }}>
            {data.invoice?.line_items?.map((product, index) => (
              <div className="order-sum-data" key={index}>
                <div
                  style={{
                    width: "10%",
                    textAlign: "center",
                  }}
                >
                  {index + 1}
                </div>
                <div style={{ width: "30%" }}>{product.description}</div>
                <div style={{ width: "20%" }}>{product.rate}</div>
                <div
                  style={{
                    width: "10%",
                    textAlign: "center",
                    marginRight: "60px",
                  }}
                >
                  {product.quantity}
                </div>
                <div style={{ width: "20%" }}>{product.item_total}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="td">
          <div className="table-down">
            <div className="tdh">Sub Total</div>
            <div className="tdd">{data.invoice?.sub_total}</div>
          </div>
          <div className="table-down">
            <div className="tdh">Discount ({data.invoice?.discount})</div>
            <div className="tdd">{data.invoice?.discount_amount}</div>
          </div>
          <div className="table-down">
            <div className="tdh">Total ({data.invoice?.currency_code})</div>
            <div className="tdd">
              {data.invoice?.total}
              <div className="font">{data.invoice?.currency_symbol}</div>
            </div>
          </div>
        </div>
        <div className="termsnc">
          <div className="tntitle"> Terms & Conditions</div>
          <div
            className={`tnc-pdf`}
            dangerouslySetInnerHTML={{ __html: data.company_info.terms }}
            style={{ color: secondarycolor }}
          />
        </div>
        <div className="note-pdf">
          This is a system generated invoice, signature not needed
        </div>
      </div>
      {/* {data.template.baseColor !== "" ? downloadPDF() : <div></div>} */}
    </div>
  );
};

export default TemplatePdf;
