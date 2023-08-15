import express from "express";
import {
  addBlog,
  deleteBlog,
  getAllBlogs,
  getByID,
  getByUserId,
  updateBlog,
} from "../controllers/blogController";

const blogRouter = express.Router();

blogRouter.get("/", getAllBlogs);
blogRouter.post("/add", addBlog);
blogRouter.put("/update/:id", updateBlog);
blogRouter.get("/:id", getByID);
blogRouter.delete("/:id", deleteBlog);
blogRouter.get("/user/:id", getByUserId);

export default blogRouter;
