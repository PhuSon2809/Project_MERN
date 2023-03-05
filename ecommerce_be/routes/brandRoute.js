const express = require('express');
const bodyParser = require('body-parser');
const { isAdmin, authMiddleware } = require('../middlewares/authMiddleware');
const {
  createBrand,
  getAllBrands,
  getBrand,
  updateBrand,
  deleteBrand,
} = require('../controller/brandController');

const brandRouter = express.Router();

brandRouter.use(bodyParser.json());

brandRouter
  .route('/')
  .post(authMiddleware, isAdmin, createBrand)
  .get(getAllBrands);

brandRouter
  .route('/:id')
  .get(getBrand)
  .put(authMiddleware, isAdmin, updateBrand)
  .delete(authMiddleware, isAdmin, deleteBrand);

module.exports = brandRouter;
