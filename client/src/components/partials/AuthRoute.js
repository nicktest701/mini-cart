import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import _ from "lodash";
import { ProductContext } from "../../context/products/ProductProvider";

function AuthRoute({ children }) {
  const { proState } = useContext(ProductContext);
  const location = useLocation();

  if (_.isEmpty(proState.user))
    return (
      <Navigate to="/user/redirect" replace state={{ path: location.pathname }} />
    );

  return children;
}

export default AuthRoute;
