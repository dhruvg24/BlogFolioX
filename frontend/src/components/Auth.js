import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
// import { send } from "process";
// axios for sending the data to backend, its JS Library to make HTTP Req from nodejs from browser
const Auth = () => {
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

  const sendRequest = async ()=> {
    // post will have params as the url, json object i.e. to be sent, post returns a promise
    const res = await axios.post("http://localhost:3000/api/user/login", {
        email : inputs.email, 
        password : inputs.password
    }).catch((err)=>console.log(err))

    // data received from response
    const data = await res.data;
    return data;
  }
  const handleSubmit = (e)=>{
    e.preventDefault();
    // need this to handle and process form without making entire page getting loaded again
    console.log(inputs)
    sendRequest();
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
