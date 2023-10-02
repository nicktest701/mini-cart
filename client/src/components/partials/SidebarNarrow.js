import React from "react";
import styles from "../../styles/Sidebar.module.css";

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
import { MdFullscreen } from "react-icons/md";
import screenfull from "screenfull";
import avatar from "../../assets/images/noimage.png";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
// import { motion } from "framer-motion";

function SidebarNarrow() {
  const location = useLocation();

  const handleFullScreen = () => {
    if (screenfull.isEnabled) {
      screenfull.toggle();
    }
  };

  const toggleIconColor = (path) => {
    return location.pathname === path ? "#e2ad0e" : "#333";
  };

  return (
    <aside className={styles.sidebar_narrow}>
      <IconContext.Provider
        value={{ color: "#333", size: 30, className: "sidebar-icon" }}
      >
        <ul className={styles.nav}>
          <li className={styles.nav_item} title="Dashboard">
            <NavLink to="/">
              <IoHomeOutline color={toggleIconColor("/")} />
            </NavLink>
          </li>

          <li className={styles.nav_item}>
            <NavLink to="/sales" title="Sales">
              <IoCartOutline
                className="sidebar-icon"
                color={toggleIconColor("/sales")}
              />
            </NavLink>
          </li>
          <li className={styles.nav_item} title="Products">
            <NavLink to="products">
              <IoBasketOutline color={toggleIconColor("/products")} />
            </NavLink>
          </li>
          <li className={styles.nav_item} title="Suppliers">
            <NavLink to="suppliers">
              <IoCarOutline color={toggleIconColor("/suppliers")} />
            </NavLink>
          </li>
          <li className={styles.nav_item} title="Summary">
            <NavLink to="summary">
              <IoBarChartOutline color={toggleIconColor("/summary")} />
            </NavLink>
          </li>
          <li className={styles.nav_item} title="Accounts">
            <NavLink to="accounts">
              <IoPersonOutline color={toggleIconColor("/accounts")} />
            </NavLink>
          </li>
          <li className={styles.nav_item} title="Settings">
            <NavLink to="settings">
              <IoSettingsOutline color={toggleIconColor("/settings")} />
            </NavLink>
          </li>
          <li className={styles.nav_item} title="About">
            <NavLink to="about">
              <IoInformationCircleOutline color={toggleIconColor("/about")} />
            </NavLink>
          </li>
        </ul>
      </IconContext.Provider>

      <Button
        onClick={handleFullScreen}
        className="mb-4 btn-sm"
        title="Toggle fullscreen"
      >
        <MdFullscreen size={25} />
      </Button>
      <div className={styles.footer}>
        <img src={avatar} width={30} alt="avatar.png" />

        <div className={styles.footer_text_container}>
          <p>Nana Akwasi</p>
          <p className="text-primary">Software Developer</p>
        </div>
      </div>
    </aside>
  );
}

export default SidebarNarrow;
