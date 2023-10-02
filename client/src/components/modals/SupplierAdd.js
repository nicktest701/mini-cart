import React, { useContext } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { v4 as uuid } from "uuid";
import { useMutation, useQueryClient } from "react-query";
import { postSupplier } from "../../api";
import { ProductContext } from "../../context/products/ProductProvider";
import { IoAddSharp } from "react-icons/io5";
import Swal from "sweetalert2";

function SupplierAdd() {
  const queryClient = useQueryClient();

  const { proState, proDispatch } = useContext(ProductContext);

  const initialValues = {
    id: uuid(),
    name: "",
    address: "",
    telephone: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().trim().required("Required*"),
    telephone: Yup.number().required("Required*"),
    // .matches(/^(\+\d{3})?(\d{10})$/, "Invalid Telephone number"),

    address: Yup.string().trim().required("Required*"),
  });

  const { mutate } = useMutation("suppliers", postSupplier, {
    onMutate: (newSupplier) => {
      queryClient.cancelQueries("suppliers");
      const oldSuppliers = queryClient.getQueryData("suppliers");
      queryClient.setQueryData("suppliers", (old) => [...old, newSupplier]);
      return oldSuppliers;
    },
    onError: (_error, _data, context) => {
      Swal.fire({
        title: "Error",
        text: "Erroring adding user details",
        icon: "error",
        confirmButtonColor: "#E2AD0E",
      });
      queryClient.setQueryData("suppliers", context.oldSuppliers);
    },
    onSettled: () => {
      queryClient.invalidateQueries("suppliers");
    },
  });

  const onSubmit = (values, options) => {
    mutate(values, {
      onSuccess: () => {
        options.setSubmitting(false);
        Swal.fire({
          title: "Saved",
          text: "Supplier Saved",
          icon: "success",
          confirmButtonColor: "#E2AD0E",
          didClose: () =>options.resetForm()
            
        });
      },
    });
  };

  return (
    <Modal
      fullscreen="true"
      show={proState.showSupplierAddModal}
      onHide={() =>
        proDispatch({ type: "showSupplierAddModal", payload: false })
      }
    >
      <Modal.Header>
        <Modal.Title>
          <IoAddSharp />
          Add Supplier
        </Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({
          handleChange,
          handleSubmit,
          errors,
          isSubmitting,
          touched,
          values,
        }) => {
          return (
            <Form className="py-4">
              <Modal.Body className="p-4">
                {/* Supplier name */}
                <Form.Group className="pb-3" controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Supplier"
                    name="name"
                    value={values.name}
                    onChange={handleChange("name")}
                  />
                  {touched.name && errors.name ? (
                    <Form.Text className="text-danger">{errors.name}</Form.Text>
                  ) : null}
                </Form.Group>

                {/* Supplier telephone */}
                <Form.Group className="pb-3" controlId="telephone">
                  <Form.Label>Telephone</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Telephone Number"
                    name="telephone"
                    value={values.telephone}
                    onChange={handleChange("telephone")}
                    onError={(e) => alert(e)}
                  />
                  {touched.telephone && errors.telephone ? (
                    <Form.Text className="text-danger">
                      {errors.telephone}
                    </Form.Text>
                  ) : null}
                </Form.Group>

                {/* Supplier address */}
                <Form.Group className="pb-3" controlId="address">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter Address"
                    name="address"
                    value={values.address}
                    onChange={handleChange("address")}
                  />
                  {touched.address && errors.address ? (
                    <Form.Text className="text-danger">
                      {errors.address}
                    </Form.Text>
                  ) : null}
                </Form.Group>
              </Modal.Body>

              <Modal.Footer>
                <Button
                  variant="primary"
                  type="submit"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span>Please Wait... </span>
                      <span className="spinner-border spinner-border-sm"></span>
                    </>
                  ) : (
                    "Add"
                  )}
                </Button>
                <Button
                  variant="light"
                  onClick={() =>
                    proDispatch({
                      type: "showSupplierAddModal",
                      payload: false,
                    })
                  }
                >
                  Cancel
                </Button>
              </Modal.Footer>
            </Form>
          );
        }}
      </Formik>
    </Modal>
  );
}

export default SupplierAdd;
