const express = require('express');
const bodyParser = require('body-parser');
const { isAdmin, authMiddleware } = require('../middlewares/authMiddleware');
const {
  createBlogCategory,
  getAllBlogCategory,
  getBlogCategory,
  updateBlogCategory,
  deleteBlogCategory,
} = require('../controller/blogCategoryController');

const blogCategoryRouter = express.Router();

blogCategoryRouter.use(bodyParser.json());

blogCategoryRouter
  .route('/')
  .post(authMiddleware, isAdmin, createBlogCategory)
  .get(getAllBlogCategory);

blogCategoryRouter
  .route('/:id')
  .get(getBlogCategory)
  .put(authMiddleware, isAdmin, updateBlogCategory)
  .delete(authMiddleware, isAdmin, deleteBlogCategory);

module.exports = blogCategoryRouter;
