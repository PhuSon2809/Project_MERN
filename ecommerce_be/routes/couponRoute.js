const express = require('express');
const bodyParser = require('body-parser');
const { isAdmin, authMiddleware } = require('../middlewares/authMiddleware');
const {
  createCoupon,
  getAllCoupons,
  getCoupon,
  updateCoupon,
  deleteCoupon,
} = require('../controller/couponController');

const couponRouter = express.Router();

couponRouter.use(bodyParser.json());

couponRouter
  .route('/')
  .post(authMiddleware, isAdmin, createCoupon)
  .get(authMiddleware, isAdmin, getAllCoupons);

couponRouter
  .route('/:id')
  .get(getCoupon)
  .put(authMiddleware, isAdmin, updateCoupon)
  .delete(authMiddleware, isAdmin, deleteCoupon);

module.exports = couponRouter;
