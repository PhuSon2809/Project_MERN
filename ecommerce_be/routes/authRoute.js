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
} = require('../controller/userController');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');

const authRouter = express.Router();

authRouter.use(bodyParser.json());

authRouter.route('/register').post(createUser);
authRouter.route('/login').post(login);
authRouter.route('/refresh').get(handlerRefreshToken);
authRouter.route('/logout').get(logout);
authRouter.route('/all-users').get(getAllUsers);
authRouter
  .route('/:id')
  .get(authMiddleware, isAdmin, getUser)
  .delete(deleteUser);
authRouter.route('/edit').put(authMiddleware, updateUser);
authRouter.route('/block-user/:id').put(authMiddleware, isAdmin, blockUser);
authRouter.route('/unblock-user/:id').put(authMiddleware, isAdmin, unBlockUser);

module.exports = authRouter;
