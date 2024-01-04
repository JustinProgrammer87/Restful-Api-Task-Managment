require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

app.use(express.json()); // To parse JSON request bodies

app.use(authRoutes);
app.use(taskRoutes);

// MongoDB connection
const dbURI = process.env.DB_URI;
mongoose
  .connect(dbURI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Root route (optional)
app.get("/", (req, res) => {
  res.send("Hello World!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
