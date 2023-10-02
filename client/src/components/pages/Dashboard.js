import React, { useContext, useState } from "react";
import { Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { IoBasketOutline, IoCarOutline, IoCartOutline } from "react-icons/io5";
import { useQuery } from "react-query";
import "chart.js/auto";
import { Chart } from "react-chartjs-2";
import moment from "moment";
import _ from "lodash";
import DashboardTable from "../datatables/DashboardTable";
import { getAllProducts, getAllSuppliers } from "../../api";
import { ProductContext } from "../../context/products/ProductProvider";
import { getAllCustomers } from "../../api/customer/customerApi";

function Dashboard() {
  const goldColor = "#e2ad0e";

  const { proState, proDispatch } = useContext(ProductContext);

  const [noOfProducts, setNoOfProducts] = useState(0);
  const [noOfSuppliers, setNoOfSuppliers] = useState(0);
  const [months, setMonths] = useState([]);
  const [noOfItemsInMonth, setnoOfItemsInMonth] = useState([]);
  const [last10Cust, setlast10Cust] = useState([]);

  // const [days, setDays] = useState([]);
  const [totalSalesAmount, setTotalSalesAmount] = useState([]);

  const prod = useQuery(["products"], getAllProducts, {
    onSuccess: (data) => {
      // console.table(data);
      setNoOfProducts(data.length);
      proDispatch({ type: "productsDetails", payload: data });
    },
  });
  const supp = useQuery(["suppliers"], getAllSuppliers, {
    onSuccess: (data) => {
      // console.table(data);
      setNoOfSuppliers(data.length);
    },
  });

  useQuery(["customers"], getAllCustomers, {
    onSuccess: (data) => {
      let monthSet = [];
      let totalSalesSet = [];

      //Calculate No for Items Purchased
      const itemsPurchased = data.reduce((group, customer) => {
        const items = moment(customer.purchasedDate).format("MMM,YYYY");

        if (group[items] == null) group[items] = [];
        group[items].push(customer.noOfItems);
        return group;
      }, {});

      setMonths(Object.keys(itemsPurchased));
      Object.values(itemsPurchased).forEach((item) => {
        const total = _.sum(item);
        monthSet.push(total);
      });
      setnoOfItemsInMonth(monthSet);

      //Calculate Total Sales Amount
      const totalSalesAmount = data.reduce((group, customer) => {
        const items = moment(customer.purchasedDate).format("MMM");

        if (group[items] == null) group[items] = [];
        group[items].push(customer.netTotal);
        return group;
      }, {});

      // setMonths(Object.keys(totalSalesAmount));
      Object.values(totalSalesAmount).forEach((item) => {
        const total = _.sum(item);
        totalSalesSet.push(total);
      });
      setTotalSalesAmount(totalSalesSet);

      //Get last 10 Customers
      const last10Customers = _.takeRight(data, 10).reverse();
      setlast10Cust(last10Customers);
    },
  });

  return (
    <Container className="p-5 ms-md-5">
      <div className="card-container ">
        <h1 className="lead fw-bold" style={{ color: goldColor }}>
          Category
        </h1>
        <hr />
        <Row className="g-3 py-3">
          <Col lg={4} md={6}>
            <Card>
              <Card.Body>
                <Card.Title className="d-flex justify-content-between align-items-center">
                  <p>Products</p>
                  <IoBasketOutline color="#FFBE00" size={30} />
                </Card.Title>
                <Card.Text className="display-6">
                  {noOfProducts}{" "}
                  {prod.isLoading && (
                    <Spinner
                      as="span"
                      variant="primary"
                      animation="border"
                      size="sm"
                      className="ms-auto"
                    />
                  )}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4} md={6}>
            <Card>
              <Card.Body>
                <Card.Title className="d-flex justify-content-between align-items-center">
                  <p>Out of Stock</p>
                  <IoCartOutline color="#FFBE00" size={30} />
                </Card.Title>
                <Card.Text className="display-6">
                  {proState.outOfStock}
                  {prod.isLoading && (
                    <Spinner
                      as="span"
                      variant="primary"
                      animation="border"
                      size="sm"
                      className="ms-auto"
                    />
                  )}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4} md={6}>
            <Card>
              <Card.Body>
                <Card.Title className="d-flex justify-content-between align-items-center">
                  <p>Suppliers</p>
                  <IoCarOutline color="#FFBE00" size={30} />
                </Card.Title>
                <Card.Text className="display-6">
                  {noOfSuppliers}
                  {supp.isLoading && (
                    <Spinner
                      as="span"
                      variant="primary"
                      animation="border"
                      size="sm"
                      className="ms-auto"
                    />
                  )}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
      <div className="chart-container py-5">
        <h1 className="lead fw-bold" style={{ color: goldColor }}>
          Sales Summary
        </h1>
        <hr />
        <Row className="g-3 py-3">
          <Col md={6}>
            <Card className="p-md-3 p-sm-2">
              <Chart
                type="line"
                datasetIdKey="id"
                title="Sales for 10 days"
                data={{
                  labels: months,
                  datasets: [
                    {
                      id: 1,
                      label: "Total Sales Amount",
                      data: totalSalesAmount,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  animation: true,
                  color: "#333",
                  backgroundColor: "#fff",
                  borderColor: goldColor,
                }}
              />
            </Card>
          </Col>
          <Col md={6}>
            <Card className="p-md-4 p-sm-2 ">
              <Chart
                type="bar"
                datasetIdKey="id"
                title="Sales"
                placeholder="Sales"
                data={{
                  labels: months,
                  datasets: [
                    {
                      id: 1,
                      animation: true,
                      xAxisID: "X",
                      yAxisID: "Y",
                      data: noOfItemsInMonth,
                      label: "Number Of Items Purchased",
                      backgroundColor: goldColor,
                      hoverBackgroundColor: "#333",
                    },
                  ],
                }}
              />
            </Card>
          </Col>
        </Row>
        <Row>
          <DashboardTable customers={last10Cust} />
        </Row>
      </div>
    </Container>
  );
}

Dashboard.propTypes = {};

export default Dashboard;
