const express = require("express");
const asyncHandler = require("express-async-handler");
const knex = require("../config/knex");
const protect = require("../middlewares/authMiddleware");

const router = express.Router();

//@ GET Products
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const data = await knex.select("*").from("product");
    // console.log(data)
    res.json(data);
  })
);

//@ GET Products by name:
router.get(
  "/:name",
  asyncHandler(async (req, res) => {
    const name = req.params.name;
    const data = await knex("product").select("*").where("name", name);
    res.json(data);
  })
);

//@ Post Products
router.post(
  "/",
  // protect,
  asyncHandler(async (req, res) => {
    const data = await knex("product").insert(req.body);
    if (data.length === 0) {
      return res.status(404).json("Error connecting to server.Try again later");
    }
    res.json(req.body);
  })
);
//@ PUT Products
router.put(
  "/",
  asyncHandler(async (req, res) => {
    const updatedData = await knex("product")
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
    const deletedData = await knex("product").where("id", id).del();
    if (!deletedData === 1) {
      return res.status(404).json("Error connecting to server.Try again later");
    }
    res.json(deletedData);
  })
);

module.exports = router;
