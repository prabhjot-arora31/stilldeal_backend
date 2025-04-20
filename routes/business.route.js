const routes = require("express").Router();
const {
  registerBusiness,
  loginBusiness,
  getBusinessProfile,
  deleteBusinessProfile,
  updateBusinessProfile,
  qrCodeGenerate,
} = require("../controllers/business.controller");
routes.post("/register", registerBusiness);
routes.post("/login", loginBusiness);
routes.get("/profile/:id", getBusinessProfile);
routes.put("/profile/:id", updateBusinessProfile);
routes.delete("/profile/:id", deleteBusinessProfile);
routes.get("/qr-code-generate/:id", qrCodeGenerate);
module.exports = routes;
