import React, { Suspense } from "react";
import { Breadcrumb, BreadcrumbItem, Container } from "react-bootstrap";
import Helmet from "react-helmet";
import Loading from "../modals/Loading";
import SupplierAdd from "../modals/SupplierAdd";

const SupplierTable = React.lazy(() => import("../datatables/SupplierTable"));
function Suppliers() {
  return (
    <>
      <Helmet>
        <title>Mini Cart | Suppliers</title>
      </Helmet>
      <Container className="supplier-container p-4  ms-md-5">
        <h1 className="display-6">Suppliers</h1>
        <Breadcrumb className="mb-3">
          <BreadcrumbItem href="/">Dashboard</BreadcrumbItem>
          <BreadcrumbItem href="/suppliers" active>
            Suppliers
          </BreadcrumbItem>
        </Breadcrumb>
        <hr />
        <Suspense fallback={<Loading />}>
          <SupplierTable />
        </Suspense>
        <SupplierAdd />
      </Container>
    </>
  );
}

export default Suppliers;
