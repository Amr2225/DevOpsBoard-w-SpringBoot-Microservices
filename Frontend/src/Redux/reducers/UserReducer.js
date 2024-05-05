import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
    isAuthed: false,
    token: null,
  },
  reducers: {
    setData: (state, action) => {
      state.userData = action.payload;
    },
    setAuth: (state, action) => {
      state.isAuthed = action.payload;
    },
    setAuthToken: (state, action) => {
      state.token = action.payload;
      const user = jwtDecode(state.token);
      state.userData = {
        email: user.email,
        id: user.nameid,
        userName: user.unique_name,
        role: user.role,
        exp: user.exp,
      };
      state.isAuthed = true;
    },
    removeAuthToken: (state) => {
      state.userData = null;
      state.token = null;
      state.isAuthed = false;
    },
  },
});

export const { setData, setAuth, setAuthToken, removeAuthToken } = userSlice.actions;

export default userSlice.reducer;
