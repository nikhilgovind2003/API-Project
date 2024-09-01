import express from "express";
import { users } from "../data/users.js";
import { addUsers, deleteUser, getAllUsers, getOneUserById, subscriptionByUser, updateUserById } from "../controllers/user.Controller.js";

const router = express.Router();



// Get all user details
router.get("/",getAllUsers);


// Get the details of a single book
router.get("/:id", getOneUserById);


// Create new user
router.post("/",addUsers);


router.get("/subscription_by_user/:id", subscriptionByUser);


// Update the user
router.put("/:id",updateUserById);


// Delete user
router.delete("/:id", deleteUser);


export default router;
