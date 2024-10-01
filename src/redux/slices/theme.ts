import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface themeState {
  theme: string;
  isLoading: boolean;
  error: string | null;
}

const getTheme = () => {
  const theme = `${window?.localStorage?.getItem('theme')}`
  if ([ 'light', 'dark' ].includes(theme)) return theme

  const userMedia = window.matchMedia('(prefers-color-scheme: light)')
  if (userMedia.matches) return 'light'

  return 'dark'
}

const initialState: themeState = {
  theme: getTheme(),
  isLoading: false,
  error: "",
};


const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: { 
    setTheme: (state, action: PayloadAction<string>) => {
      state.theme = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions

export default themeSlice.reducer;