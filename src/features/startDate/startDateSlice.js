import { createSlice } from "@reduxjs/toolkit";

// Helpers
import getStartDate from "../../helpers/getStartDate";

const { date: initialStartDate, param: initialStartDateParam } = getStartDate(new Date());

const startDateSlice = createSlice({
  name: "date",
  initialState: { date: initialStartDate, param: initialStartDateParam },
  reducers: {
    nextStartDate: (state, action) => {
      const { date: nextStartDate, param: nextStartDateParam } = getStartDate(state.date);
      return { date: nextStartDate, param: nextStartDateParam };
    },
  },
});

export const { nextStartDate } = startDateSlice.actions;

export default startDateSlice.reducer;
