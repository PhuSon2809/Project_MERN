const asyncHandler = require('express-async-handler');
const prodCategory = require('../model/prodCategoryModel');
const validateMongoDbId = require('../utils/validateMongodbid');

const createProdCategory = asyncHandler(async (req, res) => {
  try {
    const newCategory = await prodCategory.create(req.body);
    res.status(201).json({
      status: 201,
      message: 'Category created successfully.',
      newCategory: newCategory,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getAllProdCategory = asyncHandler(async (req, res) => {
  try {
    const listCategory = await prodCategory.find();
    res.status(200).json({
      status: 200,
      results: listCategory.length,
      listCategory: listCategory,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getProdCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getCategory = await prodCategory.findById(id);
    res.status(200).json({
      status: 200,
      getCategory: getCategory,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const updateProdCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updateCategory = await prodCategory.findByIdAndUpdate(id, req.body, {
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

const deleteProdCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deleteCategory = await prodCategory.findByIdAndDelete(id);
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
  createProdCategory,
  getAllProdCategory,
  getProdCategory,
  updateProdCategory,
  deleteProdCategory,
};
