import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user.slice";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

type RootState = {
  user: ReturnType<typeof userReducer>;
};

type AppDispatch = typeof store.dispatch;

export type { RootState, AppDispatch };
export default store;
