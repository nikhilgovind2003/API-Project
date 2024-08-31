import express from "express";
import { users } from "../data/users.js";

const router = express.Router();

// Get all user details
router.get("/", (req, res) => {
  res.status(200).json({
    message: "Success",
    data: users,
  });
});

// Get the details of a single book
router.get("/:id", (req, res) => {
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
router.post("/", (req, res) => {
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

// Update a book
router.get("/subscription_by_user/:id", (req, res) => {
  const { id } = req.params;

  const user = users.find((e) => e.id === id);

  if (!user) return res.status(404).json({
    success: false,
    message: "User does not exists!!!"
  })

  const DateInDays = (data = "") => {
    let date;
    if (data == "") {
      date = new Date();
      console.log(date);
    } else {
      date = new Date(data);
      console.log(date);
    }
    let days = Math.floor(date / (1000 * 60 * 60 * 24));
    return days;
  };

  const subscriptionType = (date) => {
    if (user.subsrciptionType === "Basic") {
      date = date + 90;
    } else if (user.subsrciptionType === "Standard") {
      date = date + 180;
    } else if (user.subsrciptionType === "Premium") {
      date = date + 365;
    }
    return date;
  };

  let returnDate = DateInDays(user.returnDate);
  let currentDate = DateInDays();
  let subsrciptionStartDate = DateInDays(user.subsrciptionDate);
  let subscriptionExpiration = subscriptionType(subsrciptionStartDate);

  const data = {
    ...user,
    isSubscriptionExpired: subscriptionExpiration <= currentDate,
    daysLeftForExpiration: subscriptionExpiration <= currentDate ? 0 : subscriptionExpiration - currentDate,
    fine: returnDate < currentDate ? subscriptionExpiration <= currentDate ? 100 : 50 : 0
  }



  return res.status(200).json({
    success: true,
    message: "User with subscription details here : ",
    data
})




});

// Update the user
router.put("/:id", (req, res) => {
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
    data: updatedUser,
  });
});

// Delete user
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((e) => e.id === id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User does not exists!",
    });
  }

  const index = users.indexOf(user);
  console.log(index);
  users.splice(index, 1);

  return res.status(200).json({
    success: true,
    messages: "User deleted succesfully",
    data: users,
  });
});

export default router;
