// src/api/course.api.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import API from './api';



// GET all courses
export const getCourses = createAsyncThunk(
  'courses/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get(import.meta.env.VITE_API_BASE_URL +'/course/courese');
       console.log("res.corese" , res);
      return res.data;
     
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// GET course by ID
export const getCourseById = createAsyncThunk(
  'courses/getById',
  async (courseId, { rejectWithValue }) => {
    try {
      const res = await API.get(`${BASE_URL}/${courseId}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// CREATE course
export const createCourse = createAsyncThunk(
  'courses/create',
  async (courseData, { rejectWithValue }) => {
    try {
      const res = await API.post(import.meta.env.VITE_API_BASE_URL + '/course', courseData);
      console.log("res.createCourse" , res);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// DELETE course
export const deleteCourse = createAsyncThunk(
  'courses/delete',
  async (courseId, { rejectWithValue }) => {
    try {
      const res = await API.delete(`${BASE_URL}/${courseId}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
