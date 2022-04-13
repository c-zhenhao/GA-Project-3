import { createSlice } from "@reduxjs/toolkit";

const prefStoreSlice = createSlice({
  name: "prefStore",
  initialState: {
    genderPref: "both",
    agePref: [24, 46],
    interestedPref: [],
  },
  reducers: {
    setGenderPref(state, action) {
      state.genderPref = action.payload;
    },
    setAgePref(state, action) {
      state.agePref = action.payload;
    },
    setinterestedPref(state, action) {
      state.interestedPref = action.payload;
    },
  },
});

export const prefStoreActions = prefStoreSlice.actions;
export default prefStoreSlice.reducer;
