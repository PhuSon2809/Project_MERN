const asyncHandler = require('express-async-handler');
const blogCategory = require('../model/blogCategoryModel');
const validateMongoDbId = require('../utils/validateMongodbid');

const createBlogCategory = asyncHandler(async (req, res) => {
  try {
    const newCategory = await blogCategory.create(req.body);
    res.status(201).json({
      status: 201,
      message: 'Category created successfully.',
      newCategory: newCategory,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getAllBlogCategory = asyncHandler(async (req, res) => {
  try {
    const listCategory = await blogCategory.find();
    res.status(200).json({
      status: 200,
      results: listCategory.length,
      listCategory: listCategory,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getBlogCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getCategory = await blogCategory.findById(id);
    res.status(200).json({
      status: 200,
      getCategory: getCategory,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const updateBlogCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updateCategory = await blogCategory.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({
      status: 200,
      message: 'Category updated successfully.',
      updateCategory: updateCategory,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const deleteBlogCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deleteCategory = await blogCategory.findByIdAndDelete(id);
    res.status(200).json({
      status: 200,
      message: 'Category deleted successfully.',
      deleteCategory: deleteCategory,
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createBlogCategory,
  getAllBlogCategory,
  getBlogCategory,
  updateBlogCategory,
  deleteBlogCategory,
};
