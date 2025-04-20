const routes = require("express").Router();
const {
  createDeal,
  getAllDeals,
  getDealById,
  updateDeal,
  deleteDeal,
} = require("../controllers/deal.controller");
const { verifyToken } = require("../middlewares/auth.middleware");

routes.post("/", verifyToken, createDeal);
routes.get("/", getAllDeals);
routes.get("/:id", getDealById);
routes.put("/:id", verifyToken, updateDeal);
routes.delete("/:id", verifyToken, deleteDeal);

module.exports = routes;
