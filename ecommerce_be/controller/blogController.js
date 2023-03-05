const asyncHandler = require('express-async-handler');
const fs = require('fs');
const Blogs = require('../model/blogModel');
const cloudinaryUploadImg = require('../utils/cloudinary');
const validateMongoDbId = require('../utils/validateMongodbid');

const createBlog = asyncHandler(async (req, res) => {
  try {
    const newBlog = await Blogs.create(req.body);
    res.status(201).json({
      status: 201,
      message: 'Blog created successfully.',
      newBlog: newBlog,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getAllBlogs = asyncHandler(async (req, res) => {
  try {
    const listBlogs = await Blogs.find();
    res.status(200).json({
      status: 200,
      results: listBlogs.length,
      listBlogs: listBlogs,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getBlog = await Blogs.findById(id).populate('likes');
    await Blogs.findByIdAndUpdate(id, { $inc: { numViews: 1 } }, { new: true });
    res.status(200).json({
      status: 200,
      getBlog: getBlog,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const updateBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updateBlog = await Blogs.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({
      status: 200,
      message: 'Blog updated successfully.',
      updateBlog: updateBlog,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const deleteBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deleteBlog = await Blogs.findByIdAndDelete(id);
    res.status(200).json({
      status: 200,
      message: 'Blog deleted successfully.',
      deleteBlog: deleteBlog,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const likeBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.body;
  validateMongoDbId(blogId);

  //Find the blog which you want to be liked
  const blog = await Blogs.findById(blogId);
  //Find the login user
  const loginUserId = req?.user?._id;
  //Find if the user has liked the blog
  const isLiked = blog?.isLiked;
  //Find if the user has disliked the blog
  const alreadyDisLiked = blog?.dislikes?.find(
    (userId) => userId?.toString() === loginUserId?.toString()
  );
  if (alreadyDisLiked) {
    const blog = await Blogs.findByIdAndUpdate(
      blogId,
      {
        $pull: { dislikes: loginUserId },
        isDisliked: false,
      },
      { new: true }
    );
    res.json({
      message: 'unDisliked blog.',
      blog: blog,
    });
  }
  if (isLiked) {
    const blog = await Blogs.findByIdAndUpdate(
      blogId,
      {
        $pull: { likes: loginUserId },
        isLiked: false,
      },
      { new: true }
    );
    res.json({
      message: 'Disliked blog.',
      blog: blog,
    });
  } else {
    const blog = await Blogs.findByIdAndUpdate(
      blogId,
      {
        $push: { likes: loginUserId },
        isLiked: true,
      },
      { new: true }
    );
    res.json({
      message: 'Liked blog.',
      blog: blog,
    });
  }
});

const dislikeBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.body;
  validateMongoDbId(blogId);

  //Find the blog which you want to be liked
  const blog = await Blogs.findById(blogId);
  //Find the login user
  const loginUserId = req?.user?._id;
  //Find if the user has liked the blog
  const isDisLiked = blog?.isDisliked;
  //Find if the user has disliked the blog
  const alreadyLiked = blog?.likes?.find(
    (userId) => userId?.toString() === loginUserId?.toString()
  );
  if (alreadyLiked) {
    const blog = await Blogs.findByIdAndUpdate(
      blogId,
      {
        $pull: { likes: loginUserId },
        isLiked: false,
      },
      { new: true }
    );
    res.json(blog);
  }
  if (isDisLiked) {
    const blog = await Blogs.findByIdAndUpdate(
      blogId,
      {
        $pull: { dislikes: loginUserId },
        isDisliked: false,
      },
      { new: true }
    );
    res.json({
      message: 'Liked blog.',
      blog: blog,
    });
  } else {
    const blog = await Blogs.findByIdAndUpdate(
      blogId,
      {
        $push: { dislikes: loginUserId },
        isDisliked: true,
      },
      { new: true }
    );
    res.json({
      message: 'Disliked blog.',
      blog: blog,
    });
  }
});

const uploadImages = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const uploader = (path) => cloudinaryUploadImg(path, 'images');
    const urls = [];
    const files = req.files;
    for (const file of files) {
      const { path } = file;
      const newpath = await uploader(path);
      urls.push(newpath);
      fs.unlinkSync(path);
    }
    const findBlog = await Blogs.findByIdAndUpdate(
      id,
      {
        images: urls.map((file) => {
          return file;
        }),
      },
      { new: true }
    );
    res.status(200).json({
      status: 200,
      findBlog: findBlog,
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createBlog,
  getAllBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
  likeBlog,
  dislikeBlog,
  uploadImages,
};
