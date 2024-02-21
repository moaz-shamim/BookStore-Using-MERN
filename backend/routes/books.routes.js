import express from "express";
import { Book } from "../models/books.model.js";

const router = express.Router();

// Route to save a new book:
router.post("/", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "Send all the required fields title, author, publishYear",
      });
    }
    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    };

    const book = await Book.create(newBook);
    return response.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    return response.status(500).send({ message: error.message });
  }
});

// Route to get all book from data Base
router.get("/", async (request, response) => {
  try {
    const books = await Book.find({});

    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    return response.status(500).send({ message: error.message });
  }
});

// Route to get single book from data Base
router.get("/:id", async (request, response) => {
  try {
    const book = await Book.findById(request.params.id);

    return response.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    return response.status(500).send({ message: error.message });
  }
});

// Route to update  book data present in the data Base
router.put("/:id", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "Send all the required fields title, author, publishYear",
      });
    }
    const updatedBook = await Book.findByIdAndUpdate(
      request.params.id,
      request.body
    );
    if (!updatedBook) {
      return response.status(404).send({ message: "Book not found" });
    }
    return response.status(200).send({ message: "Book Updated Successfully" });
  } catch (error) {
    console.log(error.message);
    return response.status(500).send({ message: error.message });
  }
});

// Route to delete  book data present in the data Base
router.delete("/:id", async (request, response) => {
  try {
    const deletedbook = await Book.findByIdAndDelete(request.params.id);
    if (!deletedbook) {
      return response.status(404).send({ message: "Book not present" });
    }
    return response.status(200).send({ message: "Book Deletd Successfully" });
  } catch (error) {
    console.log(error.message);
    return response.status(500).send({ message: error.message });
  }
});

export default router;
