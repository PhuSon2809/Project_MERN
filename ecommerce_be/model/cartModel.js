const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cartSchema = Schema(
  {
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'products',
        },
        count: Number,
        color: String,
        price: Number,
      },
    ],
    cartTotal: Number,
    totalAfterDiscount: Number,
    orderby: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
  },
  { timestamps: true }
);

const Carts = mongoose.model('carts', cartSchema);

module.exports = Carts;
