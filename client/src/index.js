import React from "react";
import ReactDOM from "react-dom/client";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import App from "./App";
import { Provider } from "react-redux";
import topicalReducer from "./reducers/topicalReducer";
import adminUserReducer from "./reducers/adminUserReducer";
import appointmentDateReducer from "./reducers/appointmentDateReducer";
import appointmentAllBookersReducer from "./reducers/appointmentAllBookersReducer";
import appointmentRightBooker from "./reducers/appointmentRightBooker";
import appointmentDateTodayReducer from "./reducers/appointmentDateTodayReducer";
import appointmentTimeChosenReducer from "./reducers/appointmentTimeChosenReducer";
import loggingReducer from "./reducers/loggingReducer";
import gameBuddyUserReducer from "./reducers/gameBuddyUserReducer";
import gameBuddiesReducer from "./reducers/gameBuddiesReducer";
import bookerInfoUserReducer from "./reducers/bookerInfoUserReducer";
import bookerInfoUserInfoReducer from "./reducers/bookerInfoUserInfoReducer";
import bookerInfoUserReservationsReducer from "./reducers/bookerInfoUserReservationsReducer";
import bookerInfoShowUserInfoReducer from "./reducers/bookerInfoShowUserInfoReducer";
import bookerInfoUpdateUserInfoReducer from "./reducers/bookerInfoUpdateUserInfoReducer";
import arrowReducer from "./reducers/arrowReducer";

// TODO : lisää combineReducers https://redux.js.org/usage/writing-tests

const store = configureStore({
  reducer: {
    topical: topicalReducer,
    admin: adminUserReducer,
    appointmentDate: appointmentDateReducer,
    appointmentAllBookers: appointmentAllBookersReducer,
    appointmentRightBooker: appointmentRightBooker,
    appointmentDateToday: appointmentDateTodayReducer,
    appointmentTimeChosen: appointmentTimeChosenReducer,
    logging: loggingReducer,
    gameBuddyUser: gameBuddyUserReducer,
    gameBuddies: gameBuddiesReducer,
    user: bookerInfoUserReducer,
    userInfo: bookerInfoUserInfoReducer,
    userReservations: bookerInfoUserReservationsReducer,
    showUserInfo: bookerInfoShowUserInfoReducer,
    updateUserInfo: bookerInfoUpdateUserInfoReducer,
    arrow: arrowReducer,
  },
});

// console.log(store.getState());

ReactDOM.createRoot(
  document.getElementById("root") || document.createElement("div")
).render(
  <Provider store={store}>
    <App />
  </Provider>
);
