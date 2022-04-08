import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    username: "",
    userId: null,
  },
  reducers: {
    usernameChange(state, action) {
      state.username = action.payload.trim();
    },
    login(state, action) {
      state.userId = action.payload;
    },
    logout(state) {
      state.username = "";
      state.userId = null;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
