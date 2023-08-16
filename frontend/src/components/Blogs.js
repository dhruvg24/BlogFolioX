import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "./BlogCard";

const Blogs = () => {
  // need state for blogs
  const [blogs, setBlogs] = useState();
  // need to get all blogs, using axios can geet request and useEffect would help to render component once dependency array changes

  const sendRequest = async () => {
    const res = await axios
      .get("http://localhost:3080/api/blog")
      .catch((err) => console.log(err));
    const data = await res.data;
    
    return data;
  };
  useEffect(() => {
    sendRequest().then((data) => setBlogs(data.blogs));
    // data.blogs sent from backend
  }, []);
  console.log(blogs);

  return (
    <div>
      {blogs &&
        blogs.map((blog, index) => (
          <BlogCard
            title={blog.title}
            description={blog.description}
            imageURL={blog.image}
            userName={blog.user.name}
          />
        ))}
    </div>
  );
};

export default Blogs;
