import React, { Suspense } from "react";
import { Breadcrumb, BreadcrumbItem, Container } from "react-bootstrap";
import Loading from "../modals/Loading";
import ProductAdd from "../modals/ProductAdd";

const ProductTables = React.lazy(() => import("../datatables/ProductTables"));
function Products() {
  return (
    <>
      <Container className="p-4  ms-md-5">
        <h1 className="display-6">Products</h1>
        <Breadcrumb className="mb-3">
          <BreadcrumbItem href="/">Dashboard</BreadcrumbItem>
          <BreadcrumbItem href="/products" active>
            Products
          </BreadcrumbItem>
        </Breadcrumb>
        <hr />
        <ProductAdd />
        <Suspense fallback={<Loading />}>
          <ProductTables />
        </Suspense>
      </Container>
    </>
  );
}

export default React.memo(Products);
