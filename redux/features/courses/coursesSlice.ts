import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  responseUpdateWatched: {},
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    updateRespTimeWatched: (state: any, action: PayloadAction) => {
      state.responseUpdateWatched = action.payload;
    },
  },
});

export const { updateRespTimeWatched } = coursesSlice.actions;
export default coursesSlice.reducer;