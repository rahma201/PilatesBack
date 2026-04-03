const User = require("../models/userSchema");
const Role = require("../models/RoleSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign({ userId: user._id, role: user.role }, "secretkey", {
    expiresIn: "1h",
  });
};

// GET all users
const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.json({ success: true, data: users });
};

// GET single user
const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json({ success: true, data: user });
};

// UPDATE user
const updateUser = async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json({ success: true, data: updatedUser });
};

// DELETE user
const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: "User deleted" });
};

// REGISTER
const register = async (req, res) => {
  try {
    let { name, email, password, age, role = "user" } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Missing data",
      });
    }

    email = email.toLowerCase();

    let roleDetails = await Role.findOne({ name: role });

    if (!roleDetails) {
      roleDetails = await Role.create({
        name: role,
        permissions: [],
      });
    }

    const existUser = await User.findOne({ email });

    if (existUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server Error",
      error: err.message,
    });
  }
};

// LOGIN
const login = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password is required",
      });
    }

    email = email.toLowerCase();

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    const token = generateToken(user);

    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server Error",
      error: err.message,
    });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  login,
  register,
};
