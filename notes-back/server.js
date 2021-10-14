// const express = require('express');
// const cors = require('cors')
// const app = express();

// app.use(cors());
// var data = "";
// app.use('/login', (req, res) => {
//   res.send({
//     token: 'test123'
//   });
// });

// app.listen(8080, () => console.log('API is running on http://localhost:8080/login'));


// New Files
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const formidable = require('express-formidable');

const app = express();

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));
app.use(formidable());
// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Notes application." });
});

require("./app/routes/user.routes.js")(app);
// require("./app/routes/note.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// connect to database
const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });