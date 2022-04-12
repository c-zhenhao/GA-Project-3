import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    displayName: "",
    imgUrl: "",
    gender: "",
    age: "",
    height: "",
    interests: [],
  },
  reducers: {
    displayNameChange(state, action) {
      state.displayName = action.payload;
    },
    imgUrlChange(state, action) {
      state.imgUrl = action.payload;
    },
    genderChange(state, action) {
      state.gender = action.payload;
    },
    ageChange(state, action) {
      state.age = action.payload;
    },
    heightChange(state, action) {
      state.height = action.payload;
    },
    // interestsChange(state, action) {
    //   state.interestsChange = action.payload;
    // },
    allChange(state, action) {
      state.displayName = action.payload.displayName;
      state.imgUrl = action.payload.imgUrl;
      state.gender = action.payload.gender;
      state.age = action.payload.age;
      state.height = action.payload.height;
      state.interests = action.payload.interests;
    },
  },
});

export const profileActions = profileSlice.actions;
export default profileSlice.reducer;
