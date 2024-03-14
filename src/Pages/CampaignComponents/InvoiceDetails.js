import { useEffect, useState } from "react";

const InvoiceDetails = ({ invoiceDetails }) => {
  return (
    <div className="cb-form-container">
      <div className="cb-form-title">Invoice Details</div>
      <div className="cb-form">
        <div className="cb-form-element">
          <div className="cb-form-element-name">Billed To</div>
          <input
            name="billed-to"
            className="cb-form-input-text"
            type="text"
            value={invoiceDetails.customer_name}
            readOnly
          />
        </div>
        <div className="cb-form-element">
          <div className="cb-form-element-name">Contact</div>
          <input
            name="contact"
            className="cb-form-input-text"
            type="text"
            value={invoiceDetails.contact}
            readOnly
          />
        </div>
        <div className="cb-form-element">
          <div className="cb-form-element-name">Email</div>
          <input
            name="no-of-products"
            className="cb-form-input-text"
            type="text"
            value={invoiceDetails.email}
            readOnly
          />
        </div>
        <div className="cb-form-element">
          <div className="cb-form-element-name">Number Products</div>
          <input
            name="no-of-products"
            className="cb-form-input-text"
            type="text"
            value={invoiceDetails?.line_items?.length}
            readOnly
          />
        </div>
        <div className="cb-form-element">
          <div className="cb-form-element-name">Billed Date</div>
          <input
            name="no-of-products"
            className="cb-form-input-text"
            type="text"
            value={invoiceDetails.date}
            readOnly
          />
        </div>
        <InvoiceTable invoiceDetails={invoiceDetails} />
        <div className="cb-form-element">
          <div className="cb-form-element-name">Discount Percentage</div>
          <input
            name="no-of-products"
            className="cb-form-input-text"
            type="text"
            value={invoiceDetails.discount_percent}
            readOnly
          />
        </div>
        <div className="cb-form-element">
          <div className="cb-form-element-name">Discount Prize</div>
          <input
            name="no-of-products"
            className="cb-form-input-text"
            type="text"
            value={invoiceDetails.discount_amount}
            readOnly
          />
        </div>
        <div className="cb-form-element">
          <div className="cb-form-element-name">Tax Percentage</div>
          <input
            name="no-of-products"
            className="cb-form-input-text"
            type="text"
            readOnly
          />
        </div>
        <div className="cb-form-element">
          <div className="cb-form-element-name">Tax Amount</div>
          <input
            name="no-of-products"
            className="cb-form-input-text"
            type="text"
            readOnly
          />
        </div>
        <div className="cb-form-element">
          <div className="cb-form-element-name">Currency</div>
          <input
            name="no-of-products"
            className="cb-form-input-text"
            type="text"
            value={invoiceDetails.currency_code}
            readOnly
          />
        </div>
        <div className="cb-form-element">
          <div className="cb-form-element-name">Final Amount</div>
          <input
            name="no-of-products"
            className="cb-form-input-text"
            type="text"
            value={invoiceDetails.total}
            readOnly
          />
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetails;

const InvoiceTable = ({ invoiceDetails }) => {
  return (
    <div className="invoice-table form">
      <table className="table">
        <div className="table-header">
          <div
            className="table-header-data invoice"
            style={{
              width: "15%",
              minWidth: "170px",
              paddingLeft: "60px",
            }}
          >
            S.No
          </div>
          <div
            className="table-header-data invoice"
            style={{ width: "35%", minWidth: "220px" }}
          >
            Product
          </div>
          <div
            className="table-header-data invoice center"
            style={{ width: "25%", minWidth: "120px" }}
          >
            Count
          </div>
          <div
            className="table-header-data invoice center"
            style={{ width: "25%", minWidth: "220px" }}
          >
            Amount
          </div>
        </div>
        {(Object.keys(invoiceDetails).length == 0) |
        (Object.keys(invoiceDetails).length == 1)
          ? [{ description: "No Products" }].map((data, index) => (
              <RowDate data={data} index={index} />
            ))
          : invoiceDetails?.line_items?.map((data, index) => (
              <RowDate data={data} index={index} />
            ))}
        <div className="table-bottom-div invoice">
          <div className="table-header-data invoice bottom">
            Total
            <div className="cb-invoice-total">{invoiceDetails.sub_total}</div>
          </div>
        </div>
      </table>
    </div>
  );
};

const RowDate = ({ data, index }) => {
  return (
    <div className="table-row-container">
      <div className="table-row">
        <div
          className="table-row-data invoice"
          style={{
            width: "15%",
            minWidth: "170px",
            paddingLeft: "70px",
          }}
        >
          {data.description != "No Products" && index + 1}
        </div>
        <div
          className="table-row-data"
          style={{ width: "35%", minWidth: "220px" }}
        >
          {data.description}
        </div>
        <div
          className="table-row-data invoice center"
          style={{ width: "25%", minWidth: "120px" }}
        >
          {data.quantity}
        </div>
        <div
          className="table-row-data  invoice center"
          style={{ width: "25%", minWidth: "250px" }}
        >
          {data.item_total}
        </div>
      </div>
    </div>
  );
};
