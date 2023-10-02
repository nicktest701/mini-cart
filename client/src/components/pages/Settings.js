import React from 'react';
import { Breadcrumb, BreadcrumbItem, Container } from 'react-bootstrap';

function Settings(props) {
  return <Container className='p-4  ms-md-5'>

<h1 className="display-6">Settings</h1>
        <Breadcrumb className="mb-3">
          <BreadcrumbItem href="/">Dashboard</BreadcrumbItem>
          <BreadcrumbItem href="/products" active>
            Settings
          </BreadcrumbItem>
        </Breadcrumb>
        <hr />
  </Container>;
}

Settings.propTypes = {};

export default Settings;
