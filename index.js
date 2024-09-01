import express from "express";
import { books } from "./data/books.js";
import { users } from "./data/users.js";
import userRouter from "./Routes/users.js";
import booksRouter from "./Routes/books.js";
import dbConnection from "./DB/DBConfig.js";
import dotenv from "dotenv"



const app = express();
dotenv.config();

dbConnection();
const PORT = 5000;

app.use(express.json());
app.use("/users", userRouter);
app.use("/books", booksRouter);



app.get("*", (req, res) => {
  res.status(404).json({
    message: "This router does not exist",
  });
});

app.listen(PORT, () => {
  console.log("Server is up and running at PORT:5000");
});
