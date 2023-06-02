const express = require("express");
const adminVerification = require("@middlewares/adminVerification");
const app = express();
const { productVerification } = require("@controllers/verifiers");
const Joi = require("joi");
const multer = require("multer");
const ProductImages = require("@models/stylewood/ProductImages");
const { availableColors } = require("@controllers/definedValues");
const {
  itemRequired,
  itemsNotValid,
  itemNotValid,
  serverError,
  userNotExist,
} = require("@errors/general");
const Products = require("../../../../models/styleWood/Products");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.delete("/", adminVerification, upload.any(), async (req, res) => {
  try {
    const { pid } = req.query;
    if (!pid) {
      return res.json({ message: itemRequired("Product Id", res) });
    }
    await Products.findByIdAndDelete(pid);
    res.status(200).json({ message: "Product removed" });
  } catch (error) {
    return res.json({
      message: serverError("", res),
    });
  }
});

module.exports = app;
