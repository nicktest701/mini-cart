const express = require("express");
const asyncHandler = require("express-async-handler");
const knex = require("../config/knex");

const router = express.Router();

//@ GET customers
router.get(
  "/",
  asyncHandler(async (req, res) => {
    if (req.query.from) {
      const from = req.query.from;
      const to = req.query.to;
      const data = await knex
        .select("*")
        .from("customer")
        .whereBetween("purchasedDate", [from, to]);
      // .join("cart","customer.invoiceNo", "cart.invoiceNo");
      return res.json(data);
    }
    const data = await knex.select("*").from("customer");

    res.json(data);
  })
);

//@ GET customers by name:
router.get(
  "/:name",
  asyncHandler(async (req, res) => {
    const name = req.params.name;
    const data = await knex("customer").select("*").where("customer", name);
    res.json(data);
  })
);

//@ Post customers
router.post(
  "/",
  asyncHandler(async (req, res) => {
    console.log(req.body);
    const data = await knex("customer").insert(req.body);
    if (data.length === 0) {
      return res
        .status(404)
        .json({ message: "Error connecting to server.Try again later" });
    }

    req.body.id = data[0];
    console.log("req body is", data);
    res.json(req.body);
  })
);
//@ PUT customers
router.put(
  "/",
  asyncHandler(async (req, res) => {
    const updatedData = await knex("customer")
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
    const deletedData = await knex("customer").where("id", id).del();
    if (!deletedData === 1) {
      return res.status(404).json("Error connecting to server.Try again later");
    }
    res.json(deletedData);
  })
);

module.exports = router;
