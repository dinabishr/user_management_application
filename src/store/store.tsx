import { configureStore } from "@reduxjs/toolkit";
import inputReducer from "./inputSlice";
import  usersReducer  from "./arraySlice";


const store = configureStore({
  reducer: {
    input: inputReducer,
    users: usersReducer,
  },
});



export default store;

//get the current state of users array
export const selectUsers = (state: RootState) => state.users.users;

//get the root state type from the store
export type RootState = ReturnType<typeof store.getState>;