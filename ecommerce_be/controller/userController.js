const Users = require('../model/userModel');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../config/jwtToken');
const validateMongoDbId = require('../utils/validateMongodbid');
const { generateRefreshToken } = require('../config/refreshToken');

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

module.exports = {
  createUser,
  login,
  logout,
  handlerRefreshToken,
  getAllUsers,
  getUser,
  updateUser,
  blockUser,
  unBlockUser,
  deleteUser,
};
