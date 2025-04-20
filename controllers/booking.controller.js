const { Booking } = require("../models/booking.model");

const createBooking = async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json({ message: "Booking created", booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate(
      "userId dealId businessId"
    );
    if (!booking) return res.status(404).json({ message: "Not found" });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json({ message: "Booking updated", booking });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createBooking,
  getBookingById,
  updateBookingStatus,
};
