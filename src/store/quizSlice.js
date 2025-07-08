import { createSlice } from '@reduxjs/toolkit';
import { getQuiz, createQuiz, deleteQuiz } from '../api/quiz.api';

const quizSlice = createSlice({
  name: 'quiz',
  initialState: {
    quizData: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getQuiz.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getQuiz.fulfilled, (state, action) => {
        state.loading = false;
        state.quizData = action.payload;
      })
      .addCase(getQuiz.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createQuiz.fulfilled, (state, action) => {
        state.quizData = action.payload;
      })

      .addCase(deleteQuiz.fulfilled, (state, action) => {
        state.quizData = null; // or remove it from list if you're maintaining one
      });
  },
});

export default quizSlice.reducer;
