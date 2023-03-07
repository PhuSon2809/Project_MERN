const express = require('express');
const bodyParser = require('body-parser');
const {
  createUser,
  login,
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
  blockUser,
  unBlockUser,
  handlerRefreshToken,
  logout,
  updatePassword,
  forgotPasswordToken,
  resetPassword,
  loginAdmin,
  getWishList,
  saveUserAddress,
  userCart,
  getUserCart,
  emptyCart,
  applyCoupon,
  createOrder,
  getOrders,
  updateOrderStatus,
} = require('../controller/userController');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');

const authRouter = express.Router();

authRouter.use(bodyParser.json());

authRouter.route('/register').post(createUser);
authRouter.route('/forgot-password-token').post(forgotPasswordToken);
authRouter.route('/reset-password/:token').put(resetPassword);
authRouter
  .route('/order/update-order/:id')
  .put(authMiddleware, isAdmin, updateOrderStatus);

authRouter.route('/password').put(authMiddleware, updatePassword);
authRouter.route('/login').post(login);
authRouter.route('/admin-login').post(loginAdmin);
authRouter.route('/cart').post(authMiddleware, userCart);
authRouter.route('/cart/applycoupon').post(authMiddleware, applyCoupon);
authRouter.route('/cart/cash-order').post(authMiddleware, createOrder);

authRouter.route('/refresh').get(handlerRefreshToken);
authRouter.route('/logout').get(logout);
authRouter.route('/all-users').get(getAllUsers);
authRouter.route('/get-orders').get(authMiddleware, getOrders);
authRouter.route('/wishlist').get(authMiddleware, getWishList);
authRouter.route('/cart').get(authMiddleware, getUserCart);
authRouter.route('/empty-cart').delete(authMiddleware, emptyCart);
authRouter
  .route('/:id')
  .get(authMiddleware, isAdmin, getUser)
  .delete(authMiddleware, isAdmin, deleteUser);

authRouter.route('/edit').put(authMiddleware, updateUser);
authRouter.route('/save-address').put(authMiddleware, saveUserAddress);
authRouter.route('/block-user/:id').put(authMiddleware, isAdmin, blockUser);
authRouter.route('/unblock-user/:id').put(authMiddleware, isAdmin, unBlockUser);

module.exports = authRouter;
