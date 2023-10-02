import React, { useContext } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Formik } from "formik";
import { v4 as uuid } from "uuid";
import * as Yup from "yup";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getAllSuppliers, postProduct } from "../../api";
import { ProductContext } from "../../context/products/ProductProvider";
import Swal from "sweetalert2";

function ProductAdd() {
  const { proState, proDispatch } = useContext(ProductContext);

  const queryClient = useQueryClient();
  const suppData = useQuery("suppliers", getAllSuppliers);

  const initialValues = {
    id: uuid(),
    name: "",
    price: "",
    quantity: "",
    supplier: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required*"),
    price: Yup.number()
      .required("Required*")
      .min(0, "invalid price")
      .positive("Invalid number"),
    quantity: Yup.number()
      .required("Required*")
      .min(0, "invalid price")
      .integer("Invalid"),
    supplier: Yup.string().required("Required*"),
  });

  const { mutateAsync } = useMutation("products", postProduct, {
    onMutate: async (newProduct) => {
      await queryClient.cancelQueries("products");
      const oldProducts = queryClient.getQueryData("products");
      queryClient.setQueryData("products", (oldProducts) => [
        ...oldProducts,
        newProduct,
      ]);

      return oldProducts;
    },
    onSettled: () => {
      queryClient.invalidateQueries("products");
    },
    onError: (error, _vars, context) => {
      queryClient.setQueryData("products", context.oldProducts);
      Swal.fire({
        title: "Saved",
        text: "Error Adding Products",
        icon: "error",
        confirmButtonColor: "#E2AD0E",
      });
      // if (error.message === "Forbidden") {
      //   navigate("/user/login", {
      //     replace: true,
      //     state: {
      //       msg: "Your current session has expired",
      //       variant: "danger",
      //     },
      //   });
      // }
    },
  });

  const onSubmit = (values, options) => {
    mutateAsync(values, {
      onSuccess: () => {
        options.setSubmitting(false);
        Swal.fire({
          title: "Saved",
          text: "Product Saved",
          icon: "success",
          confirmButtonColor: "#E2AD0E",
          didClose: () => options.resetForm(),
        });
      },
    });
  };

  return (
    <Modal
      animation={false}
      show={proState.showProductModal}
      onHide={() => proDispatch({ type: "showProductModal", payload: false })}
    >
      <Modal.Header>
        <Modal.Title>Add Product</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize
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
                  />
                  {touched.price && errors.price ? (
                    <Form.Text className="text-danger">
                      {errors.price}
                    </Form.Text>
                  ) : null}
                </Form.Group>

                {/* Product quantity */}
                <Form.Group className="pb-3" controlId="productQuantity">
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

                <Form.Group className="pb-3" controlId="productSupplier">
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
                    proDispatch({ type: "showProductModal", payload: false })
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

export default React.memo(ProductAdd);
