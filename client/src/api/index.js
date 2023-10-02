import {
  getAllProducts,
  postProduct,
  putProduct,
  deleteProduct,
} from "./products/productApi";
import {
  getAllSuppliers,
  postSupplier,
  putSupplier,
  deleteSupplier,
} from "./suppliers/supplierApi";

import { getAllCartByInvoiceNo } from "./cart/cartApi";
import {getUser ,getAllUsers, postUser, putUser, deleteUser } from "./user/userApi";

export {
  // @USERS
  getUser,
  getAllUsers,
  postUser,
  putUser,
  deleteUser,
  // @PRODUCTS
  getAllProducts,
  postProduct,
  putProduct,
  deleteProduct,
  // @SUPPLIERS
  getAllSuppliers,
  postSupplier,
  putSupplier,
  deleteSupplier,
  //@CART
  getAllCartByInvoiceNo,
};
