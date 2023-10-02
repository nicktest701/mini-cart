import React, { useState } from "react";
import Footer from "./Footer";
import Nav from "./Nav";
import OffSidebar from "./OffSidebar";
import SidebarNarrow from "./SidebarNarrow";
import styles from "../../styles/Layout.module.css";
import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";

function Layout() {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <section className={styles.wrapper}>
      {/* nav */}
      <Nav showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

      {/* main content */}
      <main className={styles.main}>
        <OffSidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
        <SidebarNarrow />
        <Container className={styles.content}>
          <Outlet />
        </Container>
      </main>
      {/* footer */}
      <Footer />
    </section>
  );
}

export default Layout;
