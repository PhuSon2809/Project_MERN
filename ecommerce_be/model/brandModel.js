const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const brandSchema = Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

const Brands = mongoose.model('brands', brandSchema);

module.exports = Brands;
