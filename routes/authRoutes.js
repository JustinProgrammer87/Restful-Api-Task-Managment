// routes/authRoutes.js
const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create a new user
    const user = new User({
      username: req.body.username,
      password: hashedPassword
    });

    // Save user in the database
    const newUser = await user.save();
    res.status(201).send({ userId: newUser._id });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/login', async (req, res) => {
  try {
    // Check if user exists
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(400).send('Cannot find user');
    }

    // Compare hashed password
    if (await bcrypt.compare(req.body.password, user.password)) {
      // Create and assign a token
      const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
      res.header('auth-token', token).send(token);
    } else {
      res.send('Not Allowed');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});


module.exports = router;
