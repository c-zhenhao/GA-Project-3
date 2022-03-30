import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import userReducer from "./user";
import loaderReducer from "./loader";

const localStorageMiddleware = ({ getState }) => {
  return (next) => (action) => {
    const result = next(action);
    localStorage.setItem("localState", JSON.stringify(getState()));
    return result;
  };
};

const reStore = () => {
  if (localStorage.getItem("localState") !== null) {
    return JSON.parse(localStorage.getItem("localState"));
  }
};

const store = configureStore({
  reducer: { user: userReducer, auth: authReducer, loader: loaderReducer },
  preloadedState: reStore(),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware),
});

export default store;
