import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";

// Helpers
import formatData from "../../helpers/formatData";

// Config
import { BASE_URL } from "../../config";

const dataAdapter = createEntityAdapter({ selectId: (entity) => entity.date, sortComparer: (a, b) => b.date.localeCompare(a.date) });

export const fetchData = createAsyncThunk("data/fetchData", async (startDate) => {
  const response = await fetch(`${BASE_URL}${startDate}`);
  const fetchedData = await response.json();
  const data = formatData(fetchedData);
  return data;
});

export const fetchMoreData = createAsyncThunk("data/fetchMoreData", async (startDate) => {
  const response = await fetch(`${BASE_URL}${startDate}`);
  const fetchedData = await response.json();
  const data = formatData(fetchedData);
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
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        dataAdapter.upsertMany(state, action.payload);
      })
      .addCase(fetchMoreData.fulfilled, (state, action) => {
        dataAdapter.upsertMany(state, action.payload);
      });
  },
});

export const { toggleLike } = dataSlice.actions;
export const { selectAll: selectAllData, selectById: selectByDataId } = dataAdapter.getSelectors((state) => state.data);

export default dataSlice.reducer;
