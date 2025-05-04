const Business = require("../models/business.model").Business;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { BusinessSchema } = require("../models/business.model");
const { generateBusinessQrCode } = require("../utils/BusinessQrCodeGenerator");

const registerBusiness = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingBusiness = await Business.findOne({ email });
    if (existingBusiness) {
      return res.status(400).json({ message: "Business already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newBusiness = new Business({
      email,
      password: hashedPassword,
    });
    await newBusiness.save();
    const token = jwt.sign({ id: newBusiness._id }, process.env.JWT_SECRET, {
      expiresIn: "60d",
    });
    res
      .status(201)
      .json({ message: "Business registered successfully", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", msg: error.message });
  }
};
const addBusinessDetails = async (req, res) => {
  try {
    console.log("got in here");
    // assuming you extract this from JWT
    const {
      email,
      name,
      businessType,
      businessCategory,
      businessStartDate,
      businessWebsite,
      addressLine1,
      city,
      state,
      pincode,
      profilePicture,
      socialLinks,
      location,
    } = req.body;
    const updateFields = {
      name,
      businessType,
      businessCategory,
      businessStartDate,
      businessWebsite,
      addressLine1,
      city,
      state,
      pincode,
      profilePicture,
      socialLinks,
    };
    const geoLocation = location
      ? {
          type: "Point",
          coordinates: [location.longitude, location.latitude], // GeoJSON expects [lng, lat]
        }
      : undefined;
    if (geoLocation) {
      updateFields.location = geoLocation;
    }
    const updatedUser = await Business.findOneAndUpdate(
      { email: email },
      updateFields,
      { new: true, runValidators: true }
    ).select("-password"); // to avoid returning password field

    if (!updatedUser) {
      return res.status(404).json({ message: "Business not found" });
    }
    const token = jwt.sign({ id: updatedUser._id }, process.env.JWT_SECRET, {
      expiresIn: "60d",
    });
    res.status(200).json({ message: "Business details updated", token });
  } catch (error) {
    console.error("Error updating business details:", error);
    res.status(500).json({ message: "Server error", msg: error.message });
  }
};

const loginBusiness = async (req, res) => {
  const { email, password } = req.body;
  try {
    const business = await Business.findOne({ email }).select("+password");
    if (!business) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const isPasswordValid = await bcrypt.compare(password, business.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign({ id: business._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ message: "Business logged in successfully", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
const getBusinessProfile = async (req, res) => {
  const businessId = req.user;
  try {
    const business = await Business.findById(businessId);
    if (!business) {
      return res.status(404).json({ message: "Business not found" });
    }
    res.status(200).json(business);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
const updateBusinessProfile = async (req, res) => {
  const businessId = req.user;
  const { name, email, address, phoneNumber } = req.body;
  try {
    const updatedBusiness = await Business.findByIdAndUpdate(
      businessId,
      { name, email, address, phoneNumber },
      { new: true }
    );
    if (!updatedBusiness) {
      return res.status(404).json({ message: "Business not found" });
    }
    res.status(200).json(updatedBusiness);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
const deleteBusinessProfile = async (req, res) => {
  const businessId = req.user;
  try {
    const deletedBusiness = await Business.findByIdAndDelete(businessId);
    if (!deletedBusiness) {
      return res.status(404).json({ message: "Business not found" });
    }
    res.status(200).json({ message: "Business profile deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
const qrCodeGenerate = async (req, res) => {
  try {
    const res1 = await generateBusinessQrCode(req.user);
    res
      .status(200)
      .json({ message: "QR code generated successfully", qrCode: res1 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
module.exports = {
  registerBusiness,
  loginBusiness,
  getBusinessProfile,
  updateBusinessProfile,
  deleteBusinessProfile,
  qrCodeGenerate,
  addBusinessDetails,
};
