import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import profileReducer from "./profile";
import prefStoreReducer from "./prefStore";
import loaderReducer from "./loader";

const localStorageMiddleware = ({ getState }) => {
  return (next) => (action) => {
    const result = next(action);
    // console.log(getState().user);
    localStorage.setItem(
      "onlyFriends",
      JSON.stringify({
        user: getState().user,
        profile: getState().profile,
        prefStore: getState().prefStore,
      })
    );
    return result;
  };
};

const reStore = () => {
  if (localStorage.getItem("onlyFriends") !== null) {
    return { ...JSON.parse(localStorage.getItem("onlyFriends")) };
  }
};

const store = configureStore({
  reducer: {
    user: userReducer,
    profile: profileReducer,
    prefStore: prefStoreReducer,
    loader: loaderReducer,
  },
  preloadedState: reStore(),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware),
});

export default store;
