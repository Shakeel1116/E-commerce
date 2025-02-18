require("dotenv").config();  // ✅ Load environment variables

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");



const authRoutes = require("./routes/authRoutes");

const app = express();

// ✅ Fix CORS issue: Allow frontend (http://localhost:3000) to access backend
app.use(cors({
  origin: ["http://localhost:5173", "https://e-commerce-shakeel-xi-71.vercel.app/"],
  credentials: true
}));

app.use(express.json()); // Middleware to parse JSON data

// ✅ Authentication Routes
app.use("/api/auth", authRoutes);


// ✅ MongoDB Connection

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Connection Error:", err));


// ✅ Start Server
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
