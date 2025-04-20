const { Deal } = require("../models/deal.model");

const createDeal = async (req, res) => {
  try {
    const deal = new Deal(req.body);
    await deal.save();
    res.status(201).json({ message: "Deal created", deal });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getAllDeals = async (req, res) => {
  try {
    const deals = await Deal.find().populate("businessId");
    res.json(deals);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const getDealById = async (req, res) => {
  try {
    const deal = await Deal.findById(req.params.id).populate("businessId");
    if (!deal) return res.status(404).json({ message: "Deal not found" });
    res.json(deal);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const updateDeal = async (req, res) => {
  try {
    const deal = await Deal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json({ message: "Deal updated", deal });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const deleteDeal = async (req, res) => {
  try {
    await Deal.findByIdAndDelete(req.params.id);
    res.json({ message: "Deal deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
module.exports = {
  createDeal,
  getAllDeals,
  getDealById,
  updateDeal,
  deleteDeal,
};
