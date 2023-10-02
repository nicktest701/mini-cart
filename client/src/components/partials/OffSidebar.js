import React from "react";
import { Button, Offcanvas, Stack } from "react-bootstrap";
import { IconContext } from "react-icons";
import {
  IoBarChartOutline,
  IoBasketOutline,
  IoCarOutline,
  IoCartOutline,
  IoHomeOutline,
  IoInformationCircleOutline,
  IoMenuSharp,
  IoPersonOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import screenfull from "screenfull";
import avatar from "../../assets/images/noimage.png";
import logo from "../../assets/images/logo.svg";
function OffSidebar({ showSidebar, setShowSidebar }) {
  const handleFullScreen = () => {
    if (screenfull.isEnabled) {
      screenfull.toggle();
    }
  };

  const toggleIconColor = ({ isActive }) => {
    return {
      backgroundColor: isActive ? "#e2ad0e" : "transparent",
      color: isActive ? "#fff" : "#333",
    };
  };

  return (
    <Offcanvas
      show={showSidebar}
      onHide={() => setShowSidebar(!showSidebar)}
      style={{ width: "230px" }}
      className="py-2 offSidebar"
    >
      <IconContext.Provider value={{ size: 18 }}>
        <Offcanvas.Header className="d-flex">
          <Offcanvas.Title className="d-flex">
            <div className="logo-container me-2">
              <img src={logo} width={40} alt="logo.svg" />
            </div>
            Mini Cart
          </Offcanvas.Title>
          <IoMenuSharp size={32} onClick={() => setShowSidebar(!showSidebar)} />
        </Offcanvas.Header>

        <Offcanvas.Body
          className="d-flex-column"
          style={{ flexGrow: 1, flex: 1 }}
        >
          <ul className="sidebar-nav my-5" style={{ flexGrow: 1, flex: 1 }}>
            <li>
              <NavLink to="/" style={toggleIconColor}>
                <IoHomeOutline />
                <span> Dashboard</span>
              </NavLink>
            </li>

            <li>
              <NavLink to="/sales" style={toggleIconColor}>
                <IoCartOutline />
                <span> Sales</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/products" style={toggleIconColor}>
                <IoBasketOutline />
                <span> Products</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/suppliers" style={toggleIconColor}>
                <IoCarOutline />
                <span> Suppliers</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/summary" style={toggleIconColor}>
                <IoBarChartOutline />
                <span> Sales Summary</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/accounts" style={toggleIconColor}>
                <IoPersonOutline />
                <span> User Accounts</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/settings" style={toggleIconColor}>
                <IoSettingsOutline />
                <span> Settings</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" style={toggleIconColor}>
                <IoInformationCircleOutline />
                <span> About</span>
              </NavLink>
            </li>
          </ul>

          <Button onClick={handleFullScreen} className="mb-5 w-100">
            Full Screen
          </Button>

          <div className="d-flex justify-content-center gap-3 ">
            <img src={avatar} width={35} alt="avatar.png" />
            <Stack className="sidebar-footer-figure">
              <span>Nana Akwasi</span>
              <span>Software Developer</span>
            </Stack>
          </div>
        </Offcanvas.Body>
      </IconContext.Provider>
    </Offcanvas>
  );
}

export default OffSidebar;
