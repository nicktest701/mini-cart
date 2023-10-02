import React from "react";
import screenfull from "screenfull";
import { IconContext } from "react-icons";
import {
  IoSettingsOutline,
  IoHomeOutline,
  IoCartOutline,
  IoBarChartOutline,
  IoPersonOutline,
  IoCarOutline,
  IoBasketOutline,
  IoInformationCircleOutline,
} from "react-icons/io5";
import avatar from "../../assets/images/noimage.png";
import logo from "../../assets/images/logo.svg";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

function Sidebar() {
  const handleFullScreen = () => {
    if (screenfull.isEnabled) {
      screenfull.toggle();
    }
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo-container">
          <img src={logo} width={40} alt="logo.svg" />
        </div>
        <h1>Mini Cart</h1>
      </div>
      <IconContext.Provider
        value={{ color: "#333", size: 18, className: "sidebar-icon" }}
      >
        <ul className="sidebar-nav">
          <li>
            <Link to="/">
              <IoHomeOutline />
              <span> Dashboard</span>
            </Link>
          </li>

          <li>
            <Link to="/sales">
              <IoCartOutline className="sidebar-icon" />
              <span> Sales</span>
            </Link>
          </li>
          <li>
            <Link to="/products">
              <IoBasketOutline />
              <span> Products</span>
            </Link>
          </li>
          <li>
            <Link to="/suppliers">
              <IoCarOutline />
              <span> Suppliers</span>
            </Link>
          </li>
          <li>
            <Link to="/summary">
              <IoBarChartOutline /> <span> Sales Summary</span>
            </Link>
          </li>
          <li>
            <Link to="/accounts">
              <IoPersonOutline />
              <span> User Accounts</span>
            </Link>
          </li>
          <li>
            <Link to="/settings">
              <IoSettingsOutline />
              <span> Settings</span>
            </Link>
          </li>
          <li>
            <Link to="/about">
              <IoInformationCircleOutline />
              <span> About</span>
            </Link>
          </li>
        </ul>
      </IconContext.Provider>
      <Button onClick={handleFullScreen} className="mb-5">
        Full Screen
      </Button>
      <div className="sidebar-footer ">
        <img src={avatar} width={30} alt="avatar.png" />

        <div className="sidebar-footer-figure">
          <span>Nana Akwasi</span>
          <span>Software Developer</span>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
