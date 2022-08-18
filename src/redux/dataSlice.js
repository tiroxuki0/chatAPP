import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rooms: [
    { label: "Developer" },
    { label: "Designer" },
    { label: "Data Analyst" },
    { label: "Hosting" },
  ],
  search: "",
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setStateSearch: (state, action) => {
      state.search = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setStateSearch } = dataSlice.actions;

export default dataSlice.reducer;
