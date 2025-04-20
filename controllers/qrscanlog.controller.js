const { QRScanLog } = require("../models/qrscanlog.model");

const logQRScan = async (req, res) => {
  try {
    const qrScan = new QRScanLog(req.body);
    await qrScan.save();
    res.status(201).json({ message: "QR scan logged", qrScan });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const getScansByBusiness = async (req, res) => {
  try {
    const scans = await QRScanLog.find({
      businessId: req.params.businessId,
    }).populate("userId dealId");
    res.json(scans);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const getUserScans = async (req, res) => {
  try {
    const scans = await QRScanLog.find({ userId: req.params.userId });
    res.json(scans);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
    logQRScan,
    getScansByBusiness,
    getUserScans,
    };
    