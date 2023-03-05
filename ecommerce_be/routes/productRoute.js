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
  uploadImages,
} = require('../controller/productController');
const { isAdmin, authMiddleware } = require('../middlewares/authMiddleware');
const {
  uploadPhoto,
  productImgResize,
} = require('../middlewares/uploadImages');

const productRouter = express.Router();

productRouter.use(bodyParser.json());

productRouter
  .route('/')
  .post(authMiddleware, isAdmin, createProduct)
  .get(getAllProducts);

productRouter
  .route('/upload-images/:id')
  .put(
    authMiddleware,
    isAdmin,
    uploadPhoto.array('images', 10),
    productImgResize,
    uploadImages
  );

productRouter.route('/wishlist').put(authMiddleware, addToWishList);
productRouter.route('/rating').put(authMiddleware, rating);

productRouter
  .route('/:id')
  .get(getProduct)
  .put(authMiddleware, isAdmin, updateProduct)
  .delete(authMiddleware, isAdmin, deleteProduct);

module.exports = productRouter;
