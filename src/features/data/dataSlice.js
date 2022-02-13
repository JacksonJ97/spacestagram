import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";

// Helpers
import testFormatData from "../../helpers/testFormatData";

// Config
import { BASE_URL } from "../../config";

const dataAdapter = createEntityAdapter({ selectId: (entity) => entity.date, sortComparer: (a, b) => b.date.localeCompare(a.date) });

export const fetchData = createAsyncThunk("data/fetchData", async () => {
  const response = await fetch(`${BASE_URL}2022-02-08`);
  const fetchedData = await response.json();
  const data = testFormatData(fetchedData);
  return data;
});

const dataSlice = createSlice({
  name: "data",
  initialState: dataAdapter.getInitialState(),
  reducers: {
    toggleLike: (state, action) => {
      dataAdapter.updateOne(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      dataAdapter.upsertMany(state, action.payload);
    });
  },
});

export const { toggleLike } = dataSlice.actions;
export const { selectAll: selectAllData } = dataAdapter.getSelectors((state) => state.data);

export default dataSlice.reducer;
