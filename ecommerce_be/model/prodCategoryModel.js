const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const prodCategorySchema = Schema(
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

const prodCategory = mongoose.model('prodcategories', prodCategorySchema);

module.exports = prodCategory;
