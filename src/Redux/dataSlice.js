import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  usersLoading: false,
  posts: [],
  limitPosts: 0,
  page: 1,
  isLoading: false,
};

export const dataPost = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setUsersLoading: (state, action) => {
      state.usersLoading = action.payload;
    },
    allPosts: (state, action) => {
      state.posts = action.payload;
    },
    loader: (state, action) => {
      state.isLoading = action.payload;
    },
    setLimitPosts: (state, action) => {
      state.limitPosts = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    addNewPost: (state, action) => {
      state.posts = [action.payload, ...state.posts];
    },
    updatePost: (state, action) => {
      const editPost = state.posts.find((post) => post.id === action.payload.id);

      editPost.title = action.payload.title;
      editPost.body = action.payload.body;
      editPost.id = action.payload.id;
      editPost.userId = action.payload.userId;
    },
  },
});

export const {
  allPosts,
  loader,
  setLimitPosts,
  setPage,
  setUsers,
  setUsersLoading,
  addNewPost,
  updatePost,
} = dataPost.actions;

export default dataPost.reducer;
