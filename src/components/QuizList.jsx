import React, { useEffect, useState } from "react";
import API from "../api/api";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const isDark = useSelector((state) => state.theme.theme) === "dark";
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const res = await API.get(`${import.meta.env.VITE_API_BASE_URL}/quiz`);
        setQuizzes(res.data.data);
      } catch (err) {
        console.error("Failed to fetch quizzes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  return (
    <div className={`min-h-screen px-4 py-10 flex flex-col items-center ${isDark ? "bg-[#121212] text-white" : "bg-gray-50 text-black"}`}>
      <h2 className="text-4xl font-bold mb-10 text-center font-[Inter] tracking-tight">
        🧠 Available Quizzes
      </h2>

      {loading ? (
        <p className="text-lg text-center">⏳ Loading quizzes...</p>
      ) : quizzes.length === 0 ? (
        <p className="text-lg text-center">🚫 No quizzes available.</p>
      ) : (
        <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map((quiz) => (
            <div
              key={quiz._id}
              className={`p-6 rounded-2xl border shadow transition hover:shadow-xl duration-300 ease-in-out ${
                isDark
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              }`}
            >
              <h3 className="text-xl font-semibold mb-2 font-[Poppins]">
                📘 {quiz.course?.title || "Untitled Course"}
              </h3>
              <p className="mb-1 font-medium">📝 Questions: {quiz.questions.length}</p>
              <p className="text-sm text-gray-400 mb-3">
                📅 Created on: {new Date(quiz.createdAt).toLocaleDateString()}
              </p>
              <button
                onClick={() => navigate(`/quiz/${quiz._id}`)}
                className="w-full mt-4 px-4 py-2 text-center bg-gradient-to-r from-orange-400 to-orange-600 text-white rounded-full font-semibold hover:brightness-110 transition duration-200 transform hover:scale-105"
              >
                🚀 Start Quiz
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuizList;
