const express = require('express');
const bodyParser = require('body-parser');
const { isAdmin, authMiddleware } = require('../middlewares/authMiddleware');
const {
  createBlog,
  getAllBlogs,
  updateBlog,
  deleteBlog,
  getBlog,
  likeBlog,
  dislikeBlog,
} = require('../controller/blogController');

const blogRouter = express.Router();

blogRouter.use(bodyParser.json());

blogRouter
  .route('/')
  .post(authMiddleware, isAdmin, createBlog)
  .get(getAllBlogs);

blogRouter.route('/likes').put(authMiddleware, likeBlog);
blogRouter.route('/dislikes').put(authMiddleware, dislikeBlog);

blogRouter
  .route('/:id')
  .get(getBlog)
  .put(authMiddleware, isAdmin, updateBlog)
  .delete(authMiddleware, isAdmin, deleteBlog);

module.exports = blogRouter;
