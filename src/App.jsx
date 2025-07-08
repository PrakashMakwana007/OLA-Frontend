import React from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CoursePage from "./pages/Corese";
import CourseList from "./components/CoreseLayout";
import UploadedCourses from "./components/Mycorses";
import ProtectedRoute from "./components/Protect.Routs";
import CreateQuiz from "./components/CrateQuiz";
import MyQuizzes from "./components/Myquiz";
import QuizList from "./components/QuizList";
import StartQuiz from "./components/StartQ";
import QuizRes from "./components/quizRes";

function App() {
  const dispatch = useDispatch();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 p-6">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* 🔒 Now protected */}
          <Route
            path="/corselist"
            element={
              <ProtectedRoute>
                <CourseList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-quizzes"
            element={
              <ProtectedRoute>
                <MyQuizzes />
              </ProtectedRoute>
            }
          />
          <Route
            path="/quiz-list"
            element={
              <ProtectedRoute>
                <QuizList />
              </ProtectedRoute>
            }
          />

          {/* Other Protected Routes */}
          <Route
            path="/courses"
            element={
              <ProtectedRoute>
                <CoursePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mycourses"
            element={
              <ProtectedRoute>
                <UploadedCourses />
              </ProtectedRoute>
            }
          />
          <Route
            path="/quiz"
            element={
              <ProtectedRoute>
                <CreateQuiz />
              </ProtectedRoute>
            }
          />
          <Route
            path="/quiz/:quizId"
            element={
              <ProtectedRoute>
                <StartQuiz />
              </ProtectedRoute>
            }
          />
          <Route
            path="/quiz-result"
            element={
              <ProtectedRoute>
                <QuizRes />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main> 

      <Footer />
    </div>
  );
}

export default App;
