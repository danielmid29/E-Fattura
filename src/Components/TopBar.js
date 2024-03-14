import * as BiIcons from "react-icons/bi";
import * as HiIcons from "react-icons/hi";
import "../StyleSheets/Components/TopBar.css";
import NavBar from "./NavBar";
import Nucleuz from "../assets/logo.png";
import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fontSize } from "@mui/system";

const TopBar = ({ handleTabControl, tab }) => {
  const [menubarInactive, setMenuActive] = useState(false);
  const [logPop, setLogPop] = useState(false);

  const ref = useRef();
  const logPopref = useRef();

  useEffect(() => {
    function handleClickOutsideMenu(event) {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        menubarInactive
      ) {
        setMenuActive(false);
      }

      if (
        logPopref.current &&
        !logPopref.current.contains(event.target) &&
        logPop
      ) {
        setLogPop(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutsideMenu, true);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutsideMenu, true);
    };
  }, [menubarInactive, ref, logPopref, logPop]);

  const hadleLogOut = () => {
    setLogPop(!logPop);
  };

  console.log(`navbar-top ${menubarInactive ? "active" : ""}`);
  return (
    <div className="main-topbar">
      <div
        className="menu-button"
        onClick={() => setMenuActive(!menubarInactive)}
        ref={ref}
      >
        <div className={`navbar-top ${menubarInactive ? "active" : ""}`}>
          <NavBar handleTabControl={handleTabControl} tab={tab} />
        </div>
        <BiIcons.BiMenu />
      </div>
      <div className="logot">
        <Link to="/" className="top-logo">
          <img src={Nucleuz} className="nav-top-image" alt="logo" />
        </Link>
      </div>

      <svg width="0" height="0">
        <linearGradient id="dark-gradient" x1="100%" y1="100%" x2="50%" y2="0%">
          <stop stopColor="#04A1E4" offset="0%" />
          <stop stopColor="#AC1FCF" offset="100%" />
        </linearGradient>
      </svg>
      <div ref={logPopref}>
        <div className="profile tb" onClick={() => setLogPop(!logPop)}>
          User
          <HiIcons.HiUserCircle
            style={{ fill: "url(#dark-gradient)" }}
            className="profile-icon tb"
          />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
