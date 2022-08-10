import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentComments: null,
  loading: false,
  error: false,
};

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.currentComments = action.payload;
      //   state.currentComments.sort((a, b) => {
      //     return b.updatedAt - a.updatedAt;
      //   });
      state.currentComments.reverse();
    },
    addComment: (state, action) => {
      state.currentComments.unshift(action.payload);
    },
    deleteComment: (state, action) => {
      state.currentComments = state.currentComments.filter(
        (comment, index) => comment._id !== action.payload._id
      );
    },
    editComment: (state, action) => {
      state.currentComments.map((comment) => {
        if (comment._id === action.payload.id) {
          comment.desc = action.payload.desc;
        }
      });
    },
  },
});

export const { editComment, addComment, deleteComment, fetchSuccess } =
  commentSlice.actions;

export default commentSlice.reducer;
