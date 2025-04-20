const routes = require("express").Router();
const {
  logQRScan,
  getScansByBusiness,
  getUserScans,
} = require("../controllers/qrscanlog.controller");
const { verifyToken } = require("../middlewares/auth.middleware");

routes.post("/", verifyToken, logQRScan);
routes.get("/business/:businessId", verifyToken, getScansByBusiness);
routes.get("/user/:userId", verifyToken, getUserScans);

module.exports = routes;
