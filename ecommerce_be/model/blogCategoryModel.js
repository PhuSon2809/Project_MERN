const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const blogCategorySchema = Schema(
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

const blogCategory = mongoose.model('blogcategories', blogCategorySchema);

module.exports = blogCategory;
