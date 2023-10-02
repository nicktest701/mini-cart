import React, { useContext, useEffect } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { IoMenuOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import avatar from "../../assets/images/noimage.png";
import logo from "../../assets/images/logo.svg";
import { ProductContext } from "../../context/products/ProductProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import cookie from "cookiejs";

function Nav({ setShowSidebar, showSidebar }) {
  const navigate = useNavigate();
  const { proState, proDispatch } = useContext(ProductContext);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  useEffect(() => {
    if (_.isEmpty(proState.user)) {
      navigate("/user/login", { replace: true });
    }
  }, [navigate, proState.user]);

  const imageUrl = `/images/${proState.user.avatar}`;

  const handleLogOut = async () => {
    const result = await Swal.fire({
      position: "center",
      title: "Exiting",
      text: "Do you want to logout?",
      icon: "info",
      iconColor: "#E2AD0E",
      confirmButtonColor: "#E2AD0E",
      showCancelButton: true,
    });
    if (result.isConfirmed) {
      cookie.remove("jwt");
      proDispatch({ type: "userLogout" });
      navigate("/user/login", { replace: true });
    }
  };

  return (
    <header>
      <nav className="nav">
        <div className="d-flex me-auto">
          <IoMenuOutline
            size={30}
            onClick={toggleSidebar}
            style={{ marginLeft: 25 }}
          />
          <Link to="/" className="text-decoration-none">
            <div className="d-flex align-items-center ps-5">
              <div className="logo-container">
                <img src={logo} width={35} alt="logo.svg" />
              </div>
              <h4 className="text-dark">Mini Cart</h4>
            </div>
          </Link>
        </div>
        <section>
          <div className="avatar-container">
            <div>
              <img
                width={30}
                src={proState.user ? imageUrl : avatar}
                alt="avatar.png"
                className="img rounded-circle"
              />
            </div>
            <DropdownButton
              title={
                _.isEmpty(proState?.user) ? "User" : proState.user.username
              }
              id="dropdown-button"
              variant="white"
              className="nav-dropdown"
            >
              <Dropdown.Item eventKey="1">Profile </Dropdown.Item>
              <Dropdown.Item eventKey="2">Settings</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item
                eventKey="3"
                // href="user/login"
                onClick={handleLogOut}
              >
                Log out
              </Dropdown.Item>
            </DropdownButton>
          </div>
        </section>
      </nav>
    </header>
  );
}

export default Nav;
