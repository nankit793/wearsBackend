const express = require("express");
const app = express();
const multer = require("multer");
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

app.get("/", upload.any(), async (req, res) => {
  try {
    const { pid } = req.query;
    if (!pid) {
      return res.json({ message: itemRequired("Product Id", res) });
    }
    const p = await Products.findById(pid);
    if (p) {
      return res.status(200).json({ message: "Product fecthed", data: p });
    }
    res.json({ messgae: itemNotValid("Product ID", res) });
  } catch (error) {
    return res.json({
      message: serverError("", res),
    });
  }
});

module.exports = app;
