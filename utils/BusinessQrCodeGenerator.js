const { Business } = require("../models/business.model");
const QRCode = require("qrcode");
const generateBusinessQrCode = async (businessId) => {
  const business = await Business.findById(businessId);
  return new Promise((resolve, reject) => {
    console.log("Generating QR code for business ID:", businessId);
    if (!business) {
      return reject("Business not found");
    }
    const qrCodeData = {
      businessId: business._id,
      name: business.name,
      type: "business-scan",
    };
    console.log(qrCodeData);
    // QRCode.toDataURL(JSON.stringify(qrCodeData), (err, url) => {
    QRCode.toDataURL(
      `https://stilldeal.com/scan/${JSON.stringify({
        businessId: business._id,
        name: business.name,
      })}`,
      (err, url) => {
        if (err) {
          console.log(err.message);
          return reject("Error generating QR code");
        }
        resolve(url);
      }
    );
  });
};
module.exports = {
  generateBusinessQrCode,
};
