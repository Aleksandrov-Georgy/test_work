import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const fetchData = createApi({
  reducerPath: 'fetchData',
  tagTypes: ['posts', 'comments', 'dataUser'],

  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),

  endpoints: (build) => ({
    getPosts: build.query({
      // { page, dataLimit }
      query: () => `/posts?_page=${1}&_limit=${10}`,
      providesTags: ['posts'],
    }),
    getPostsScroll: build.query({
      query: (page) =>
        `/posts?_page=${page}&_limit=${localStorage.getItem('limitPosts')}`,
      providesTags: ['posts'],
    }),

    getUsers: build.query({
      query: () => `/users`,
      providesTags: ['dataUser'],
    }),
  }),
});

export const { useGetPostsQuery, useGetUsersQuery, useLazyGetPostsScrollQuery } = fetchData;
