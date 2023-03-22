import { createSlice } from "@reduxjs/toolkit";
import Axios from "axios";

const dbSlice = createSlice({
  name: "db",
  initialState: {
    userAcc: "",
    loggedIn: false,
    role: "",
    reload: 0,
    address: "0xD42822Bc322FF1CaC29528424C3D34c07D3110E5",
  },
  reducers: {
    reload(state, action) {
      state.reload += 1;
    },
    userAccount(state, action) {
      state.userAcc = action.payload;
    },
    logIn(state, action) {
      state.loggedIn = true;
    },
    role(state, action) {
      state.role = action.payload;
    },
  },
});

export const dbActions = dbSlice.actions;

export default dbSlice;
