import React, { useState } from "react";
import { Alert, Button, Card, Container, Form, Stack } from "react-bootstrap";
import { Formik } from "formik";
import { object, string, ref, boolean } from "yup";
import { v4 as uuid } from "uuid";
import { useMutation } from "react-query";
import { postUser } from "../../api/user/userApi";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [err, setErr] = useState({
    visible: false,
    variant: "light",
    msg: "",
  });
  const initialValues = {
    id: uuid(),
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    accept: false,
  };

  const validationSchema = object().shape({
    firstname: string().required("Required*"),
    lastname: string().required("Required*"),
    username: string().required("Required*"),
    email: string().required("Required*").email("Invalid Email Address"),
    password: string()
      .required("Required*")
      .min(6, "Password should be 6-30 characters long!"),
    confirmPassword: string()
      .required("Required*")
      .oneOf([ref("password"), null], "Passwords do not match!"),
    accept: boolean().oneOf([true], "Please Accept Terms & Conditions !!!"),
  });

  const { mutateAsync } = useMutation("users", postUser);

  const onSubmit = (values, options) => {
    console.table(values);

    options.setSubmitting(true);

    mutateAsync(values, {
      onSuccess: (data) => {
        options.resetForm();

        navigate("/user/login", {
          replace: true,
          state: {
            msg: "Registration Successful!!!",
            variant: "success",
          },
        });
      },
      onError: (error) => {
        setErr({
          visible: true,
          variant: "danger",
          msg: error.message,
        });
      },
      onSettled: () => {
        options.setSubmitting(false);
      },
    });
  };

  return (
    <Container className="w-100 h-100 d-flex justify-content-center align-items-center p-4">
      <Card className="w-75">
        <Card.Header>
          <Card.Title>Register</Card.Title>
        </Card.Header>
        <Card.Body className="p-3">
          {err.visible && (
            <Alert className="border-0 rounded-0" variant={err.variant}>
              {err.msg}
            </Alert>
          )}
          <Form autoComplete="off">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({
                isSubmitting,
                handleBlur,
                handleChange,
                handleSubmit,
                touched,
                errors,
                values,
              }) => (
                <Stack gap={2}>
                  <Form.Group controlId="firstname">
                    <Form.Label>Firstname </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter firstname"
                      value={values.firstname}
                      onBlur={handleBlur("firstname")}
                      onChange={handleChange("firstname")}
                      style={{}}
                    />
                    <Form.Text className="text-danger">
                      {touched.firstname && errors.firstname
                        ? errors.firstname
                        : ""}
                    </Form.Text>
                  </Form.Group>
                  <Form.Group controlId="lastname">
                    <Form.Label>Lastname </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter lastname"
                      value={values.lastname}
                      onBlur={handleBlur("lastname")}
                      onChange={handleChange("lastname")}
                    />
                    <Form.Text className="text-danger">
                      {touched.lastname && errors.lastname
                        ? errors.lastname
                        : ""}
                    </Form.Text>
                  </Form.Group>
                  <Form.Group controlId="username">
                    <Form.Label>Username </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter username"
                      value={values.username}
                      onBlur={handleBlur("username")}
                      onChange={handleChange("username")}
                    />
                    <Form.Text className="text-danger">
                      {touched.username && errors.username
                        ? errors.username
                        : ""}
                    </Form.Text>
                  </Form.Group>
                  <Form.Group controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={values.email}
                      onBlur={handleBlur("email")}
                      onChange={handleChange("email")}
                    />
                    <Form.Text className="text-danger">
                      {touched.email && errors.email ? errors.email : ""}
                    </Form.Text>
                  </Form.Group>
                  <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={values.password}
                      onBlur={handleBlur("password")}
                      onChange={handleChange("password")}
                    />
                    <Form.Text className="text-danger">
                      {touched.password && errors.password
                        ? errors.password
                        : ""}
                    </Form.Text>
                  </Form.Group>
                  <Form.Group controlId="confirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Confirm Password"
                      value={values.confirmPassword}
                      onBlur={handleBlur("confirmPassword")}
                      onChange={handleChange("confirmPassword")}
                    />
                    <Form.Text className="text-danger">
                      {touched.confirmPassword && errors.confirmPassword
                        ? errors.confirmPassword
                        : ""}
                    </Form.Text>
                  </Form.Group>

                  <Form.Group controlId="remember">
                    <Form.Check
                      type="checkbox"
                      label="Accept Terms & Conditions"
                      value={values.accept}
                      onBlur={handleBlur("accept")}
                      onChange={handleChange("accept")}
                    />
                    <Form.Text className="text-danger">
                      {touched.accept && errors.accept ? errors.accept : ""}
                    </Form.Text>
                  </Form.Group>
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    {isSubmitting ? "Please Wait..." : "  Sign Up"}
                  </Button>
                </Stack>
              )}
            </Formik>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Register;
