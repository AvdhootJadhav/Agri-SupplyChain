import { createSlice } from "@reduxjs/toolkit";
import Axios from "axios";

const dbSlice = createSlice({
  name: "db",
  initialState: {
    userAcc: "",
    loggedIn: false,
    role: "",
    reload: 0,
    address: "0x7fDE515934a6e212f4f6d12E2ac64DD1755714a4",
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
