const routes = require("express").Router();
const {
  registerBusiness,
  loginBusiness,
  getBusinessProfile,
  deleteBusinessProfile,
  updateBusinessProfile,
  qrCodeGenerate,
  addBusinessDetails,
} = require("../controllers/business.controller");
const { verifyToken } = require("../middlewares/auth.middleware");
routes.post("/register", registerBusiness);
routes.post("/login", loginBusiness);
routes.post("/add-business-details", addBusinessDetails);
routes.get("/profile", verifyToken, getBusinessProfile);
routes.put("/profile", verifyToken, updateBusinessProfile);
routes.delete("/profile", verifyToken, deleteBusinessProfile);
routes.get("/qr-code-generate", verifyToken, qrCodeGenerate);
module.exports = routes;
