import React, { useState } from "react";
import {
  Button,
  Col,
  Form,
  Image,
  Modal,
  Row,
  Stack,
} from "react-bootstrap";
import { Formik } from "formik";
import { object, string, ref, boolean } from "yup";
import { v4 as uuid } from "uuid";
import { useMutation, useQueryClient } from "react-query";
import { postUser } from "../../api/user/userApi";
import Swal from "sweetalert2";
import { IoCamera } from "react-icons/io5";

function UserAdd({ show, setShow }) {
  const queryClient = useQueryClient();

  const [avatar, setAvatar] = useState(null);
  const initialValues = {
    id: uuid(),
    image: null,
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
    values.image = avatar;
    console.table(values);

    options.setSubmitting(true);

    mutateAsync(values, {
      onSuccess: () => {
        Swal.fire({
          title: "Saved",
          text: "User added",
          icon: "success",
          confirmButtonColor: "#E2AD0E",
          didClose: () => {
            options.resetForm();
            setAvatar(null);
          },
        });
      },
      onError: (error) => {
        Swal.fire({
          title: "Error",
          text: "Error adding user details",
          icon: "error",
          confirmButtonColor: "#E2AD0E",
        });
      },
      onSettled: () => {
        options.setSubmitting(false);
        queryClient.invalidateQueries("users");
      },
    });
  };

  return (
    <Modal
      className="p-5"
      show={show}
      onHide={() => setShow(false)}
      //   backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title>Register</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-4">
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
                <Stack gap={4} className="mx-auto">
                  <Image
                    src={avatar ? URL.createObjectURL(avatar) : null}
                    width={100}
                    height={100}
                    className="img shadow rounded-circle "
                  />
                  <Form.Group>
                    <Form.Label
                      htmlFor="avatar"
                      className="text-white bg-primary mx-auto px-2 py-1 rounded-1 shadow d-flex align-items-center "
                    >
                      <IoCamera size={24} className="me-1" />
                      <span> Upload Photo</span>
                    </Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/png,image/jpeg,image/jpg"
                      id="avatar"
                      hidden
                      onChange={(e) => setAvatar(e.currentTarget.files[0])}
                    />
                  </Form.Group>
                </Stack>

                <Row>
                  <Col>
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
                  </Col>
                  <Col>
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
                  </Col>
                </Row>

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
                    {touched.username && errors.username ? errors.username : ""}
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
                <Row>
                  <Col>
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
                  </Col>
                  <Col>
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
                  </Col>
                </Row>

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
                <Button variant="primary" type="submit" onClick={handleSubmit}>
                  {isSubmitting ? "Please Wait..." : "  Register"}
                </Button>
              </Stack>
            )}
          </Formik>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default UserAdd;
