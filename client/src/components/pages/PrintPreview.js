import React, { useContext, useEffect } from "react";
import { Col, Container, Image, Row, Stack } from "react-bootstrap";
import moment from "moment";
import logo from "../../assets/images/logo.svg";
import { ProductContext } from "../../context/products/ProductProvider";
import { useNavigate } from "react-router-dom";
import { CurrencyFormatter } from "../../config/CurrencyFormatter";

function PrintPreview() {
  const { proState } = useContext(ProductContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (proState.cartDetails.customer === undefined) {
      navigate("/", { replace: true });
      return;
    }
    // const doc = window.open("/print");
    // doc.document.close();
    // doc.focus();
    window.print();
  }, [proState, navigate]);

  const { cartDetails } = proState;

  return (
    <Container className="print-container ">
      <div className="mb-5 text-center  d-flex-column">
        <div
          className="print-logo-container
         d-flex flex-column justify-content- align-items-center  gap-1"
        >
          <Image src={logo} alt="logo.png" width={40} />
          <h1>Mini Cart</h1>
        </div>
      </div>
      <Row className="print-header d-flex justify-content-between px-1 my-3">
        <Col className="text-left d-flex flex-column">
          <h3>Invoice</h3>
          <small>Invoice No-{cartDetails?.customer?.invoiceNo}</small>
          <small>
            Invoice Date-
            {moment(cartDetails?.customer?.purchasedDate).format("DD-MMM-YYYY")},{moment().format("hh:mm:ss a")}
          </small>
        </Col>
        <Col className="d-flex flex-column" style={{ textAlign: "right" }}>
          <h3>{cartDetails?.customer?.customer}</h3>
          <small>22nd Avenue Street,Kwaprah</small>
          <small>+233560372844 | +233543772591</small>
        </Col>
      </Row>
      <div className="print-table-container">
        <p className="text-white bg-primary  w-100 p-2">Sales Details</p>
        <table
          className="w-100 table table-sm table-borderless border"
          style={{ fontSize: "12px" }}
        >
          <thead className="bg-secondary text-white py-3 ">
            <tr className="py-3">
              <th>#</th>
              <th>Description</th>
              <th>Unit Price</th>
              <th>Quantity</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {cartDetails?.products?.map((item, index) => {
              return (
                <tr key={index + 1}>
                  <td>{index + 1}</td>
                  <td>{item?.name}</td>
                  <td>{item?.price}</td>
                  <td>{item?.quantity}</td>
                  <td>{item?.total}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <Row className="pe-2 mb-5 d-flex justify-content-end">
          <Col
            md={3}
            className="print-summary border"
            style={{ maxWidth: "250px" }}
          >
            <p className="fw-bold">Sales Summary</p>
            <hr />
            <Stack gap={1}>
              <div className="d-flex justify-content-between">
                <small className="fw-bold">SubTotal</small>
                <small>
                  {CurrencyFormatter(cartDetails?.customer?.netTotal)}
                </small>
              </div>
              <div className="d-flex justify-content-between">
                <small className="fw-bold">Discount(%)</small>
                <small>{cartDetails?.customer?.discount}</small>
              </div>
              <div className="d-flex justify-content-between ">
                <small className="fw-bold">Total</small>
                <small>
                  {CurrencyFormatter(cartDetails?.customer?.netTotal)}
                </small>
              </div>
              <div className="d-flex justify-content-between">
                <small className="fw-bold">Payments</small>
                <small>
                  {CurrencyFormatter(cartDetails?.customer?.amountPaid)}
                </small>
              </div>
              <hr />
              <div className="d-flex justify-content-between text-success">
                <small className="fw-bold">Balance</small>
                <small>
                  {CurrencyFormatter(cartDetails?.customer?.balance)}
                </small>
              </div>
            </Stack>
          </Col>
        </Row>
      </div>
      <p className="text-center fst-italic fs-5">
        Thanks you for your business!!!
      </p>
      <div className="d-flex flex-column text-center pt-5">
        <small className="fw-bold fst-italic">Designed by</small>
        <small className="lh-small">FrebbyTech Consults</small>
        <small>+233560372844 || +233543772591</small>
      </div>
    </Container>
  );
}

export default PrintPreview;
