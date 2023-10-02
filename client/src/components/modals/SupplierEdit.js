import React, { useContext } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "react-query";
import { putSupplier } from "../../api";
import { ProductContext } from "../../context/products/ProductProvider";
import { IoPencilSharp } from "react-icons/io5";

function SupplierEdit({ data }) {
  const queryClient = useQueryClient();

  const { proState, proDispatch } = useContext(ProductContext);

  const initialValues = {
    id: data?.id,
    name: data?.name,
    telephone: data?.telephone,
    address: data?.address,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().trim().required("Required*"),
    telephone: Yup.number().required("Required*"),
    address: Yup.string().required("Required*"),
  });

  const { mutateAsync } = useMutation("suppliers", putSupplier);

  const onSubmit = (values, options) => {
    mutateAsync(values, {
      onSuccess: (data) => {
        options.setSubmitting(false);
        alert("Changes Saved");
        queryClient.setQueryData("suppliers",old=>{
          return [...old,data];
        });
        // options.resetForm();
        proDispatch({ type: "showSupplierEditModal", payload: false });
      },
      onError: (error) => alert(error?.message),
    });
  };

  return (
    <Modal
      show={proState.showSupplierEditModal}
      onHide={() =>
        proDispatch({ type: "showSupplierEditModal", payload: false })
      }
    >
      <Modal.Header>
        <Modal.Title>
          <IoPencilSharp /> Edit Supplier
        </Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize={true}
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
                <Form.Control
                  type="hidden"
                  name="id"
                  value={values.id}
                  onChange={handleChange("id")}
                />
                {/*  name */}
                <Form.Group className="pb-3" controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Supplier Name"
                    name="name"
                    value={values.name}
                    onChange={handleChange("name")}
                  />
                  {touched.name && errors.name ? (
                    <Form.Text className="text-danger">{errors.name}</Form.Text>
                  ) : null}
                </Form.Group>

                {/*  telephone */}
                <Form.Group className="pb-3" controlId="telephone">
                  <Form.Label>Telephone</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter telephone"
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

                {/*  address */}
                <Form.Group className="pb-3" controlId="address">
                  <Form.Label>address</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter address"
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
                  style={{ background: "#e2ad0e", borderColor: "#e2ad0e" }}
                  variant="dark"
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
                    "Save Changes"
                  )}
                </Button>
                <Button
                  variant="light"
                  onClick={() =>
                    proDispatch({
                      type: "showSupplierEditModal",
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

export default SupplierEdit;
