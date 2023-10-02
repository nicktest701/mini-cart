const express = require("express");
const asyncHandler = require("express-async-handler");
const knex = require("../config/knex");

const router = express.Router();

//@ GET Suppliers
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const data = await knex.select("*").from("supplier");

    res.json(data);
  })
);

//@ GET Suppliers by name:
router.get(
  "/:name",
  asyncHandler(async (req, res) => {
    const name = req.params.name;
    const data = await knex("supplier").select("*").where("name", name);
    res.json(data);
  })
);

//@ Post Suppliers
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const data = await knex("supplier").insert(req.body);
    if (data.length === 0) {
      return res
        .status(404)
        .json({ message: "Error connecting to server.Try again later" });
    }
    req.body.id = data[0];
    res.json(req.body);
  })
);
//@ PUT Suppliers
router.put(
  "/",
  asyncHandler(async (req, res) => {
    const data = await knex("supplier")
      .where("id", req.body.id)
      .update(req.body);
    if (!data === 1) {
      return res
        .status(404)
        .json({ message: "Error connecting to server.Try again later" });
    }

    res.json(req.body);
  })
);

//@ Delete
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const deletedData = await knex("supplier").where("id", id).del();
    if (!deletedData === 1) {
      return res.status(404).json("Error connecting to server.Try again later");
    }
    res.json(deletedData);
  })
);

module.exports = router;
