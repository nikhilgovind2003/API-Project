import express from "express";
import { books } from "../data/books.js";
import { users } from "../data/users.js";

const router = express.Router();
// // Get all books details
router.get("/", (req, res) => {
  res.status(200).json({
    succes: true,
    message: "Get all the books",
    data: books,
  });
});

// Add new book
router.post("/", (req, res) => {
  const { data } = req.body;

  if (!data) {
    res.status(404).json({
      succes: false,
      message: "Enter all details",
    });
  }

  const book = books.find((e) => e.id === data.id);

  if (book)
    return res.status(404).json({
      succes: false,
      message: "Book is already exists with this id",
    });

  const addBooks = { ...books, data };

  return res.status(200).json({
    succes: true,
    message: "Book added successfully",
    data: addBooks,
  });
});

// Issued books
router.get("/issued", (req, res) => {
  const userWithtIssuedBook = users.filter((each) => {
    if (each.issuedBook) return each;
  });

  const issuedBooks = [];

  const issuedBooksFromUser = userWithtIssuedBook.map((each) => {
    const book = books.find((e) => e.id === each.issuedBook);
    (book.issuedBy = each.name),
      (book.issuedDate = each.issuedDate),
      (book.returnDate = each.returnDate);
    issuedBooks.push(book);
  });

  if (issuedBooksFromUser.length === 0) {
    return res.status(404).json({
      succes: false,
      message: "No books issued by user!",
    });
  }
  res.status(200).json({
    succes: true,
    message: "Book issued by user found!!!",
    data: issuedBooks,
  });
});

// Get single book details
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const book = books.find((e) => e.id === id);

  if (!book)
    return res.status(404).json({
      succes: false,
      message: `Book with this id not found at id: ${id}`,
    });

  return res.status(200).json({
    succes: true,
    message: `Book is found at id:${id}`,
    data: book,
  });
});

// Update a book
router.put("/updatedbook/:id", (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  // checking book is exists or not
  const book = books.find((e) => e.id === id);

  if (!book)
    return res.status(404).json({
      succes: false,
      message: "Book does not exists!!!",
    });

  const updateBooks = books.map((e) => {
    if (e.id === id) {
      return {
        ...e,
        ...data,
      };
    }
    return e;
  });

  return res.status(200).json({
    succes: true,
    message: "Book details updated successfully!",
    data: updateBooks,
  });
});



export default router;
