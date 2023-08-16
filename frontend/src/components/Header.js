import React, { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store";
const Header = () => {
  const dispatch = useDispatch();

  const [value, setValue] = useState();
  // for tabs my blogs and all blogs

  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  return (
    <AppBar
      position="sticky"
      sx={{
        background:
          "linear-gradient(90deg, rgba(58,75,180,1) 2%, rgba(116, 49, 110, 1) 36%,rgba(2,0,161,1) 73%, rgba(69,92,252,1) 100%)",
      }}
    >
      {/* sx for styles in mui */}
      <Toolbar>
        <Typography variant="h4">BlogFolioX</Typography>

        {/* render box only when isLoggedIn from redux is true */}
        {isLoggedIn && (
          <Box display="flex" marginRight={"auto"} marginLeft={"auto"}>
            <Tabs
              textColor="inherit"
              value={value}
              onChange={(e, val) => setValue(val)}
            >
              {/* if we set value 0 then tab 0 will  get highlighted */}
              {/* like route and also contains indexes of child tabs*/}
              <Tab LinkComponent={Link} to="/blogs" label="All Blogs" />
              <Tab LinkComponent={Link} to="/myBlogs" label="My Blogs" />
            </Tabs>
          </Box>
        )}
        <Box display="flex" marginLeft="auto">
          {/* Box acts as div in mui */}
          {!isLoggedIn && (
            <>
              <Button
                LinkComponent={Link}
                to="/auth"
                variant="contained"
                sx={{ margin: 1, borderRadius: 10 }}
                color="warning"
              >
                Login
              </Button>
              <Button
                LinkComponent={Link}
                to="/auth"
                variant="contained"
                sx={{ margin: 1, borderRadius: 10 }}
                color="warning"
              >
                Signup
              </Button>
            </>
          )}

          {/* when user is logged in then only display the logout */}
          {isLoggedIn && (
            <Button
              onClick={() => dispatch(authActions.logout())}
              LinkComponent={Link}
              to="/auth"
              variant="contained"
              sx={{ margin: 1, borderRadius: 10 }}
              color="warning"
            >
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
