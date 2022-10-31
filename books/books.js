const express = require("express");
const mongoose = require("mongoose");
const Book = require("./bookModel");
const bodyParser = require("body-parser");
const auth= require()

const app = express();

app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/bookDB", () => {
  console.log("Database connected");
});

app.get("/", function (req, res) {
  res.send("Hi");
});

app.get("/books", auth, (req, res) => {
  Book.find()
    .then((books) => {
      res.json(books);
    })
    .catch((err) => {
      if (err) throw err;
    });
});

app.get("/book/:id", auth, (req, res) => {
  Book.findById(req.params.id)
    .then((book) => {
      if (book) {
        res.json(book);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      if (err) throw err;
    });
});

app.post("/book", auth, function (req, res) {
  var newBook = {
    title: req.body.title,
    author: req.body.author,
    pages: req.body.pages,
    publisher: req.body.publisher,
  };

  var book = new Book(newBook);

  book
    .save()
    .then(() => {
      console.log("New book created");
    })
    .catch((err) => {
      if (err) throw err;
    });

  res.send("New book created");
});

app.delete("/book/:id", auth, (req, res) => {
  Book.findByIdAndRemove(req.params.id)
    .then(() => {
      res.send("Book deleted");
    })
    .catch((err) => {
      if (err) throw err;
    });
});

app.listen(7000, function () {
  console.log("Running");
});
