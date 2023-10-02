const express = require("express");
require("dotenv").config();
const asyncHandler = require("express-async-handler");
const knex = require("../config/knex");
const bcrypt = require("bcryptjs");
const router = express.Router();
const jwt = require("jsonwebtoken");
const multer = require("multer");
const { token } = require("morgan");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/images");
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split(".")[1];
    cb(null, req?.body?.id + "." + ext);
  },
});

const upload = multer({ storage });
//@ GET users
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const data = await knex.select("*").from("user");
    res.json(data);
  })
);

//@ GET user by name:
router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const userToken = req.body.token;
    const test = await knex("user").select("*");
 

    // if (userToken) {
    //   try {
    //     const oldUser = jwt.verify(userToken, process.env.SECRET_TOKEN);
    //     return res.json(oldUser);
    //   } catch (error) {
    //     return res.status(404).json("Session time out.Please login again");
    //   }
    // }

    // const username = req.body.username;
    // const password = req.body.password;

    // const user = await knex("user").select("*").where("username", username);
    // if (user.length === 0) {
    //   return res.status(404).json("Username does not exit !!!");
    // }

    // const isTrue = bcrypt.compareSync(password, user[0].password);

    // if (!isTrue) {
    //   return res.status(404).json("Password is not correct !!!");
    // }
    // delete user[0].password;

    // const token = jwt.sign(user[0], process.env.SECRET_TOKEN, {
    //   expiresIn: 3 * 24 * 60 * 60,
    // });
    // user[0].token = token;
   
    res.json(test[0]);
  })
);

//@ Post users
router.post(
  "/",
  upload.single("avatar"),
  asyncHandler(async (req, res) => {
    //check if username exists
    const isUsernameExists = await knex("user")
      .select("*")
      .where("username", req.body.username);

    if (isUsernameExists.length > 0) {
      return res.status(404).json("Username already exist!!!");
    }
    const isEmailExists = await knex("user")
      .select("*")
      .where("email", req.body.email);

    if (isEmailExists.length > 0) {
      return res.status(404).json("Email already exist!!!");
    }
    //hash user password
    const pass = req.body.password;
    const hashedPassword = await bcrypt.hash(pass, 10);
    req.body.password = hashedPassword;

    // console.table(req.file);
    req.body.avatar = req?.file?.filename;

    const data = await knex("user").insert(req.body);
    if (data.length === 0) {
      return res.status(404).json("Error connecting to server.Try again later");
    }

    res.json(req.body);
  })
);
//@ PUT users
router.put(
  "/",
  asyncHandler(async (req, res) => {
    const updatedData = await knex("user")
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
    const deletedData = await knex("user").where("id", id).del();
    if (!deletedData === 1) {
      return res.status(404).json("Error connecting to server.Try again later");
    }
    res.json(deletedData);
  })
);

module.exports = router;
