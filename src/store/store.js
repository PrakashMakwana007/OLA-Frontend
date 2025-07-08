// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice.js';        
import themeReducer from './theamSlice.js';       
import corseReducer from './coreseSlice'; 
import quizReducer from './quizSlice.js'; // Import the quiz reducer
export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,  
    corse : corseReducer,    
    quiz : quizReducer
  },                  
});
