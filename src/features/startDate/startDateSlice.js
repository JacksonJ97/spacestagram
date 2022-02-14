import { createSlice } from "@reduxjs/toolkit";

// Helpers
import getStartDate from "../../helpers/getStartDate";

const { date: startDate, param: startDateParam } = getStartDate(new Date());

const startDateSlice = createSlice({
  name: "date",
  initialState: { date: startDate, param: startDateParam },
  reducers: {
    nextStartDate: (state, action) => {
      const { date, param } = getStartDate(state.date);
      return { date, param };
    },
  },
});

export const { nextStartDate } = startDateSlice.actions;
export default startDateSlice.reducer;
