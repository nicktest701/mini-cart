import React, { useContext } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getAllSuppliers, putProduct } from "../../api";
import { ProductContext } from "../../context/products/ProductProvider";

function ProductEdit({ data }) {
  const queryClient = useQueryClient();

  const { proState, proDispatch } = useContext(ProductContext);
  const suppData = useQuery("suppliers", getAllSuppliers);
  const initialValues = {
    id: data?.id,
    name: data?.name,
    price: data?.price,
    quantity: data?.quantity,
    supplier: data?.supplier,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required*"),
    price: Yup.number()
      .required("Required*")
      .min(0, "invalid price")
      .positive("Invalid number")
      .integer("Invalid"),

    quantity: Yup.number()
      .required("Required*")
      .min(0, "invalid price")
      .integer("Invalid"),
    supplier: Yup.string().required("Required*"),
  });

  const { mutateAsync } = useMutation("products", putProduct, {
    onMutate: (updatedProduct) => {
      const oldProducts = queryClient.getQueryData("products");
      queryClient.setQueryData("products", (oldProducts) => [
        ...oldProducts,
        updatedProduct,
      ]);

      return oldProducts;
    },
    onSettled: () => {
      queryClient.invalidateQueries("products");
    },
  });

  const onSubmit = (values, options) => {
    mutateAsync(values, {
      onSuccess: () => {
        options.setSubmitting(false);
        alert("Changes Saved");
        // options.resetForm();
        proDispatch({ type: "showProductEditModal", payload: false });
      },
    });
  };

  return (
    <Modal
      // animation={false}
      show={proState.showProductEditModal}
      onHide={() =>
        proDispatch({ type: "showProductEditModal", payload: false })
      }
    >
      <Modal.Header>
        <Modal.Title>Edit Product</Modal.Title>
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
                {/* Product name */}
                <Form.Group className="pb-3" controlId="productName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter product name"
                    name="name"
                    value={values.name}
                    onChange={handleChange("name")}
                  />
                  {touched.name && errors.name ? (
                    <Form.Text className="text-danger">{errors.name}</Form.Text>
                  ) : null}
                </Form.Group>

                {/* Product price */}
                <Form.Group className="pb-3" controlId="productPrice">
                  <Form.Label>Price (GH¢)</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter price"
                    name="price"
                    value={values.price}
                    onChange={handleChange("price")}
                    onError={(e) => alert(e)}
                  />
                  {touched.price && errors.price ? (
                    <Form.Text className="text-danger">
                      {errors.price}
                    </Form.Text>
                  ) : null}
                </Form.Group>

                {/* Product quantity */}
                <Form.Group className="pb-3" controlId="productName">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter quantity"
                    name="quantity"
                    value={values.quantity}
                    onChange={handleChange("quantity")}
                  />
                  {touched.quantity && errors.quantity ? (
                    <Form.Text className="text-danger">
                      {errors.quantity}
                    </Form.Text>
                  ) : null}
                </Form.Group>

                <Form.Group
                  className="pb-3"
                  controlId="exampleForm.ControlSelect1"
                >
                  <Form.Label>Suppliers</Form.Label>
                  <Form.Control
                    as="select"
                    value={values.supplier}
                    onChange={handleChange("supplier")}
                  >
                    <option>Select supplier...</option>
                    {suppData?.data?.map((item, index) => {
                      return (
                        <option key={index + 1} value={item.name}>
                          {item.name}
                        </option>
                      );
                    })}
                  </Form.Control>
                  {touched.supplier && errors.supplier ? (
                    <Form.Text className="text-danger">
                      {errors.supplier}
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
                      type: "showProductEditModal",
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

export default ProductEdit;
