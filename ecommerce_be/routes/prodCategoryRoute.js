const express = require('express');
const bodyParser = require('body-parser');
const { isAdmin, authMiddleware } = require('../middlewares/authMiddleware');
const {
  createProdCategory,
  getAllProdCategory,
  getProdCategory,
  updateProdCategory,
  deleteProdCategory,
} = require('../controller/prodCategoryController');

const prodCategoryRouter = express.Router();

prodCategoryRouter.use(bodyParser.json());

prodCategoryRouter
  .route('/')
  .post(authMiddleware, isAdmin, createProdCategory)
  .get(getAllProdCategory);

prodCategoryRouter
  .route('/:id')
  .get(getProdCategory)
  .put(authMiddleware, isAdmin, updateProdCategory)
  .delete(authMiddleware, isAdmin, deleteProdCategory);

module.exports = prodCategoryRouter;
