const asyncHandler = require('express-async-handler');
const Brands = require('../model/brandModel');
const validateMongoDbId = require('../utils/validateMongodbid');

const createBrand = asyncHandler(async (req, res) => {
  try {
    const newBrand = await Brands.create(req.body);
    res.status(201).json({
      status: 201,
      message: 'Brand created successfully.',
      newBrand: newBrand,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getAllBrands = asyncHandler(async (req, res) => {
  try {
    const listBrand = await Brands.find();
    res.status(200).json({
      status: 200,
      results: listBrand.length,
      listBrand: listBrand,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getBrand = await Brands.findById(id);
    res.status(200).json({
      status: 200,
      getBrand: getBrand,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const updateBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updateBrand = await Brands.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({
      status: 200,
      message: 'Brand updated successfully.',
      updateBrand: updateBrand,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const deleteBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deleteBrand = await Brands.findByIdAndDelete(id);
    res.status(200).json({
      status: 200,
      message: 'Brand deleted successfully.',
      deleteBrand: deleteBrand,
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createBrand,
  getAllBrands,
  getBrand,
  updateBrand,
  deleteBrand,
};
