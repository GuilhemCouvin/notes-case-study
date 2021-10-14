const db = require("../models");
const User = db.users;

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.fields.email) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  if (!req.fields.password) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a User
  const user = new User({
    email: req.fields.email,
    password: req.fields.password,
  });

  console.log(user);

  // Save User in the database
  user
    .save(user)
    .then(data => {
      res.send(data);
      console.log("OK: New User saved in database !")
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });
};

// Retrieve User by email from the database.
exports.findAll = (req, res) => {
  const email = req.fields.email;
  const pwd   = req.fields.password;
  console.log("Retrieve User by Email !");
  
  if(email !== undefined) {
    console.log("email: "+email);
    var condition = email ? { email: { $regex: new RegExp(email), $options: "i" } } : {};
  } else {
    console.log("Error: Empty request !");
  }

  User.find(condition)
    .then((data) => {
      if(pwd === data[0].password) {
        console.log("Valid password");
        res.status(200).send(data[0]);
      } else {
        res.status(403).send({
          error: "Invalid password"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};

// Find a single User with an id
// exports.findOne = (req, res) => {
//   const id = req.query.id;

//   User.findById(id)
//     .then(data => {
//       if (!data)
//         res.status(404).send({ message: "Not found User with id " + id });
//       else res.send(data);
//     })
//     .catch(err => {
//       res
//         .status(500)
//         .send({ message: "Error retrieving User with id=" + id });
//     });
// };
