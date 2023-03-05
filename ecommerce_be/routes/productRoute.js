const express = require('express');
const bodyParser = require('body-parser');
const {
  createProduct,
  getProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  addToWishList,
  rating,
} = require('../controller/productController');
const { isAdmin, authMiddleware } = require('../middlewares/authMiddleware');

const productRouter = express.Router();

productRouter.use(bodyParser.json());

productRouter
  .route('/')
  .post(authMiddleware, isAdmin, createProduct)
  .get(getAllProducts);

productRouter.route('/wishlist').put(authMiddleware, addToWishList);
productRouter.route('/rating').put(authMiddleware, rating);

productRouter
  .route('/:id')
  .get(getProduct)
  .put(authMiddleware, isAdmin, updateProduct)
  .delete(authMiddleware, isAdmin, deleteProduct);

module.exports = productRouter;
