import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Formik } from "formik";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import $ from "jquery";
import { object, array, number } from "yup";
import moment from "moment";
import {
  IoSaveSharp,
  IoAddSharp,
  IoBasketSharp,
  IoCartSharp,
} from "react-icons/io5";
import {
  Alert,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import { getAllProducts } from "../../api";
import { cartProductColumns, salesProductColumns } from "../../data";
import { ProductContext } from "../../context/products/ProductProvider";
import { motion } from "framer-motion";
import { v4 as uuid } from "uuid";
import { useMutation } from "react-query";
import { postCustomer } from "../../api/customer/customerApi";

function Sales() {
  //@ contexts
  const { proDispatch } = useContext(ProductContext);

  const navigate = useNavigate();

  // @ Refs
  const productTableRef = useRef(null);
  const cartTableRef = useRef(null);
  const qtyRef = useRef(null);

  const [invoiceNo] = useState(uuid().split("-")[0]);
  const [amtVisible, setAmtVisible] = useState("visible");
  const [cartList, setCartList] = useState([]);
  const [grossTotal, setGrossTotal] = useState(0);
  const [qtyError, setQtyError] = useState("");
  const [amtPaidError, setAmtPaidError] = useState("");
  const [productData, setproductData] = useState({
    invoiceNo: invoiceNo,
    id: "",
    name: "",
    price: "",
    quantity: "",
    total: "",
    availableQuantity: "",
  });

  const [customer, setCustomer] = useState("Customer");
  const [noOfItems, setNoOfItems] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [amountPaid, setAmountPaid] = useState(0);
  const [netTotal, setNetTotal] = useState(0);
  const [balance, setBalance] = useState(0);

  const initialValues = {
    invoiceNo,
    customer: customer,
    products: cartList,
    noOfItems,
    discount,
    amountPaid,
    grossTotal,
    netTotal,
    balance,
  };
  const currencyFormatter = (currency) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "GHS",
      maximumFractionDigits: 2,
    }).format(currency);
  };

  const validationSchema = object().shape({
    discount: number()
      .required("Required*")
      .lessThan(101, "Discount Should be between 1-100"),
    amountPaid: number()
      .required("Required*")
      .moreThan(0, "Amount Paid Very Low"),
    products: array().min(1, "Please select a product!!"),
  });

  const { mutateAsync } = useMutation(postCustomer);

  useEffect(() => {
    const qty = cartList.reduce((total, item) => total + +item.quantity, 0);
    setNoOfItems(qty);
  }, [noOfItems, cartList]);

  const onSubmit = async (values, options) => {
    setAmtPaidError("");
    if (Number(values.amountPaid) < Number(values.netTotal)) {
      setAmtPaidError("Amount Paid Very Low");
      return;
    }

    //Get total no of items
    const qty = values.products.reduce(
      (total, item) => total + +item.quantity,
      0
    );

    const init = {
      customer: {
        invoiceNo: values.invoiceNo,
        purchasedDate: moment().format("YYYY-MM-DD"),
        customer: values.customer,
        noOfItems: qty,
        discount: values.discount,
        amountPaid: values.amountPaid,
        grossTotal: values.grossTotal,
        netTotal: values.netTotal,
        balance: values.balance,
      },
      products: values.products,
    };

    mutateAsync(init, {
      onSuccess: async (data) => {
        await proDispatch({ type: "loadCartDetails", payload: init });
        navigate("/print", { replace: true });
      },
      onError: (error, v, context) => {},
    });
  };

  const data = useQuery("products", getAllProducts);

  //@ Add quantity
  const handleAddQty = (e) => {

    setQtyError("");
    const quantity = e.currentTarget.value;
    if (/[0-9]/.test(quantity)) {
      setproductData({
        ...productData,
        invoiceNo,
        quantity: +quantity,
        total: +productData.price * +quantity,
      });
    } else {
      setQtyError("Invalid Number");
    }
  };

  const handleAddToCart = () => {
   
    setQtyError("");
    if (productData.name.trim().length === 0) {
      setQtyError("Please select a product!!!");
      return;
    }
    if (Number(productData.quantity) >= 1) {
      if (
        Number(productData.quantity) > Number(productData.availableQuantity)
      ) {
        setQtyError("Avaialble Stock not sufficient");
        return;
      }

      const filteredList = cartList.filter(
        (item) => item.id !== productData.id
      );
      setCartList((prevLis) => [...filteredList, productData]);

  
    } else {
      setQtyError("Quantity enter is low");
    }

    setproductData({
      ...productData,
      id: "",
      name: "",
      price: "",
      quantity: "",
      total: "",
      availableQuantity: "",
    });
    qtyRef.current.value = "";
  };

  //@ Generare new id

  //@ Product table
  useEffect(() => {
    const net =
      Number(grossTotal) -
      Number(grossTotal) * (isNaN(discount) ? 0 : discount / 100);
    setNetTotal(net);

    const bal = Number(isNaN(amountPaid) ? 0 : amountPaid) - Number(netTotal);
    setBalance(bal <= 0 ? 0 : bal);
  }, [discount, amountPaid, grossTotal, netTotal]);

  //@ Product table
  useEffect(() => {
    const proId = productTableRef.current.id;
    let productTable = $(`#${proId}`)
      .DataTable({
        responsive: true,
        destroy: true,
        stateSave: true,
        select: true,
        dom: "Bftitp",
        pageLength: 6,
        columns: salesProductColumns,
        data: data ? data.data : [],
      })
      .on("click", "tr", function (e) {
        let selectedRow = productTable.row($(this)).data();
        if (selectedRow) {
          setproductData({
            id: selectedRow?.id,
            name: selectedRow?.name,
            price: +selectedRow?.price,
            quantity: 0,
            total: 0,
            availableQuantity: +selectedRow?.quantity,
          });

          qtyRef.current.value = "";
          qtyRef.current.focus();
        }
      });
  }, [data]);

  //@ Cart table
  useLayoutEffect(() => {
    const handleDelete = (id) => {
      const filteredList = cartList.filter((item) => item.id !== id);
      setCartList(filteredList);
    };

    $(`#${cartTableRef.current.id}`).DataTable({
      destroy: true,
      saveState: true,
      dom: "Bfitp",
      pageLength: 3,
      columns: cartProductColumns(handleDelete),
      data: cartList,
    });

    setGrossTotal((prevData) => {
      return cartList.reduce((a, b) => a + +b.total, 0);
    });
    setNoOfItems(cartList.length);
  }, [cartList]);

  return (
    <Container className="sales-container position-relative p-4  ms-md-5">
      <h1 className="display-6 ">Sales</h1>

      <Breadcrumb>
        <BreadcrumbItem href="/">Dashboard</BreadcrumbItem>
        <BreadcrumbItem href="/sales" active>
          Sales
        </BreadcrumbItem>
      </Breadcrumb>

      <motion.div
        drag
        className="card position-fixed top-0 start-50 shadow"
        style={{
          width: "300px",
          zIndex: 1000,
          visibility: amtVisible,
        }}
      >
        <Card.Header className="d-flex justify-content-between">
          <Card.Title>Net Total</Card.Title>
          <button
            className="btn-close"
            onClick={() => setAmtVisible("hidden")}
          ></button>
        </Card.Header>
        <Card.Body className="text-center">
          <Card.Text className="fs-3 text-primary">
            {currencyFormatter(netTotal)}
          </Card.Text>
        </Card.Body>
        <Card.Footer className="d-flex justify-content-between">
          <Card.Title>Balance</Card.Title>
          <Card.Title> {currencyFormatter(balance)}</Card.Title>
        </Card.Footer>
      </motion.div>

      <hr />

      <Row className="gap-3 mb-4">
        <Col>
          <Card>
            <Card.Header className="bg-primary">
              <Card.Title className="lead text-white">
                <IoBasketSharp />
                Products
              </Card.Title>
            </Card.Header>
            <Card.Body className="p-3">
              <table
                width={"100%"}
                ref={productTableRef}
                id="product-table"
                className="table table-sm table-responsive table-borderless table-hover table-striped"
                style={{ fontSize: "14px", cursor: "pointer" }}
              >
                <thead>
                  <tr>
                    <th style={{ width: "10%" }}>Id</th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Header className="bg-primary">
              <Card.Title className="lead text-white">
                <IoCartSharp /> Cart
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <table
                width={"100%"}
                ref={cartTableRef}
                id="cart-table"
                className="table table-sm table-responsive table-borderless table-hover table-striped"
                style={{ fontSize: "14px" }}
              >
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </Card.Body>
            <Card.Footer className="d-flex justify-content-between">
              <Card.Title>Gross Total</Card.Title>
              <Card.Title>{currencyFormatter(grossTotal)}</Card.Title>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
      {/* //Sales */}
      <div className="mt-3">
        <h3 className="lead">Sales Details</h3>
        <Row>
          <Col sm={6}>
            <Form>
              <Form.Group controlId="name" className="pb-2">
                <Form.Label>Product</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Product"
                  defaultValue={productData.name}
                  disabled
                />
              </Form.Group>
              <Form.Group controlId="price" className="pb-2">
                <Form.Label>Price (GH)</Form.Label>
                <Form.Control
                  type="text"
                  name="price"
                  placeholder="Price"
                  defaultValue={productData.price}
                  disabled
                />
              </Form.Group>
              <Form.Group controlId="quantity" className="pb-2">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  ref={qtyRef}
                  type="text"
                  name="quantity"
                  autoComplete="off"
                  placeholder="Enter Quantity"
                  defaultValue={productData.quantity}
                  onChange={(e) => handleAddQty(e)}
                />
                <Form.Text className="text-danger">{qtyError}</Form.Text>
              </Form.Group>
              <Form.Group className="d-flex justify-content-end">
                <Button
                  variant="primary"
                  id="add"
                  onClick={(v) => handleAddToCart(v)}
                  disabled={productData?.quantity?.length === 0 ? true : false}
                >
                  <IoAddSharp />
                  Add to Cart
                </Button>
              </Form.Group>
            </Form>
          </Col>
          <Col sm={6}>
            {/* Customer Details */}
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              enableReinitialize={true}
              onSubmit={onSubmit}
            >
              {({
                handleChange,
                handleSubmit,
                values,
                errors,
                touched,
                handleBlur,
              }) => {
                return (
                  <>
                    {errors.products && (
                      <Alert variant="danger" className="mt-3">
                        {errors.products}
                      </Alert>
                    )}

                    <Form className="">
                      <Form.Group controlId="name" className="pb-2">
                        <Form.Label>Customer's Name</Form.Label>
                        <Form.Control
                          type="text"
                          autoComplete="off"
                          placeholder="Customer's Name"
                          value={values.customer}
                          onChange={(e) => {
                            handleChange("customer");
                            setCustomer(e.currentTarget.value);
                          }}
                        />
                      </Form.Group>
                      <Row>
                        <Col>
                          <Form.Group controlId="noOfItems" className="pb-2">
                            <Form.Label>Number Of Items</Form.Label>
                            <Form.Control
                              type="text"
                              autoComplete="off"
                              value={noOfItems}
                              // onChange={handleChange("noOfItems")}
                              disabled
                            />
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group controlId="discount" className="pb-2">
                            <Form.Label>Discount(GH)</Form.Label>
                            <Form.Control
                              type="number"
                              autoComplete="off"
                              max={100}
                              maxLength={3}
                              min={0}
                              minLength={1}
                              value={values.discount}
                              onBlur={handleBlur("discount")}
                              onChange={(e) => {
                                handleChange("discount");
                                setDiscount(e.currentTarget.valueAsNumber);
                              }}
                            />
                            {touched.discount && errors.discount ? (
                              <Form.Text className="text-danger">
                                {errors.discount}
                              </Form.Text>
                            ) : null}
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Form.Group controlId="amountPaid" className="pb-2">
                            <Form.Label>Amount Paid (GH)</Form.Label>
                            <Form.Control
                              type="text"
                              autoComplete="off"
                              value={values.amountPaid}
                              onBlur={handleBlur("amountPaid")}
                              onChange={(e) => {
                                handleChange("amountPaid");
                                setAmountPaid(e.currentTarget.value);
                              }}
                            />
                            {touched.amountPaid && errors.amountPaid ? (
                              <Form.Text className="text-danger">
                                {errors.amountPaid}
                              </Form.Text>
                            ) : null}
                            <Form.Text className="text-danger">
                              {amtPaidError}
                            </Form.Text>
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group controlId="balance" className="pb-2">
                            <Form.Label>Balance</Form.Label>
                            <Form.Control
                              type="text"
                              autoComplete="off"
                              disabled
                              value={values.balance}
                              onChange={handleChange("balance")}
                            />
                            <Form.Text className="text-muted"></Form.Text>
                          </Form.Group>
                        </Col>
                      </Row>

                      <Form.Group className="d-flex justify-content-end">
                        <Button
                          variant="primary"
                          type="submit"
                          // disabled={
                          //   productData?.quantity?.length === 0 ? true : false
                          // }
                          onClick={handleSubmit}
                        >
                          <IoSaveSharp /> Save & Print
                        </Button>
                      </Form.Group>
                    </Form>
                  </>
                );
              }}
            </Formik>
          </Col>
        </Row>
      </div>
    </Container>
  );
}

Sales.propTypes = {};

export default Sales;
