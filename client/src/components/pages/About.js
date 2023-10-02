import React from "react";
import { Breadcrumb, BreadcrumbItem, Container } from "react-bootstrap";

function About() {
  return (
    <Container className="p-4">
      <h1 className="display-6">About</h1>
      <Breadcrumb className="mb-3">
        <BreadcrumbItem href="/">Dashboard</BreadcrumbItem>
        <BreadcrumbItem href="/products" active>
          About
        </BreadcrumbItem>
      </Breadcrumb>
      <hr />
    </Container>
  );
}

export default About;
