import React, { useReducer } from "react";
import { ProductsReducer } from "./ProductsReducer";

export const ProductContext = React.createContext();
function ProductProvider({ children }) {
  const initialState = {
    user: {},
    noOfProduct: 0,
    lowStock: 0,
    outOfStock: 0,
    showProductModal: false,
    showProductEditModal: false,
    showSupplierAddModal: false,
    showSupplierEditModal: false,
    cartDetails: {},
    customerCartInfo: [],
    customerInvoiceId: "",
  };

  const [proState, proDispatch] = useReducer(ProductsReducer, initialState);
  return (
    <ProductContext.Provider value={{ proState, proDispatch }}>
      {children}
    </ProductContext.Provider>
  );
}

export default ProductProvider;
