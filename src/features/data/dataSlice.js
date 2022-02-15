import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";

// Helpers
import formatData from "../../helpers/formatData";

// Config
import { BASE_URL } from "../../config";

const dataAdapter = createEntityAdapter({ selectId: (entity) => entity.date, sortComparer: (a, b) => b.date.localeCompare(a.date) });

export const fetchData = createAsyncThunk("data/fetchData", async (startDate) => {
  try {
    const response = await fetch(`${BASE_URL}${startDate}`);

    if (response.ok) {
      const fetchedData = await response.json();
      const data = formatData(fetchedData);
      return data;
    } else {
      throw new Error(`${response.status} Bad Request`);
    }
  } catch (error) {
    console.error(error);
  }
});

const dataSlice = createSlice({
  name: "data",
  initialState: dataAdapter.getInitialState({ error: null }),
  reducers: {
    toggleLike: (state, action) => {
      dataAdapter.updateOne(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        dataAdapter.addMany(state, action.payload);
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { toggleLike } = dataSlice.actions;
export const { selectAll: selectAllData, selectById: selectByDataId } = dataAdapter.getSelectors((state) => state.data);

export default dataSlice.reducer;
