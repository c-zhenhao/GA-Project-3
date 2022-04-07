import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import userReducer from "./user";
import loaderReducer from "./loader";

const localStorageMiddleware = ({ getState }) => {
  return (next) => (action) => {
    const result = next(action);
    localStorage.setItem("onlyFriends", JSON.stringify(getState()));
    return result;
  };
};

const reStore = () => {
  if (localStorage.getItem("onlyFriends") !== null) {
    return JSON.parse(localStorage.getItem("onlyFriends"));
  }
};

const store = configureStore({
  reducer: { user: userReducer, auth: authReducer, loader: loaderReducer },
  preloadedState: reStore(),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware),
});

export default store;
