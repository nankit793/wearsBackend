const express = require("express");
const adminVerification = require("@middlewares/adminVerification");
const app = express();
const { productVerification } = require("@controllers/verifiers");
const Joi = require("joi");
const multer = require("multer");
const ProductImages = require("@models/styleWood/ProductImages");
const { availableColors } = require("@controllers/definedValues");
const {
  itemsRequired,
  itemsNotValid,
  itemNotValid,
  serverError,
  userNotExist,
} = require("@errors/general");
const Products = require("../../../../models/styleWood/Products");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post("/", adminVerification, upload.any(), async (req, res) => {
  try {
    let flag = false;
    const data = req.body;
    productVerify = productVerification(data);
    const images = [];
    if (!(productVerify && productVerify.state)) {
      return res
        .status(403)
        .json({ message: productVerify.message || "validation failed" });
    }
    req.files?.forEach(async (file) => {
      if (flag) {
        return;
      }
      const image = new ProductImages({
        data: file.buffer,
        contentType: file.mimetype,
      });
      image.save();
      images.push({
        name: file.fieldname,
        image: image._id,
      });
    });
    const savedProduct = await Products(req.body);
    savedProduct.images = images;
    savedProduct.save();
    if (!flag) {
      return res.status(200).json({ message: "product saved" });
    }
  } catch (error) {
    return res.json({
      message: serverError("", res),
    });
  }
});

module.exports = app;
