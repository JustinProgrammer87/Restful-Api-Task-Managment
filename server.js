require("dotenv").config();
const authRoutes = require('./routes/authRoutes');
const express = require("express");
const mongoose = require("mongoose");
const taskRoutes = require("./routes/taskRoutes"); // Adjust the path as necessary

const app = express();

app.use(authRoutes);
app.use(express.json()); // to parse JSON request bodies
app.use(taskRoutes); // use the task routes

// MongoDB connection
const dbURI = process.env.DB_URI;
mongoose
  .connect(dbURI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Root route (optional, can be removed if not needed)
app.get("/", (req, res) => {
  res.send("Hello World!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
