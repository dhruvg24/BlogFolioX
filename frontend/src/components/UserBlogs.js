// this will be the individual user blogs
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import BlogCard from './BlogCard';
const UserBlogs = () => {
  // first get the id of the user from localStorage
  const id = localStorage.getItem("userId");
  const[user, setUser] = useState();
  const sendRequest =async() => {
    const res = await axios.get(`http://localhost:3080/api/blog/user/${id}`).catch(err=>console.log(err))

    // get data
    const data = await res.data;
    return data;
  }
  useEffect(()=>{
    // need to save data -> need some state
    sendRequest().then((data)=>setUser(data.user))
    // blogs.blogs will contain the blogs of particular user
  }, [])
  console.log(user)
  return (
    <div>
      {user && user.blogs &&
        user.blogs.map((blog, index) => (
          <BlogCard 
            key = {index}
            title={blog.title}
            description={blog.description}
            imageURL={blog.image}
            userName={user.name}
          />
        ))}
    </div>
  )
}

export default UserBlogs