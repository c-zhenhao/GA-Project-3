import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    username: "",
    userId: null,
    imgUrl: null,
  },
  reducers: {
    usernameChange(state, action) {
      state.username = action.payload.trim();
    },
    login(state, action) {
      state.userId = action.payload.userId;
      state.imgUrl = action.payload.imgUrl;
    },
    logout(state) {
      state.username = "";
      state.userId = null;
      state.imgUrl = null;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
