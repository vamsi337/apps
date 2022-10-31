const mongoose = require("mongoose");

var bookSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  author: {
    type: String,
    require: true,
  },
  pages: {
    type: Number,
    require: true,
  },
  publisher: {
    type: String,
    require: true,
  },
});
module.exports = mongoose.model("Book", bookSchema);
