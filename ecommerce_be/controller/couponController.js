const asyncHandler = require('express-async-handler');
const Coupon = require('../model/couponModel');
const validateMongoDbId = require('../utils/validateMongodbid');

const createCoupon = asyncHandler(async (req, res) => {
  try {
    const newCoupon = await Coupon.create(req.body);
    res.status(201).json({
      status: 201,
      message: 'Coupon created successfully.',
      newCoupon: newCoupon,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getAllCoupons = asyncHandler(async (req, res) => {
  try {
    const listCoupon = await Coupon.find();
    res.status(200).json({
      status: 200,
      results: listCoupon.length,
      listCoupon: listCoupon,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getCoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getCoupon = await Coupon.findById(id);
    res.status(200).json({
      status: 200,
      getCoupon: getCoupon,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const updateCoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updateCoupon = await Coupon.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({
      status: 200,
      message: 'Coupon updated successfully.',
      updateCoupon: updateCoupon,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const deleteCoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deleteCoupon = await Coupon.findByIdAndDelete(id);
    res.status(200).json({
      status: 200,
      message: 'Coupon deleted successfully.',
      deleteCoupon: deleteCoupon,
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createCoupon,
  getAllCoupons,
  getCoupon,
  updateCoupon,
  deleteCoupon,
};
