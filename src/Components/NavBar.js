import { useState } from "react";
import "../StyleSheets/Components/NavBar.css";
import Nucleuz from "../assets/logo.png";
import * as BiIcons from "react-icons/bi";
import * as AiIcons from "react-icons/ai";
import * as FaIcons from "react-icons/fa";
import { Link } from "react-router-dom";
import { height } from "@mui/system";
import { IconContext } from "react-icons/lib";

const NavBar = ({ handleTabControl, tab }) => {
  const [active, setActive] = useState(window.location.pathname);

  const navClick = (activePage) => {
    handleTabControl(activePage);
    setActive(activePage);
  };

  const getNavIcon = (current) => {
    if (active === current) {
      return {
        fill: "url(#mygradient)",
      };
    } else {
      return {};
    }
  };
  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={Nucleuz} className="nav-image" alt="logo" />
        <div className="nav-logo-title">e-fatura</div>
      </div>

      <div className="navbar-links">
        <svg xmlns="http://www.w3.org/2000/svg" width="0" height="0">
          <defs>
            <linearGradient
              id="mygradient"
              x1="80.86%"
              x2="19.14%"
              y1="0%"
              y2="100%"
            >
              <stop offset="0%" stop-color="#04A1E4" />
              <stop offset="100%" stop-color="#AC1FCF" />
            </linearGradient>
          </defs>
        </svg>
        <NavLink
          active={active}
          path={"/"}
          name={"Dashboard"}
          icon={<BiIcons.BiHome style={getNavIcon("/")} className="nav-icon" />}
          navClick={navClick}
        />
        <NavLink
          active={active}
          path={"/invoices"}
          name={"Invoices"}
          icon={
            <BiIcons.BiReceipt
              style={getNavIcon("/invoices")}
              className="nav-icon"
            />
          }
          navClick={navClick}
        />
        <NavLink
          active={active}
          path={"/messages"}
          name={"Messages"}
          icon={
            <BiIcons.BiMessageAltDetail
              style={getNavIcon("/messages")}
              className="nav-icon"
            />
          }
          navClick={navClick}
        />
        <NavLink
          active={active}
          path={"/feedback"}
          name={"Customer Satisfaction"}
          icon={
            <BiIcons.BiBookHeart
              style={getNavIcon("/feedback")}
              className="nav-icon"
            />
          }
          navClick={navClick}
        />
        <NavLink
          active={active}
          path={"/customers"}
          name={"Customers"}
          icon={
            <FaIcons.FaUsers
              style={getNavIcon("/customers")}
              className="nav-icon"
            />
          }
          navClick={navClick}
        />
        <NavLink
          active={active}
          path={"/stores"}
          name={"Stores"}
          icon={
            <BiIcons.BiStore
              style={getNavIcon("/stores")}
              className="nav-icon"
            />
          }
          navClick={navClick}
        />
        <NavLink
          active={active}
          path={"/template-builder"}
          name={"Template Builder"}
          icon={
            <BiIcons.BiSolidSend
              style={getNavIcon("/template-builder")}
              className="nav-icon"
            />
          }
          navClick={navClick}
        />
        <NavLink
          active={active}
          path={"/settings"}
          name={"Settings"}
          icon={
            <AiIcons.AiFillSetting
              style={getNavIcon("/settings")}
              className="nav-icon"
            />
          }
          navClick={navClick}
        />
      </div>
    </div>
  );
};

export default NavBar;

const NavLink = ({ active, name, path, icon, navClick }) => {
  return (
    <Link
      className={active === path ? "nav-button active" : "nav-button"}
      onClick={() => navClick(path)}
      to={path}
    >
      <div className={active === path ? "nav active" : "nav"}></div>
      {icon}
      {name}
    </Link>
  );
};
