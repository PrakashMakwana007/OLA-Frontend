import { createAsyncThunk } from '@reduxjs/toolkit';
import API from './api';

 export   const getQuiz = createAsyncThunk(
        'quiz/getQuiz',
        async( courseId, { rejectWithValue }) => {
            try {
                const response = await API.get(
                    `${import.meta.env.VITE_QUIZ_BASE_URL}/${courseId}`
                );
                return response.data;
            } catch (error) {
                return rejectWithValue(error.response?.data || error.message);
            }
        }
    )
   export const getQuizRes = createAsyncThunk(
  'quiz/getQuizRes',
  async ({ quizId, answers }, { rejectWithValue }) => {
    try {
      const response = await API.post(
        `${import.meta.env.VITE_QUIZ_BASE_URL}/submit`,
        { quizId, answers } // payload
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


   export const createQuiz = createAsyncThunk(
        'quiz/createQuiz',
        async( quizData, { rejectWithValue }) => {
            try {
                const response = await API.post(
                    import.meta.env.VITE_QUIZ_BASE_URL,
                    quizData
                );
                return response.data;
            } catch (error) {
                return rejectWithValue(error.response?.data || error.message);
            }
        }
    )

    export const deleteQuiz = createAsyncThunk(
  'quiz/deleteQuiz',
  async (quizId, { rejectWithValue }) => {
    try {
      const response = await API.delete(
        `${import.meta.env.VITE_QUIZ_BASE_URL}/${quizId}`
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);