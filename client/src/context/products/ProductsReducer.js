import _ from "lodash";
export const ProductsReducer = (state, { type, payload }) => {
  switch (type) {
    case "userLogin":
      return {
        ...state,
        user: payload,
      };
    case "userLogout":
      return {
        ...state,
        user: {},
      };

    case "productsDetails":
      const product = payload ? payload.length : 0;
      const lowStock = payload?.filter(
        (a) => a.quantity > 0 && a.quantity < 10
      ).length;

      const outOfStock = payload?.filter((a) => +a.quantity === 0).length;
      return {
        ...state,
        noOfProduct: product,
        lowStock: lowStock,
        outOfStock: outOfStock,
      };
    case "showProductModal":
      return {
        ...state,
        showProductModal: payload,
      };
    case "showProductEditModal":
      return {
        ...state,
        showProductEditModal: payload,
      };

    case "showSupplierAddModal":
      return {
        ...state,
        showSupplierAddModal: payload,
      };

    case "showSupplierEditModal":
      return {
        ...state,
        showSupplierEditModal: payload,
      };

    case "loadCartDetails":
      return {
        ...state,
        cartDetails: payload,
      };

    // case "customerCartInfo":
    //   const noOfItems = payload.reduce((a, b) => +a.quantity + +a.quantity);
    //   const subTotal = payload.reduce((a, b) => +a.total + +a.total);
    //   return {
    //     ...state,
    //     customerCartInfo: payload,
    //   };

    default:
      return state;
  }
};
