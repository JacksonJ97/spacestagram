import { createSlice } from "@reduxjs/toolkit";
import { getUnixTime } from "date-fns";

// Helpers
import getStartDate from "../../helpers/getStartDate";

const currentDate = new Date();
const currentTimestamp = getUnixTime(currentDate);
const { timestamp: initialStartDateTimestamp, param: initialStartDateParam } = getStartDate(currentTimestamp);

const startDateSlice = createSlice({
  name: "date",
  initialState: { timestamp: initialStartDateTimestamp, param: initialStartDateParam },
  reducers: {
    nextStartDate: (state) => {
      const { timestamp: nextStartDateTimestamp, param: nextStartDateParam } = getStartDate(state.timestamp);
      state.timestamp = nextStartDateTimestamp;
      state.param = nextStartDateParam;
    },
  },
});

export const { nextStartDate } = startDateSlice.actions;

export default startDateSlice.reducer;
