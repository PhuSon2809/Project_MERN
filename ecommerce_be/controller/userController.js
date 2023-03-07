const Users = require('../model/userModel');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { generateToken } = require('../config/jwtToken');
const validateMongoDbId = require('../utils/validateMongodbid');
const { generateRefreshToken } = require('../config/refreshToken');
const { sendEmail } = require('./emailController');
const Carts = require('../model/cartModel');
const Products = require('../model/productModel');
const Coupons = require('../model/couponModel');

const createUser = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const findUser = await Users.findOne({ email: email });
  if (!findUser) {
    // Create new user
    const newUser = await Users.create(req.body);
    res.status(201).json({
      status: 201,
      message: 'Create user successfully.',
      data: {
        user: newUser,
      },
    });
  } else {
    throw new Error('User already exists!');
  }
});

//Login a user
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //check id user exits or not
  const findUser = await Users.findOne({ email: email });
  if (findUser && (await findUser.isPasswordMatched(password))) {
    const refreshToken = await generateRefreshToken(findUser?._id);

    const updateUser = await Users.findByIdAndUpdate(
      findUser._id,
      { refreshToken: refreshToken },
      { new: true }
    );
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.status(200).json({
      status: 200,
      user: findUser,
      token: generateToken(findUser?._id),
    });
  } else {
    throw new Error('Invalid credentials!');
  }
});

//Admin login
const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //check id user exits or not
  const findAdmin = await Users.findOne({ email: email });
  if (findAdmin.role !== 'admin') throw new Error('Not Authorized');
  if (findAdmin && (await findAdmin.isPasswordMatched(password))) {
    const refreshToken = await generateRefreshToken(findAdmin?._id);

    const updateUser = await Users.findByIdAndUpdate(
      findAdmin._id,
      { refreshToken: refreshToken },
      { new: true }
    );
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.status(200).json({
      status: 200,
      user: findAdmin,
      token: generateToken(findAdmin?._id),
    });
  } else {
    throw new Error('Invalid credentials!');
  }
});

//Handle refresh token
const handlerRefreshToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie.refreshToken) {
    throw new Error('No refresh token in cookie!');
  }
  const refreshToken = cookie.refreshToken;
  const user = await Users.findOne({ refreshToken });
  if (!user) {
    throw new Error('No refresh token present in db or not matched!');
  }
  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decode) => {
    if (err || user.id !== decode.id) {
      throw new Error('There is something wrong with refresh token!');
    }
    const accessToken = generateToken(user?._id);
    res.status(200).json({
      status: 200,
      accessToken: accessToken,
    });
  });
});

//Logout
const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie.refreshToken) {
    throw new Error('No refresh token in cookie!');
  }
  const refreshToken = cookie.refreshToken;
  const user = await Users.findOne({ refreshToken });
  if (!user) {
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: true,
    });
    return res.sendStatus(204); //forbidden
  }
  await Users.findOneAndUpdate(refreshToken, {
    refreshToken: '',
  });
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: true,
  });
  return res.sendStatus(204); //forbidden
});

//Get all users
const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const listUsers = await Users.find();
    res.status(200).json({
      status: 200,
      results: listUsers.length,
      listUsers: listUsers,
    });
  } catch (error) {
    throw new Error(error);
  }
});

//Get single user
const getUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const user = await Users.findById(id);
    res.status(200).json({
      status: 200,
      user: user,
    });
  } catch (error) {
    throw new Error(error);
  }
});

//Upsate a user
const updateUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const userUpdated = await Users.findOneAndUpdate(
      _id,
      {
        firstname: req?.body?.firstname,
        lastname: req?.body?.lastname,
        email: req?.body?.email,
        phone: req?.body?.phone,
        gender: req?.body?.gender,
        YOB: req?.body?.YOB,
        image: req?.body?.image,
      },
      { new: true }
    );
    res.status(202).json({
      status: 202,
      message: 'Update user successfully.',
      userUpdated: userUpdated,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const updatePassword = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { password } = req.body;
  validateMongoDbId(_id);
  const user = await Users.findById(_id);
  if (password) {
    user.password = password;
    const updatedPassword = await user.save();
    res.json(updatedPassword);
  } else {
    res.json(user);
  }
});

//Save user address
const saveUserAddress = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const userUpdated = await Users.findOneAndUpdate(
      _id,
      {
        address: req?.body?.address,
      },
      { new: true }
    );
    res.status(202).json({
      status: 202,
      message: 'Update user successfully.',
      userUpdated: userUpdated,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const forgotPasswordToken = asyncHandler(async (req, res) => {
  const { email } = req.body;
  console.log(email);
  const user = await Users.findOne({ email: email });
  if (!user) {
    throw new Error('User not found with this email address');
  }
  try {
    const token = await user.createPasswordResetToken();
    await user.save();
    const resetURL = `Hi, Please follow this link to reset Your Password. This link is valid till 10 minutes from now. <a href="http://localhost:7000/api/user/reset-password/${token}">Click here</a>`;
    const data = {
      to: email,
      text: 'Hello user',
      subject: 'Forgot Password Link',
      html: resetURL,
    };
    sendEmail(data);
    res.json(token);
  } catch (error) {
    throw new Error(error);
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
  const user = await Users.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) {
    throw new Error('Token expired, Please try again!');
  }
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  res.json({
    status: 200,
    user: user,
  });
});

const blockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const block = await Users.findByIdAndUpdate(
      id,
      { isBlocked: true },
      { new: true }
    );
    res.status(202).json({
      status: 202,
      message: 'User Blocked.',
    });
  } catch (error) {
    throw new Error(error);
  }
});

const unBlockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const unBlock = await Users.findByIdAndUpdate(
      id,
      { isBlocked: false },
      { new: true }
    );
    res.status(202).json({
      status: 202,
      message: 'User Unblocked.',
    });
  } catch (error) {
    throw new Error(error);
  }
});

//Get single user
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const userDelete = await Users.findByIdAndDelete(id);
    res.status(200).json({
      status: 200,
      message: 'Delete user successfully.',
      userDelete: userDelete,
    });
  } catch (error) {
    throw new Error(error);
  }
});

//Get single user
const getWishList = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const findUser = await Users.findById(_id).populate('wishList');
    res.status(200).json({
      status: 200,
      findUser: findUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const userCart = asyncHandler(async (req, res) => {
  const { cart } = req.body;
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    let products = [];
    const findUser = await Users.findById(_id);
    //check if user is already have prouct in cart
    const alreadyExistCart = await Carts.findOne({ orderby: findUser._id });
    if (alreadyExistCart) {
      alreadyExistCart.remove();
    }
    for (let i = 0; i < cart.length; i++) {
      let obj = {};
      obj.product = cart[i]._id;
      obj.count = cart[i].count;
      obj.color = cart[i].color;
      let getPrice = await Products.findById(cart[i]._id)
        .select('price')
        .exec();
      obj.price = getPrice.price;
      products.push(obj);
    }
    let cartTotal = 0;
    for (let i = 0; i < products.length; i++) {
      cartTotal = cartTotal + products[i].price * products[i].count;
    }
    let newCart = await new Carts({
      products,
      cartTotal,
      orderby: findUser?._id,
    }).save();
    res.status(200).json({
      status: 200,
      newCart: newCart,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getUserCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const cart = await Carts.findOne({ orderby: _id }).populate(
      'products.product'
    );
    res.status(200).json({
      status: 200,
      cart: cart,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const emptyCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const user = await Users.findOne({ _id });
    const cart = await Carts.findOneAndRemove({ orderby: user._id });
    res.status(200).json({
      status: 200,
      cart: cart,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const applyCoupon = asyncHandler(async (req, res) => {
  const { coupon } = req.body;
  const { _id } = req.user;
  validateMongoDbId(_id);
  const validCoupon = await Coupons.findOne({ name: coupon });
  if (validCoupon === null) {
    throw new Error('Invalid Coupon');
  }
  const user = await Users.findOne({ _id });
  let { products, cartTotal } = await Carts.findOne({
    orderby: user._id,
  }).populate('products.product');
  let totalAfterDiscount = (
    cartTotal -
    (cartTotal * validCoupon.discount) / 100
  ).toFixed(2);
  await Carts.findOneAndUpdate(
    { orderby: user._id },
    { totalAfterDiscount },
    { new: true }
  );
  res.status(200).json({
    status: 200,
    totalAfterDiscount,
  });
});

const createOrder = asyncHandler(async (req, res) => {
  const { COD, couponApplied } = req.body;
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    if (!COD) throw new Error('Create cash order failed.');
    const user = await Users.findOne(_id);
    let userCart = await Carts.findOne({ orderby: user._id });
    let finalAmount = 0;
    if (couponApplied && userCart.totalAfterDiscount) {
      finalAmount = userCart.totalAfterDiscount * 100;
    } else {
      finalAmount = userCart.cartTotal * 100;
    }

    let newOrder= await new Orders({
      products: userCart.products,
      paymentIntent:{
        _id
      }
    })
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createUser,
  login,
  loginAdmin,
  logout,
  handlerRefreshToken,
  getAllUsers,
  getUser,
  updateUser,
  updatePassword,
  forgotPasswordToken,
  resetPassword,
  blockUser,
  unBlockUser,
  deleteUser,
  getWishList,
  saveUserAddress,
  userCart,
  getUserCart,
  emptyCart,
  applyCoupon,
};
