import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { useNavigate } from "react-router-dom";
// import { send } from "process";
// axios for sending the data to backend, its JS Library to make HTTP Req from nodejs from browser
const Auth = () => {
  //to navigate bw pages as soon as action done
  const navigate = useNavigate();
  // to update the state of redux as well
  const dispatch = useDispatch();
  // to render the inputs of form
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isSignedUp, setIsSignedUp] = useState(false);

  const handleChange = (e)=>{
    setInputs((prevState)=>({
        ...prevState,
        [e.target.name] : e.target.value,
    })
  )}

  const sendRequest = async (type= "login")=> {
    // post will have params as the url, json object i.e. to be sent, post returns a promise
    const res = await axios.post(`http://localhost:3080/api/user/${type}`, {
      // backend is at port 3080
        name : inputs.name,
        email : inputs.email, 
        password : inputs.password
    }).catch((err)=>console.log(err))

    // data received from response
    const data = await res.data;

    console.log(data);
    return data;
  }
  const handleSubmit = (e)=>{
    e.preventDefault();
    // need this to handle and process form without making entire page getting loaded again
    console.log(inputs)
    // check whther signedup if so then then we send req
    if(isSignedUp){
      // localStorage for saving the user id even after refresh
      sendRequest("signup").then((data)=>localStorage.setItem("userId", data.user._id)).then(()=>navigate("/blogs")).then(()=>dispatch(authActions.login())).then((data)=>console.log(data));
      // state of redux updated as well
    }
    else{
      // by default login
      sendRequest().then((data)=>localStorage.setItem("userId", data.user._id)).then(()=>navigate("/blogs")).then(()=>dispatch(authActions.login())).then((data)=>console.log(data));
    }
    // cors needed -(Cross origin req and data)
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* input fields from material UI */}
        <Box
          maxWidth={400}
          display="flex"
          flexDirection={"column"}
          alignItems="center"
          justifyContent={"center"}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin="auto"
          marginTop={5}
          borderRadius={5}
        >
          <Typography variant="h4" textAlign="center">
            {!isSignedUp ? "Login" : "Signup"}
          </Typography>
          {isSignedUp && (
            <TextField name = "name" onChange={handleChange} value={inputs.name} placeholder="Name" margin="normal" />
          )}
          <TextField
            name = "email"
            onChange={handleChange}
            value={inputs.email}
            type={"email"}
            placeholder="Email"
            margin="normal"
          />
          <TextField
            name = "password"
            onChange={handleChange}
            value={inputs.password}
            type={"password"}
            placeholder="Password"
            margin="normal"
          />
          <Button
            type = "submit"
            variant="contained"
            sx={{ borderRadius: 3, marginTop: 3 }}
            color="warning"
          >
            Submit
          </Button>
          <Button
            onClick={() => setIsSignedUp(!isSignedUp)}
            sx={{ borderRadius: 3 }}
          >
            Change to {isSignedUp ? "Login" : "Signup"}
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Auth;
