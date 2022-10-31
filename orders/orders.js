const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Order = require("./OrderModel");
const axios = require("axios");
const app = express();

mongoose.connect("mongodb://localhost:27017/orderDB", () => {
  console.log("DB Connected");
});

app.use(bodyParser.json());

app.get("/orders", (req, res) => {
  Order.find()
    .then((orders) => {
      res.json(orders);
    })
    .catch((err) => {
      if (err) throw err;
    });
});

app.get("/order/:id", (req, res) => {
  Order.findById(req.params.id).then((order) => {
    if (order)
      axios
        .get("http://localhost:5555/customer/" + order.customerId)
        .then((response) => {
          var orderObject = { customerName: response.data.name, bookTitle: "" };

          axios
            .get("http://localhost:7000/book/" + order.bookId)
            .then((response) => {
              orderObject.bookTitle = response.data.title;
              res.json(orderObject);
            });
        });
    else res.send("Invalid order");
  });
});

app.post("/order", (req, res) => {
  var newOrder = {
    customerId: mongoose.Types.ObjectId(req.body.customerId),
    bookId: mongoose.Types.ObjectId(req.body.bookId),
    intialDate: req.body.intialDate,
    deliveryDate: req.body.deliveryDate,
  };

  var order = new Order(newOrder);

  order
    .save()
    .then(() => {
      res.send("Order created");
    })
    .catch((err) => {
      if (err) throw err;
    });
});

app.listen(7500, () => {
  console.log("Running on 7500");
});
