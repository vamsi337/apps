const express = require("express");
const mongoose = require("mongoose");
const Customer = require("./CustomerModel");
const bodyParser = require("body-parser");

mongoose.connect("mongodb://localhost:27017/customerDB", () => {
  console.log("DB Connected");
});

var app = express();

app.use(bodyParser.json());

app.get("/customers", (req, res) => {
  Customer.find()
    .then((customers) => {
      res.json(customers);
    })
    .catch((err) => {
      if (err) throw err;
    });
});

app.get("/customer/:id", (req, res) => {
  Customer.findById(req.params.id)
    .then((customer) => {
      if (customer) res.json(customer);
      else res.send("Invalid Id");
    })
    .catch((err) => {
      if (err) throw err;
    });
});

app.post("/customer", (req, res) => {
  var newCustomer = {
    name: req.body.name,
    age: req.body.age,
    address: req.body.address,
  };
  var customer = new Customer(newCustomer);
  customer
    .save()
    .then(() => {
      res.send("Data created");
    })
    .catch((err) => {
      if (err) throw err;
    });
});

app.delete("/customer/:id", (req, res) => {
  Customer.findByIdAndRemove(req.params.id)
    .then((customer) => {
      res.send("Customer deleted");
    })
    .catch((err) => {
      if (err) throw err;
    });
});
app.listen(5555, () => {
  console.log("Port running on 5555");
});
