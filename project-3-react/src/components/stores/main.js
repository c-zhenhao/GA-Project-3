import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./profile";
import userReducer from "./user";
import loaderReducer from "./loader";

const localStorageMiddleware = ({ getState }) => {
  return (next) => (action) => {
    const result = next(action);
    // console.log(getState().user);
    localStorage.setItem("onlyFriends", JSON.stringify(getState().user));
    return result;
  };
};

const reStore = () => {
  if (localStorage.getItem("onlyFriends") !== null) {
    return { user: JSON.parse(localStorage.getItem("onlyFriends")) };
  }
};

const store = configureStore({
  reducer: { user: userReducer, profile: profileReducer, loader: loaderReducer },
  preloadedState: reStore(),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware),
});

export default store;
