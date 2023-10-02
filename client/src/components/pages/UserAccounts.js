import React, { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Card,
  Container,
} from "react-bootstrap";
import UserAccountTable from "../datatables/UserAccountTable";
import { IoAdd } from "react-icons/io5";
import UserAdd from "../modals/UserAdd";

function UserAccounts() {
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <>
      <Container className="p-4  ms-md-5">
        <h1 className="display-6 ">Users Account</h1>

        <Breadcrumb className="mb-5">
          <BreadcrumbItem href="/">Dashboard</BreadcrumbItem>
          <BreadcrumbItem href="/accounts" active>
            Account
          </BreadcrumbItem>
        </Breadcrumb>

        <Card>
          <Card.Header>
            <Card.Title></Card.Title>
            <Button onClick={() => setShowAddModal(true)}>
              <IoAdd color="inherit" /> Add User
            </Button>
          </Card.Header>
          <Card.Body>
            <UserAccountTable />
          </Card.Body>
        </Card>
      </Container>
      <UserAdd show={showAddModal} setShow={setShowAddModal} />
    </>
  );
}

export default UserAccounts;
