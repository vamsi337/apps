const mongoose = require("mongoose");

var customerSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  age: {
    type: Number,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Customer", customerSchema);
