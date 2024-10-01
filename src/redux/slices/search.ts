import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISearch } from "../../types/painting";

interface searchState {
  searchStatus: ISearch[];
  isLoading: boolean;
  error: string | null;
}

const initialState: searchState = {
  searchStatus: [],
  isLoading: false,
  error: "",
};


const searchSlice = createSlice({
  name: "theme",
  initialState,
  reducers: { 
    setSearchStatus: (state, action: PayloadAction<ISearch[]>) => {
      state.searchStatus = action.payload;
    },
  },
});

export const { setSearchStatus } = searchSlice.actions

export default searchSlice.reducer;