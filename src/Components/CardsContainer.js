import "../StyleSheets/Dashboard.css";
import { FaRegMoneyBillAlt } from "react-icons/fa";

const CardsContainer = ({ dashboardDetails }) => {
  return (
    <div className="cards-main">
      <Card
        name="Total Incomce"
        amount={`${dashboardDetails.total_income} $`}
        icon={<FaRegMoneyBillAlt />}
        isSpecial={true}
      />

      <div className="count-title">
        <div>Invoices</div>
        <div className="count">{dashboardDetails.invoice}</div>
      </div>

      <div className="count-title">
        <div>Messages Sent</div>
        <div className="count">{dashboardDetails.message_success}</div>
      </div>

      <div className="count-title">
        <div>Messages Failed</div>
        <div className="count">{dashboardDetails.message_failed}</div>
      </div>

      <div className="count-title">
        <div>Enable API's</div>
        <div className="count">{dashboardDetails.enabled_api}</div>
      </div>

      <div className="count-title">
        <div>Customers</div>
        <div className="count">{dashboardDetails.customers}</div>
      </div>
      {/* <Card
        name="Total Invoices"
        amount={dashboardDetails.invoice}
        icon={<BiIcons.BiReceipt />}
      />
      <Card
        name="Messages Sent"
        amount={dashboardDetails.message_success}
        icon={<BiIcons.BiMessageSquareCheck />}
      />
      <Card
        name="Messages Failed"
        amount={dashboardDetails.message_failed}
        icon={<BiIcons.BiMessageSquareX />}
      />
      <Card
        name="Enable API's"
        amount={dashboardDetails.enabled_api}
        icon={<BiIcons.BiMessageSquareX />}
      /> */}
    </div>
  );
};

const Card = ({ name, amount, icon, isSpecial }) => {
  return (
    <div className={`card ${isSpecial ? "special" : ""}`}>
      <div className="card-left">
        <div className="card-detail">{amount}</div>
        <div className="card-title">{name}</div>
      </div>
      <div className="card-right">
        <div className={`card-icon ${isSpecial ? "special" : ""}`}>{icon}</div>
      </div>
    </div>
  );
};

export default CardsContainer;
