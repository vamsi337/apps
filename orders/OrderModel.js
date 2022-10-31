const mongoose = require("mongoose");
var orderSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.SchemaTypes.ObjectId,
    require: true,
  },
  bookId: {
    type: mongoose.SchemaTypes.ObjectId,
    require: true,
  },
  intialDate: {
    type: Date,
    require: true,
  },
  deliveryDate: {
    type: Date,
    require: true,
  },
});

module.exports = mongoose.model("Order", orderSchema);
