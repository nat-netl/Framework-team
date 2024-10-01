import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { paintingAPISlice } from "../services/PaintingsService";
import paintingsSlice from "../slices/paintings";
import themeSlice from "../slices/theme";
import searchSlice from "../slices/search";

const reducers = {
  paintings: paintingsSlice,
  theme: themeSlice,
  search: searchSlice,
  [paintingAPISlice.reducerPath]: paintingAPISlice.reducer,
};

const rootReducer = combineReducers({
  ...reducers,
});

const setupStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(paintingAPISlice.middleware),
  });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
export default setupStore;
