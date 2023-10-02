import {
  Breadcrumb,
  BreadcrumbItem,
  Card,
  Col,
  Container,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
  Stack,
} from "react-bootstrap";
import moment from "moment";
import { useQuery } from "react-query";
import SummaryTable from "../datatables/SummaryTable";
import { getAllCustomersByDate } from "../../api/customer/customerApi";
import { useEffect, useState } from "react";
import { CurrencyFormatter } from "../../config/CurrencyFormatter";

const SalesItem = ({ name, value }) => {
  return (
    <Stack direction="horizontal" className="d-flex justify-content-between">
      <Card.Text>{name}</Card.Text>
      <span>{value}</span>
    </Stack>
  );
};
const today = moment().format("YYYY-MM-DD");
function SalesSummary() {
  const [selectedDate, setSelectedDate] = useState({
    from: today,
    to: today,
  });

  const customer = useQuery(
    ["customers", selectedDate],
    () => getAllCustomersByDate(selectedDate),
    {
      enabled: !!selectedDate,
      onSuccess: (data) => {
        console.log(data);
      },
    }
  );
  const [customerCartInfo, setCustomerCartInfo] = useState({});

  const [overallCartInfo, setOverallCartInfo] = useState({
    noOfitems: 0,
    grossTotal: 0,
    discounts: 0,
    netTotal: 0,
  });

  useEffect(() => {
    if (customer.data) {
      const items = customer?.data
        .map((item) => item.noOfItems)
        .reduce((a, b) => +a + +b, 0);

      const gross = customer?.data
        .map((item) => item.grossTotal)
        .reduce((a, b) => +a + +b, 0);

      const discount = customer?.data
        .map((item) => item.discount)
        .reduce((a, b) => +a + +b, 0);

      const net = customer?.data
        .map((item) => item.netTotal)
        .reduce((a, b) => +a + +b, 0);

      setOverallCartInfo({
        noOfitems: items,
        grossTotal: gross,
        discounts: discount,
        netTotal: net,
      });
    }
  }, [customer.data]);

  return (
    <Container className="p-4  ms-md-5">
      <h1 className="display-6">Sales Summary</h1>
      <Breadcrumb className="mb-3">
        <BreadcrumbItem href="/">Dashboard</BreadcrumbItem>
        <BreadcrumbItem href="/products" active>
          Sales Summary
        </BreadcrumbItem>
      </Breadcrumb>
      <hr />

      <Row className="gap-3">
        <Col>
          <Stack gap={5}>
            <Card>
              <Card.Header className=" text-primary">
                <Card.Title>Total Sales</Card.Title>
              </Card.Header>
              <Card.Body>
                <SalesItem
                  name="Products Sold"
                  value={overallCartInfo.noOfitems}
                />
                <SalesItem name="Products Returned" value={0} />
                <SalesItem
                  name="Grand Total"
                  value={CurrencyFormatter(overallCartInfo.grossTotal)}
                />
                <SalesItem
                  name="Discount Allowed"
                  value={overallCartInfo.discounts}
                />
              </Card.Body>
              <Card.Footer className="d-flex text-primary">
                <Card.Title className="me-auto">Total</Card.Title>
                <Card.Title>
                  {CurrencyFormatter(overallCartInfo.netTotal)}
                </Card.Title>
              </Card.Footer>
            </Card>

            <Card>
              <Card.Header className=" text-primary">
                <Card.Title>Customer Sales Info</Card.Title>
              </Card.Header>
              <Card.Body>
                <SalesItem
                  name="No of Items"
                  value={customerCartInfo.noOfItems}
                />
                <SalesItem
                  name="Grand Total"
                  value={customerCartInfo.grossTotal}
                />
                <SalesItem name="Discount" value={customerCartInfo.discount} />
                {/* <SalesItem name="Net Total" value={customerCartInfo.netTotal} /> */}
                {/* <SalesItem name="No of Items" /> */}
              </Card.Body>
              <Card.Footer className="d-flex text-primary">
                <Card.Title className="me-auto">Total</Card.Title>
                <Card.Title>
                  {CurrencyFormatter(customerCartInfo.netTotal)}
                </Card.Title>
              </Card.Footer>
            </Card>
          </Stack>
        </Col>

        <Col>
          <Card>
            <Card.Header className=" text-primary">
              <Card.Title>Customer Details</Card.Title>
            </Card.Header>
            <Card.Body className="p-4">
              <Stack direction="horizontal" gap={5} className="pb-3">
                <FormGroup className="me-auto">
                  <FormLabel htmlFor="dateFrom">From</FormLabel>
                  <FormControl
                    type="date"
                    id="dateFrom"
                    size="sm"
                    placeholder="Date From"
                    defaultValue={selectedDate.from }
                   
                    onChange={(e) =>
                      setSelectedDate({
                        ...selectedDate,
                        from: e.currentTarget.value,
                      })
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel htmlFor="dateTo">To</FormLabel>
                  <FormControl
                    type="date"
                    id="dateTo"
                    size="sm"
                    placeholder="Date To"
                    value={selectedDate.to }
                   
                    onChange={(e) =>
                      setSelectedDate({
                        ...selectedDate,
                        to: e.currentTarget.value,
                      })
                    }
                  />
                </FormGroup>
              </Stack>
              <SummaryTable
                customer={customer}
                setCustomerCartInfo={setCustomerCartInfo}
              />
            </Card.Body>
            <Card.Footer className="text-primary">
              <Card.Title>Total</Card.Title>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

SalesSummary.propTypes = {};

export default SalesSummary;
