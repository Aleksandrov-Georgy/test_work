import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const fetchData = createApi({
  reducerPath: 'fetchData',
  tagTypes: ['posts', 'comments', 'dataUser'],

  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),

  endpoints: (build) => ({
    getPostsScroll: build.query({
      query: (page) => `/posts?_page=${page}&_limit=${localStorage.getItem('limitPosts')}`,
      providesTags: ['posts'],
    }),

    getUsers: build.query({
      query: () => `/users`,
      providesTags: ['comments'],
    }),
    getCommentsPost: build.query({
      query: ({ id }) => `/posts/${id}/comments`,
      providesTags: ['dataUser'],
    }),
    getDeletePost: build.mutation({
      query: (id) => ({
        url: `/posts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['posts'],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetUsersQuery,
  useLazyGetPostsScrollQuery,
  useLazyGetCommentsPostQuery,
  useGetDeletePostMutation,
} = fetchData;

// addPost: builder.mutation({
//   query: (body) => ({
//     url: '/posts',
//     method: 'POST',
//     body,
//   }), // Добавление поста
//   invalidatesTags: ['Posts'],
