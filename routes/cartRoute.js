const express = require("express");
const asyncHandler = require("express-async-handler");
const knex = require("../config/knex");

const router = express.Router();

//@ GET carts
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const data = await knex.select("*").from("cart");
    res.json(data);
  })
);

// //@ GET carts by name:
// router.get(
//   "/:name",
//   asyncHandler(async (req, res) => {
//     const name = req.params.name;
//     const data = await knex("cart").select("*").where("name", name);
//     res.json(data);
//   })
// );

//@ GET customers by invoice:
router.get(
  "/:inv",
  asyncHandler(async (req, res) => {
    const inv = req.params.inv;
    const data = await knex("cart").select("*").where("invoiceNo", inv);
    res.json(data);
  })
);

//@ Post carts
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const data = await knex("cart").insert(req.body);
    if (data.length === 0) {
      return res
        .status(404)
        .json({ message: "Error connecting to server.Try again later" });
    }
    const products = req.body;
    products.forEach(async (product) => {
      await knex("product")
        .where({ id: product.id })
        .update({
          availableQuantity:
            Number(product.availableQuantity) - Number(product.quantity),
        });
    });

    res.json(req.body);
  })
);
//@ PUT carts
router.put(
  "/",
  asyncHandler(async (req, res) => {
    const updatedData = await knex("cart")
      .where("id", req.body.id)
      .update(req.body);
    if (!updatedData === 1) {
      return res.status(404).json("Error connecting to server.Try again later");
    }
    res.json(req.body);
  })
);

//@ Delete
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const deletedData = await knex("cart").where("id", id).del();
    if (!deletedData === 1) {
      return res.status(404).json("Error connecting to server.Try again later");
    }
    res.json(deletedData);
  })
);

module.exports = router;
