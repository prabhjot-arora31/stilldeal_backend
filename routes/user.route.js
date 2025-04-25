const routes = require("express").Router();
const {
  userRegister,
  userLogin,
  getUserProfile,
  deleteUserProfile,
  updateUserProfile,
  resetPassword,
  addUserDetails,
} = require("../controllers/user.controller");
const { verifyToken } = require("../middlewares/auth.middleware");
routes.post("/register", userRegister);
routes.post("/login", userLogin);
routes.get("/profile", verifyToken, getUserProfile);
routes.put("/profile/:id", updateUserProfile);
routes.delete("/profile/:id", deleteUserProfile);
routes.post("/reset-password", resetPassword);
routes.post("/add-user-details", addUserDetails);
module.exports = routes;
