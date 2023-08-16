import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
const labelStyles = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" };

const BlogDetails = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState();
  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const [blog, setBlog] = useState();
  // we get the id of blog to be updated from url itself as /myBlogs/:id
  const id = useParams().id;
  console.log(id);

  const fetchDetails = async () => {
    const res = await axios
      .get(`http://localhost:3080/api/blog/${id}`)
      .catch((err) => console.log(err));
    const data = res.data;
    return data;
  };
  useEffect(() => {
    // after use effect need to have some state as well
    fetchDetails().then((data) => {
      setBlog(data.blog);
      setInputs({
        title: data.blog.title,
        description: data.blog.description,
      });
    });
  }, [id]);
  // whenever id changes component renders

  // need to send request to backend after updating -> put request as in routes
  const sendRequest = async () => {
    const res = await axios
      .put(`http://localhost:3080/api/blog/update/${id}`, {
        title: inputs.title,
        description: inputs.description
      })
      .catch(err => console.log(err));
    const data = await res.data;
    return data;
  };
  console.log(blog);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    // again sendRequest called after updation completed
    sendRequest().then((data) => console.log(data)).then(()=>navigate("/myBlogs/"));
  };

  return (
    <div>
      {inputs && (
        <form onSubmit={handleSubmit}>
          <Box
            border={3}
            padding={3}
            margin={"auto"}
            marginTop={3}
            borderColor="linear-gradient(90deg, rgba(58,75,180,1) 2%, rgba(116, 49, 110, 1) 36%,rgba(2,0,161,1) 73%, rgba(69,92,252,1) 100%)"
            borderRadius={10}
            boxShadow="10px 10px 20px #ccc"
            display="flex"
            flexDirection={"column"}
            width={"80%"}
          >
            <Typography
              fontWeight={"bold"}
              padding={3}
              color="grey"
              variant="h2"
              textAlign={"center"}
            >
              Post Your Blog
            </Typography>
            <InputLabel sx={labelStyles}>Title</InputLabel>
            <TextField
              name="title"
              onChange={handleChange}
              value={inputs.title}
              margin="normal"
              variant="outlined"
            />

            <InputLabel sx={labelStyles}>Description</InputLabel>
            <TextField
              name="description"
              onChange={handleChange}
              value={inputs.description}
              margin="normal"
              variant="outlined"
            />

            <Button
              sx={{ mt: 2, borderRadius: 4 }}
              variant="contained"
              color="warning"
              type="submit"
            >
              Submit
            </Button>
          </Box>
        </form>
      )}
    </div>
  );
};

export default BlogDetails;
