import React, { useEffect, useState } from "react";
import API from "../api/api";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const isDark = useSelector((state) => state.theme.theme === "dark");
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
    <div
      className={`min-h-screen px-4 sm:px-6 md:px-8 py-10 transition-all flex flex-col items-center ${
        isDark ? "bg-[#121212] text-white" : "bg-gray-50 text-black"
      }`}
    >
      <h2 className="text-3xl sm:text-4xl font-bold mb-10 text-center text-orange-500 tracking-tight font-[Inter]">
        🧠 Available Quizzes
      </h2>

      {loading ? (
        <p className="text-lg text-center">⏳ Loading quizzes...</p>
      ) : quizzes.length === 0 ? (
        <p className="text-lg text-center text-gray-400">🚫 No quizzes available.</p>
      ) : (
        <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map((quiz, index) => (
            <motion.div
              key={quiz._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`p-5 rounded-2xl border shadow-sm transition hover:shadow-xl duration-300 ease-in-out ${
                isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
              }`}
            >
              <h3 className="text-xl font-semibold mb-2 font-[Poppins] text-orange-500">
                📘 {quiz.course?.title || "Untitled Course"}
              </h3>
              <p className="mb-1 font-medium text-base">
                📝 Questions: {quiz.questions.length}
              </p>
              <p className="text-sm text-gray-400 mb-3">
                📅 Created on:{" "}
                {new Date(quiz.createdAt).toLocaleDateString()}
              </p>

              <button
                onClick={() => navigate(`/quiz/${quiz._id}`)}
                className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-orange-400 to-orange-600 text-white rounded-full font-semibold hover:brightness-110 hover:scale-105 transition-transform duration-200"
              >
                🚀 Start Quiz
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuizList;
