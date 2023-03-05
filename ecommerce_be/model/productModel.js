const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      //   type: Schema.Types.ObjectId,
      //   ref: 'category',
      type: String,
      required: true,
    },
    brand: {
      type: String,
      //   enum: ['Apple', 'Samsung', 'Lenovo'],
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    sold: {
      type: Number,
      default: 0,
    },
    image: {
      type: Array,
    },
    color: {
      type: String,
      //   enum: ['black', 'Brown', 'Red'],
      required: true,
    },
    ratings: [
      {
        star: Number,
        comment: String,
        postedby: {
          type: Schema.Types.ObjectId,
          ref: 'users',
        },
      },
    ],
    totalrating: {
      type: String,
      default: 0,
    },
  },
  { timestamps: true }
);

const Products = mongoose.model('products', productSchema);

module.exports = Products;
