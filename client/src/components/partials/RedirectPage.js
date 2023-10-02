import React, { useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import cookie from "cookiejs";
import { ProductContext } from "../../context/products/ProductProvider";
import { Spinner } from "react-bootstrap";

function RedirectPage() {
  const { proDispatch } = useContext(ProductContext);
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state;

  useEffect(() => {
    const token = cookie.get("jwt");

    const isLoggedIn = async () => {
      try {
        const res = await axios({
          url: "/user/login",
          method: "POST",
          data: {
            token: token,
          },
          headers: {
            "Content-type": "application/json",
          },
        });
        const data = await res.data;
        navigate(state?.path || "/", { replace: true });
        proDispatch({ type: "userLogin", payload: data });
      } catch (error) {
        navigate("/user/login", {
          replace: true,
          state: { msg: "Session timed out.Login again", variant: "danger" },
        });
      }
    };
    if (token) {
      isLoggedIn();
    } else {
      navigate("/user/login", {
        replace: true,
      });
    }
  }, [proDispatch, navigate, state.path]);

  return (
    <div
      style={{ height: "100vh" }}
      className="d-flex align-items-center justify-content-center bg-light"
    >
      <Spinner animation="border" size={100} variant="primary" />
    </div>
  );
}

export default RedirectPage;
