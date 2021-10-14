// module.exports = app => {
//     const notes = require("../controller/note.controller.js");
  
//     var router = require("express").Router();
  
//     // Create a new Note
//     router.post("/new", notes.create);
  
//     // Retrieve all Notes
//     router.post("/all", notes.findAll);
  
//     // Retrieve a single Note with id
//     // router.get("/all/:id", notes.findOne);
  
//     app.use("/notes", router);
//   };