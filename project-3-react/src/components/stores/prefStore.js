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
    setAllPref(state, action) {
      console.log(action.payload);
      state.genderPref = action.payload.gender ? action.payload.gender : "both";
      state.agePref =
        action.payload.ageMin && action.payload.ageMax
          ? [action.payload.ageMin, action.payload.ageMax]
          : [24, 46];
      state.interestedPref = action.payload.interested ? action.payload.interested : [];
    },
  },
});

export const prefStoreActions = prefStoreSlice.actions;
export default prefStoreSlice.reducer;
