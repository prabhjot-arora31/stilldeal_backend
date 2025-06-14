const User = require("../models/user.model").User;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { verifyToken } = require("../middlewares/auth.middleware");
const sendLoginSuccess = require("../utils/sendLoginSuccessEmail");
const sendRegistrationSuccess = require("../utils/sendRegistrationSuccessEmail");
const sendPasswordResetSuccessfull = require("../utils/PasswordResetSuccessfulEmail");
const userRegister = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      password: hashedPassword,
    });
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(201).json({ message: "User registered successfully", token });
    sendRegistrationSuccess(newUser.email); // Send registration success email
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
const userLogin = async (req, res) => {
  console.log("inside login");
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "60d",
    });
    res.status(200).json({ message: "User logged in successfully", token });
    sendLoginSuccess(user.email); // Send login success email
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
const getUserProfile = async (req, res) => {
  console.log("inside profile");
  console.log("req.body is:", req.user);
  const userId = req.user.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "Success", user: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
const updateUserProfile = async (req, res) => {
  const userId = req.params.id;
  const { name, email, username, password, age, address, phoneNumber } =
    req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (email) {
      const existingUser = await User.findOne({ email });
      if (existingUser && existingUser._id.toString() !== userId) {
        return res.status(400).json({ message: "Email already in use" });
      }
    }
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }
    user.name = name || user.name;
    user.email = email || user.email;
    user.username = username || user.username;
    user.age = age || user.age;
    user.address = address || user.address;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    await user.save();
    res.status(200).json({ message: "User profile updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
const deleteUserProfile = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await user.remove();
    res.status(200).json({ message: "User profile deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "60d",
    });
    res.status(200).json({ message: "Password reset successfully", token });
    sendPasswordResetSuccessfull(user.email); // Send password reset success email
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
const addUserDetails = async (req, res) => {
  try {
    console.log("got in here");
    // assuming you extract this from JWT
    const {
      email,
      name,
      dob,
      addressLine1,
      addressLine2,
      phoneNumber,
      country,
      city,
      state,
      pincode,
      profilePicture,
      gender,
    } = req.body;

    // Validate gender (optional if Mongoose schema already enforces it)
    if (!["Male", "Female", "Other"].includes(gender)) {
      return res.status(400).json({ message: "Invalid gender value" });
    }

    const updatedUser = await User.findOneAndUpdate(
      { email: email },
      {
        name,
        dob,
        addressLine1,
        addressLine2,
        phoneNumber,
        country,
        city,
        state,
        profileCompleted: true,
        pincode,
        profilePicture,
        gender,
      },
      { new: true, runValidators: true }
    ).select("-password"); // to avoid returning password field

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    const token = jwt.sign({ id: updatedUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ message: "User details updated", token });
  } catch (error) {
    console.error("Error updating user details:", error);
    res.status(500).json({ message: "Server error", msg: error.message });
  }
};
module.exports = {
  userRegister,
  userLogin,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
  resetPassword,
  addUserDetails,
};
