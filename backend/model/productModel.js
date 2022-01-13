const mongoose = require("mongoose");

const productShema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, "Please Enter Product Name"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Please Enter product Price"],
      maxLength: [8, "price cannot exceed 8 characters"],
    },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
  });
  
  module.exports = mongoose.model("Product", productShema);