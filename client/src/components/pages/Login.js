import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Form, Stack, Alert, Spinner } from "react-bootstrap";
import { Formik } from "formik";
import { object, string } from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { getUser } from "../../api/user/userApi";
import cookie from "cookiejs";
import { IoCart } from "react-icons/io5";
import { ProductContext } from "../../context/products/ProductProvider";

function Login() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const {  proDispatch } = useContext(ProductContext);

  const [alertErr, setAlertErr] = useState({
    msg: "",
    variant: "light",
  });

  useEffect(() => {
    if (state) {
      setAlertErr({
        msg: state.msg,
        variant: state.variant,
      });
    }
  }, [state]);

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = object().shape({
    username: string().required("Required*"),
    password: string()
      .required("Required*")
      .min(6, "Password should be 6-30 characters long!"),
  });

  const { mutateAsync } = useMutation("users", getUser);

  const onSubmit = (values, options) => {
    options.setSubmitting(true);
    mutateAsync(values, {
      onSuccess: async (data) => {
        proDispatch({ type: "userLogin", payload: data });
        cookie.set("jwt", data.token, {
          path: "/",
          expires: 3 * 24 * 60 * 60 * 1000,
        });

        navigate("/", { replace: true });
      },
      onError: (error) => {
        setAlertErr({
          msg: error.message,
          variant: "danger",
        });
      },
      onSettled: () => {
        options.setSubmitting(false);
      },
    });
  };


  return (
    <div
      className=" d-flex flex-column justify-content-center align-items-center  p-4 bg-primary"
      style={{ width: "100%", height: "100vh" }}
    >
      <div className="text-center">
        <IoCart size={50} color="#fff" />
        <p className="fs-2 text-white"> Mini Cart</p>
      </div>
      <Card style={{ width: "370px", maxWidth: "400px" }} className="shadow">
        <Card.Body className="px-4 py-4">
          <Card.Title className="mb-4 fs-3">Login</Card.Title>

          {alertErr.msg && (
            <Alert className="border-0 rounded-0" variant={alertErr.variant}>
              {alertErr.msg}
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
                <Stack gap={3}>
                  <Form.Group controlId="username">
                    <Form.Label>Username </Form.Label>
                    <Form.Control
                      type="username"
                      placeholder="Enter Username"
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

                  <Form.Group controlId="remember">
                    <Form.Check type="checkbox" label="Remember Me" />
                  </Form.Group>
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={isSubmitting}
                    className="rounded-0"
                    onClick={handleSubmit}
                  >
                    {/* {isSubmitting ? "Please Wait" : "Login"} */}
                    {isSubmitting ? (
                      <Spinner animation="border" size="sm" />
                    ) : (
                      "Login"
                    )}
                  </Button>
                  <div className="d-flex justify-content-end">
                    <a href="#/">Forgot your password?</a>
                  </div>
                </Stack>
              )}
            </Formik>
          </Form>
        </Card.Body>
      </Card>

      <div className="text-white mt-4">&copy; 2022 Frebbytech.com</div>
    </div>
  );
}

export default Login;
