import { useState } from "react";
import NavBar from "../Components/NavBar";
import TopBar from "../Components/TopBar";
import "../StyleSheets/Home.css";
import TemplateBuilder from "./TemplateBuilder";
import Dashboard from "./Dashboard";
import Invoices from "./Invoices";
import Messages from "./Messages";
import Settings from "./Settings";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Feedbacks from "./Feedback";
import Out_Template from "./Template";
import Template from "./CampaignComponents/Invoice-Template";
import { useEffect } from "react";
import Customers from "./Customers";
import Out_TemplatePDF from "./TemplatePDF";
import PDFfile from "./CampaignComponents/Template-PDF";
import Stores from "./Stores";

const Home = () => {
  const [tab, setTab] = useState("Dashboard");
  const [main, setMain] = useState(false);

  const handleTabControl = (tabEnd) => {
    console.log(tabEnd);
    setTab(tabEnd);
  };

  useEffect(() => {
    if (window.location.pathname === "/invoice") setMain(true);
    else if (window.location.pathname === "/pdf") setMain(true);
  }, []);
  return (
    <div className="main-div">
      <Router>
        <div className={`home-left ${main && "none"}`}>
          <NavBar handleTabControl={handleTabControl} tab={tab} />
        </div>
        <div className="home-right">
          <div className={`home-top ${main && "none"}`}>
            <TopBar handleTabControl={handleTabControl} tab={tab} />
          </div>
          <Routes>
            <Route path="/" exact element={<Dashboard />} />
            <Route path="/invoices" exact element={<Invoices />} />
            <Route path="/messages" exact element={<Messages />} />
            <Route path="/feedback" exact element={<Feedbacks />} />
            <Route path="/customers" exact element={<Customers />} />
            <Route path="/stores" exact element={<Stores />} />
            <Route path="/invoice" exact element={<Out_Template />} />
            <Route path="/pdf" exact element={<PDFfile />} />
            <Route
              path="/template-builder"
              exact
              element={<TemplateBuilder />}
            />
            <Route path="/settings" exact element={<Settings />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default Home;
