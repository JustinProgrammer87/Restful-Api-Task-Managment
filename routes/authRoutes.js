const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const router = express.Router();

// Improved Error Handling Function
const handleError = (res, error, statusCode = 400) => {
  console.error(error); // Log error for server-side debugging
  res.status(statusCode).send({ message: error.message });
};

console.log()
router.post("/register", async (req, res) => {
  try {
    // Validate request data (optional: add more validation as needed)
    if (!req.body.username || !req.body.password) {
      return handleError(
        res,
        new Error("Username and password are required"),
        400
      );
    }

    // Check if username already exists
    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
      return handleError(res, new Error("Username already exists"), 400);
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create and save the new user
    const user = new User({
      username: req.body.username,
      password: hashedPassword,
    });
    const newUser = await user.save();

    res
      .status(201)
      .send({ userId: newUser._id, message: "User successfully registered" });
  } catch (error) {
    handleError(res, error, 500);
  }
});

router.post("/login", async (req, res) => {
  try {
    // Validate request data
    if (!req.body.username || !req.body.password) {
      return handleError(
        res,
        new Error("Username and password are required"),
        400
      );
    }

    // Check if user exists
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return handleError(res, new Error("Invalid username or password"), 401);
    }

    // Compare hashed password
    if (await bcrypt.compare(req.body.password, user.password)) {
      // Create and assign a token
      const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
      res
        .header("auth-token", token)
        .send({ token, message: "Login successful" });
    } else {
      return handleError(res, new Error("Invalid username or password"), 401);
    }
  } catch (error) {
    handleError(res, error, 500);
  }
});

module.exports = router;
