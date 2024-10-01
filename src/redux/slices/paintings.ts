import { createSlice } from "@reduxjs/toolkit";
import { IPainting } from "../../types/painting";
import { paintingAPISlice } from "../services/PaintingsService";

interface paintingsState {
  paintings: IPainting[];
  isLoading: boolean;
  error: string | null;
}

const initialState: paintingsState = {
  paintings: [],
  isLoading: false,
  error: "",
};

const paintingsSlice = createSlice({
  name: "paintings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      paintingAPISlice.endpoints.fetchAllPaintings.matchFulfilled,
      (state, { payload }) => {
        state.paintings = [...payload];
      },
    );
  },
});

export default paintingsSlice.reducer;
