import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "../features/data/dataSlice";
import startDateReducer from "../features/startDate/startDateSlice";

export default configureStore({
  reducer: {
    data: dataReducer,
    startDate: startDateReducer,
  },
});
