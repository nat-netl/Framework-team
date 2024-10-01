import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../constants/baseConstants";
import { IAuthor, ILocation, IPainting } from "../../types/painting";


interface IPainingsQuery {
  page?: number, 
  limit?:number, 
  search?: string
}

export const paintingAPISlice = createApi({
  tagTypes: ['IPainting'],
  reducerPath: "paintingsAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  refetchOnFocus: true,
  endpoints: (build) => ({
    fetchAllPaintings: build.query<IPainting[], IPainingsQuery>({
      query: ({page, limit, search}) => ({
        url: "paintings",
        params: {
          _page: page,
          _limit: limit,
          q: search
        }
      }),
      providesTags: (arg) => [{ type: 'IPainting', page: arg }],
    }),
    fetchPaintings: build.query<IPainting[], IPainingsQuery>({
      query: ({page}) => ({
        url: "paintings",
        params: {
          _page: page,
        }
      }),
      providesTags: (arg) => [{ type: 'IPainting', page: arg }],
    }),
    fetchLocationById: build.query<ILocation[], number>({
      query: (id: number) => ({
        url: "locations",
        params: {
          id
        }
      }),
    }),
    fetchAuthorById: build.query<IAuthor[], number>({
      query: (id: number) => ({
        url: "authors",
        params: {
          id
        }
      }),
    }),
  }),
});

export const {
  useFetchAllPaintingsQuery,
  useFetchPaintingsQuery,
  useFetchLocationByIdQuery,
  useFetchAuthorByIdQuery
} = paintingAPISlice;
