import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import React from "react";
import Auth from "./components/Auth";
import Blogs from "./components/Blogs";
import UserBlogs from "./components/UserBlogs";
import BlogDetails from "./components/BlogDetails";
import AddBlog from "./components/AddBlog";
import { useSelector } from "react-redux";

function App() {

  // using redux can grab the property whether user is logged in instead of creating useStates everytime
  // to grab state useSelector is used
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  console.log(isLoggedIn);
  return (
    <>
      <React.Fragment>
        <header>
          <Header />
        </header>
        <main>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path = "/blogs/add" element = {<AddBlog/>} />
            <Route path="/myBlogs" element={<UserBlogs />} />
            <Route path = "/myBlogs/:id" element = {<BlogDetails/>} />
          </Routes>
        </main>
      </React.Fragment>
    </>
  );
}

export default App;
