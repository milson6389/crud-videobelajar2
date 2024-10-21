import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user";
import courseReducer from "./slices/course";
import trxReducer from "./slices/trx";

const reducer = {
  user: userReducer,
  course: courseReducer,
  trx: trxReducer,
};

const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  devTools: true,
});

export default store;
