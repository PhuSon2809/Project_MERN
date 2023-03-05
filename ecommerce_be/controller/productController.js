const asyncHandler = require('express-async-handler');
const slugify = require('slugify');
const Products = require('../model/productModel');
const Users = require('../model/userModel');

const createProduct = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const newProduct = await Products.create(req.body);
    res.status(201).json({
      status: 201,
      message: 'Product created successfully',
      newProduct: newProduct,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getAllProducts = asyncHandler(async (req, res) => {
  try {
    //Filtering
    const queryObj = { ...req.query };
    const excludeFields = ['page', 'sort', 'limit', 'fields'];
    excludeFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = Products.find(JSON.parse(queryStr));

    //Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    //Limiting the fields
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }

    //Pagination
    const page = req.query.page;
    const limit = req.query.limit;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);
    if (req.query.page) {
      const productCount = await Products.countDocuments();
      if (skip >= productCount) {
        throw new Error('This page is not available');
      }
    }

    const listProducts = await query;
    res.status(200).json({
      status: 200,
      results: listProducts.length,
      listProducts: listProducts,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const findProduct = await Products.findById(id);
    res.status(200).json({
      status: 200,
      product: findProduct,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const productUpdate = await Products.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(202).json({
      status: 202,
      message: 'Product updated successfully',
      productUpdate: productUpdate,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const productDelete = await Products.findByIdAndDelete(id);
    res.status(202).json({
      status: 200,
      message: 'Product deleted successfully',
      productDelete: productDelete,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const addToWishList = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { prodId } = req.body;
  try {
    const user = await Users.findById(_id);
    const alreadyAdded = user.wishList.find((id) => id.toString() === prodId);
    if (alreadyAdded) {
      let user = await Users.findByIdAndUpdate(
        _id,
        {
          $pull: { wishList: prodId },
        },
        { new: true }
      );
      res.status(200).json({
        status: 200,
        user: user,
      });
    } else {
      let user = await Users.findByIdAndUpdate(
        _id,
        {
          $push: { wishList: prodId },
        },
        { new: true }
      );
      res.status(200).json({
        status: 200,
        user: user,
      });
    }
  } catch (error) {
    throw new Error(error);
  }
});

const rating = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { star, comment, prodId } = req.body;
  try {
    const product = await Products.findById(prodId);
    let alreadyRated = product.ratings.find(
      (userId) => userId.postedby.toString() === _id.toString()
    );
    if (alreadyRated) {
      const updateRating = await Products.updateOne(
        {
          ratings: { $elemMatch: alreadyRated },
        },
        { $set: { 'ratings.$.star': star, 'ratings.$.comment': comment } },
        { new: true }
      );
    } else {
      const rateProduct = await Products.findByIdAndUpdate(
        prodId,
        {
          $push: {
            ratings: {
              star: star,
              comment: comment,
              postedby: _id,
            },
          },
        },
        { new: true }
      );
    }
    const getallRatings = await Products.findById(prodId);
    let totalRating = getallRatings.ratings.length;
    let ratingSum = getallRatings.ratings
      .map((item) => item.star)
      .reduce((prev, curr) => (prev + curr), 0);
    let actualRating = Math.round(ratingSum / totalRating); //Math.round sẽ làm tròn giá trị trung bình
    let finalProduct = await Products.findByIdAndUpdate(
      prodId,
      { totalrating: actualRating },
      { new: true }
    );
    res.status(200).json({
      status: 200,
      finalProduct: finalProduct,
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  addToWishList,
  rating,
};
