const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = Schema(
  {
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'products',
        },
        count: Number,
        color: String,
      },
    ],
    paymentIntent: {},
    orderStatus: {
      type: String,
      default: 'Not Processed',
      enum: [
        'Not Processed',
        'Cash on Delivery',
        'Processing',
        'Dispatched',
        'Cancelled',
        'Delivered',
      ],
    },
    orderby: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
  },
  { timestamps: true }
);

const Orders = mongoose.model('orders', orderSchema);

module.exports = Orders;
