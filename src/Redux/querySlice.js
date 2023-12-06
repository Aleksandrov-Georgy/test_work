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
    addNewPost: build.mutation({
      query: (body) => ({
        url: `/posts`,
        method: 'POST',
        body,
      }),
    }),
    editPost: build.mutation({
      query: ({ title, body, idEditPost }) => ({
        url: `/posts/${idEditPost}`,
        method: 'PATCH',
        body: {
          title,
          body,
        },
      }),
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetUsersQuery,
  useLazyGetPostsScrollQuery,
  useLazyGetCommentsPostQuery,
  useGetDeletePostMutation,
  useAddNewPostMutation,
  useEditPostMutation,
} = fetchData;

// addPost: builder.mutation({
//   query: (body) => ({
//     url: '/posts',
//     method: 'POST',
//     body,
//   }), // Добавление поста
//   invalidatesTags: ['Posts'],
