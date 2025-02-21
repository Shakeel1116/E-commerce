const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

//  Signup Route
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 🔎 Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists!" });
    }

    // 🔐 Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 💾 Save new user
    user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "✅ Signup successful!" });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Server error!" });
  }
});

// ✅ Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔎 Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password!" });
    }

    // 🔐 Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password!" });
    }

    // 🔑 Generate JWT Token
    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email },
      process.env.JWT_SECRET || "default_secret",
      { expiresIn: "1h" }
    );

    res.json({ message: "✅ Login successful!", token, name: user.name, email: user.email });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error!" });
  }
});

module.exports = router;
