import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const bitfinexApi = createApi({
  reducerPath: 'bitfinexApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '',
  }),
  endpoints: (builder) => ({
    getAllTickers: builder.query({
      query: () => '/v2/tickers?symbols=ALL',
    }),
  }),
});

export const { useGetAllTickersQuery } = bitfinexApi;