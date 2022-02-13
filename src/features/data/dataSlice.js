import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { BASE_URL } from "../../config";
import testFormatData from "../../helpers/testFormatData";

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
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      dataAdapter.upsertMany(state, action.payload);
    });
  },
});

export default dataSlice.reducer;
