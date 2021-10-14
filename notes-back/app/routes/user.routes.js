module.exports = app => {
  const users = require("../controller/user.controller.js");

  var router = require("express").Router();

  // Create a new User
  router.post("/signup", users.create);

  // Retrieve all Users
  router.post("/login", users.findAll);

  // Retrieve a single User with id
  // router.get("/login/:email", users.findOne);

  app.use("/users", router);
};