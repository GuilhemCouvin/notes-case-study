const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    id: { type: String, unique: true },
    title: { type: String, default: null },
    content: { type: String, default: null },
    author: { type: String, default: null },
});

module.exports = mongoose.model("note", noteSchema);