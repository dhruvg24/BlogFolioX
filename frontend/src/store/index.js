// will contain all data(states)
import { configureStore, createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
  },
  // reducer function
  reducers: {
    // action creators
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
    },
  },
});

// need to export action creators as well
export const authActions = authSlice.actions;

// exporting the reducer function of store which will handle state of the redux

export const store = configureStore({
  reducer: authSlice.reducer,
});
