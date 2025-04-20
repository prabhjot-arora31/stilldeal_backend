const routes = require("express").Router();
const {
  createBooking,
  getBookingById,
  updateBookingStatus,
} = require("../controllers/booking.controller");
const { verifyToken } = require("../middlewares/auth.middleware");

routes.post("/", verifyToken, createBooking);
routes.get("/:id", verifyToken, getBookingById);
routes.put("/:id/status", verifyToken, updateBookingStatus);

module.exports = routes;
