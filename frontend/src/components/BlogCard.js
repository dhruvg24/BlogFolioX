import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
// import { red } from "@mui/material/colors";
import { Box } from "@mui/material";
// import { Icon } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BlogCard = ({ title, description, imageURL, userName, isUser, id }) => {
  const navigate = useNavigate();
  console.log(title, isUser);
  //   isUser is to check whether the curr user is the owner of the blog
  const handleEdit = (e) => {
    navigate(`/myBlogs/${id}`);
    // need to get the id as well
    // go to Blogs.js and get as props
  };
  const deleteRequest = async () => {
    const res = await axios
      .delete(`http://localhost:3080/api/blog/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  const handleDelete = () => {
    deleteRequest()
      .then(() => navigate("/"))
      .then(() => navigate("/blogs"));
    // this would render the component through navigation
  };

  return (
    <Card
      sx={{
        width: "40%",
        margin: "auto",
        mt: 2,
        padding: 2,
        boxShadow: "5px 5px 10px #ccc",
        ":hover:": {
          boxShadow: "10px 10px 20px #ccc",
        },
      }}
    >
      {isUser && (
        <Box display="flex">
          <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
            <EditIcon color="warning"/>
          </IconButton>
          <IconButton onClick={handleDelete}>
            <DeleteOutlineIcon color="error" />
          </IconButton>
        </Box>
      )}
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
            {userName.charAt(0)}
          </Avatar>
        }
        title={title}
        // ***need to add date and time of creation of blog***
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img"
        height="194"
        image={imageURL}
        alt="Paella dish"
      />

      <CardContent>
        <hr />
        <br />
        <Typography variant="body2" color="text.secondary">
          <b>{userName}</b> {": "}
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
