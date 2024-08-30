import express from "express";
import { books, users } from "./data/books.js";

const app = express();
const PORT = 5000;

app.use(express.json());

// Get all user details
app.get("/users", (req, res) => {
  res.status(200).json({
    message: "Success",
    data: users,
  });
});

// Get the details of a single book
app.get("/users/:id", (req, res) => {
  let { id } = req.params;
  id = Number(id);

  const user = users.find((e) => e.id === id);

  if (!user) {
    res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  return res.status(200).json({
    message: "User found",
    data: user,
  });
});

// Register new user
app.post("/users", (req, res) => {
  const {
    id,
    name,
    surName,
    email,
    issuedBooks,
    issuedDate,
    returnDate,
    subsrciptionType,
    subsrciptionDate,
  } = req.body;

  if (
    !id ||
    !name ||
    !surName ||
    !email ||
    !issuedBooks ||
    !issuedDate ||
    !returnDate ||
    !subsrciptionType ||
    !subsrciptionDate
  ) {
    return res.status(404).json({
      success: false,
      message: "Enter all details",
    });
  }

  const user = users.find((e) => e.id === id);

  if (user)
    return res.status(404).json({
      success: false,
      message: "User already exists",
    });

  users.push({
    id,
    name,
    surName,
    issuedBooks,
    issuedDate,
    returnDate,
    subsrciptionType,
    subsrciptionDate,
  });

  return res.status(201).json({
    success: true,
    message: "User added successfully",
    data: users,
  });
});

// Update the user
app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  const user = users.find((e) => e.id === id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User does not exists!",
    });
  }

  const updatedUser = users.map((e) => {
    if (e.id === id) {
      return {
        ...e,
        ...data,
      };
    }
    return e;
  });

    return res.status(200).json({
        success: true,
        message: "User updated succesfully!",
        data: updatedUser
  });
});

// Get all books details
app.get("/books", (req, res) => {
  res.status(200).json({
    message: "Success",
    data: books,
  });
});

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server is up and running",
  });
});

app.get("*", (req, res) => {
  res.status(404).json({
    message: "This router does not exist",
  });
});

app.listen(PORT, () => {
  console.log("Server is up and running at PORT:5000");
});
