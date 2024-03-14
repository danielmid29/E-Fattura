import { useEffect, useState } from "react";
import CardsContainer from "../Components/CardsContainer";
import "../StyleSheets/Dashboard.css";
import Feedback from "../Components/Feddback";
import * as HiIcons from "react-icons/hi";
import Income from "../Components/Income";
import Rating from "../Components/Rating";
import MessageStats from "../Components/MessageStats";

const Dashboard = () => {
  const [dashboardDetails, setDashboardDetails] = useState({});
  const [messageSuccessGraph, setMessageSuccessGraph] = useState([]);
  const [messageFailureGraph, setMessageFailureGraph] = useState([]);
  const [incomeGraph, setIncomeGraph] = useState([]);
  const [rating, setRating] = useState([]);

  useEffect(() => {
    fetchDashboardDetails();
  }, []);

  const fetchDashboardDetails = () => {
    fetch("http://16.170.159.223/dashboard")
      .then(async (response) => {
        const data = await response.json();
        console.log(data);
        if (data) {
          setDashboardDetails(data);
          setMessageSuccessGraph(data.message_success_graph);
          setMessageFailureGraph(data.message_failed_graph);
          setIncomeGraph(data.invoice_graph);
          setRating(data.rating_graph);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="dashboard">
      <div className="dashboard-title">
        Dashboard{" "}
        <div className="profile">
          User
          <svg width="0" height="0">
            <linearGradient
              id="blue-gradient"
              x1="100%"
              y1="100%"
              x2="50%"
              y2="0%"
            >
              <stop stopColor="#04A1E4" offset="0%" />
              <stop stopColor="#AC1FCF" offset="100%" />
            </linearGradient>
          </svg>
          <HiIcons.HiUserCircle
            style={{ fill: "url(#blue-gradient)" }}
            className="profile-icon"
          />
        </div>
      </div>
      <div className="dash-row">
        <CardsContainer dashboardDetails={dashboardDetails} />
        <Income
          incomeGraph={incomeGraph}
          invoices={dashboardDetails.invoice}
          feedbacks={dashboardDetails.feedbacks}
        />
      </div>
      <div className="dash-row">
        <Rating
          rating={rating}
          setRating={setRating}
          dashboardDetails={dashboardDetails}
        />
        <BranchIncome />
      </div>
      <div className="dash-row bottom">
        <Feedback
          invoices={dashboardDetails.invoice}
          feedbacks={dashboardDetails.feedbacks}
        />
        <MessageStats
          messageSuccessGraph={messageSuccessGraph}
          messageFailureGraph={messageFailureGraph}
        />
      </div>
    </div>
  );
};

export default Dashboard;

const BranchIncome = () => {
  return (
    <div className="branch-income">
      <div className="branch-title">
        <div className="bt-l">Branch</div>
        <div className="bt-m">Head</div>
        <div className="bt-r">Income</div>
      </div>
      <div className="branch-data">
        <div className="bd-l">
          <div className="bd-l1">Pondicherry</div>
          <div className="bd-l2">16as85621a</div>
        </div>
        <div className="bd-m">Ram</div>
        <div className="bd-r">1524.50$</div>
      </div>
      <div className="branch-data">
        <div className="bd-l">
          <div className="bd-l1">Chidambaram</div>
          <div className="bd-l2">16as85621a</div>
        </div>
        <div className="bd-m">Reddy</div>
        <div className="bd-r">8,154$</div>
      </div>
      <div className="branch-data">
        <div className="bd-l">
          <div className="bd-l1">Tiruporur</div>
          <div className="bd-l2">16as85621a</div>
        </div>
        <div className="bd-m">Mohan</div>
        <div className="bd-r">5,154$</div>
      </div>
      <div className="branch-data">
        <div className="bd-l">
          <div className="bd-l1">Canada</div>
          <div className="bd-l2">16as85621a</div>
        </div>
        <div className="bd-m">Paul</div>
        <div className="bd-r">3,154$</div>
      </div>
      <div className="branch-data">
        <div className="bd-l">
          <div className="bd-l1">Oman</div>
          <div className="bd-l2">16as85621a</div>
        </div>
        <div className="bd-m">Duncken</div>
        <div className="bd-r">2,154$</div>
      </div>
    </div>
  );
};
