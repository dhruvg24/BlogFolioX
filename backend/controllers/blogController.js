import BlogSchema from "../model/BlogSchema";
import UserSchema from "../model/UserSchema";
import mongoose from "mongoose";
export const getAllBlogs = async (req, res, next) => {
  let blogs;
  try {
    blogs = await BlogSchema.find().populate('user');
    // to get the user associated with blog as well
  } catch (err) {
    console.log(err);
  }
  if (!blogs) {
    return res.status(404).json({ message: "No Blogs found" });
  }
  return res.status(200).json({ blogs });
};

// add blog
export const addBlog = async (req, res, next) => {
  const { title, description, image, user } = req.body;
  // user will have some id
  // need to validate whether existing user on website
  let existingUser;
  try {
    existingUser = await UserSchema.findById(user);
  } catch (err) {
    return console.log(err);
  }
  if (!existingUser) {
    return res
      .send(400)
      .json({ message: "Unable to find the User by this ID" });
  }
  const blog = new BlogSchema({
    title,
    description,
    image,
    user,
  });
  try {
    // async task
    // await blog.save(); instead we need to have the current blog getting added to the blogs array of that particular user -> start session
    const session = await mongoose.startSession();
    session.startTransaction();
    await blog.save({ session });
    // this session is saved in blog
    // now add blog to blogs array of existingUser
    existingUser.blogs.push(blog);
    await existingUser.save({ session });
    await session.commitTransaction();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }
  return res.status(200).json({
    blog,
  });
};

export const updateBlog = async (req, res, next) => {
  // need to grab the id as well from mongodb to know which blog is to be updated
  const { title, description } = req.body;
  const blogId = req.params.id;
  let blog;
  try {
    blog = await BlogSchema.findByIdAndUpdate(blogId, {
      //update part
      title,
      description,
    });
  } catch (err) {
    return console.log(err);
  }
  if (!blog) {
    return res.status(500).json({ message: "Unable to update the blog" });
  }
  return res.status(200).json({ blog });
};

export const getByID = async (req, res, next) => {
  const id = req.params.id;
  let blog;
  try {
    blog = await BlogSchema.findById(id);
  } catch (err) {
    return console.log(err);
  }
  if (!blog) {
    return res.status(404).json({ message: "No blog found" });
  }
  return res.status(200).json({ blog });
};

export const deleteBlog = async (req, res, next) => {
  // grab the id
  const id = req.params.id;
  let blog;
  try {
    blog = await BlogSchema.findByIdAndRemove(id).populate("user");
    // by popluating it will contain the user object as well
    await blog.user.blogs.pull(blog);
    // this will pull the blog from blogs array in user schema

    // we also need to save the user after creating the pull
    await blog.user.save();
  } catch (err) {
    console.log(err);
  }
  if (!blog) {
    return res.status(500).json({ message: "Unable to Delete" });
  }
  return res.status(200).json({ message: "Successfully deleted" });
};

export const getByUserId = async (req, res, next) => {
  const userId = req.params.id;
  let userBlogs;
  try {
    userBlogs = await UserSchema.findById(userId).populate("blogs");
    // this will also have blog object
  } catch (err) {
    return console.log(err);
  }
  if (!userBlogs) {
    return res.status(404).json({ message: "No blog found" });
  }
  return res.status(200).json({ user: userBlogs });
 
};
