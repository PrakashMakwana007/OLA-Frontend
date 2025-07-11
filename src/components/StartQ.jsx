import React, { useEffect, useState } from "react";
import API from "../api/api";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const StartQuiz = () => {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const isDark = useSelector((state) => state.theme.theme === "dark");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await API.get(`${import.meta.env.VITE_API_BASE_URL}/quiz/${quizId}`);
        setQuiz(res.data.data);
        setAnswers(res.data.data.questions.map(() => ""));
      } catch (err) {
        console.error("Error loading quiz:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [quizId]);

  const handleChange = (index, option) => {
    const updated = [...answers];
    updated[index] = option;
    setAnswers(updated);
  };

  const handleSubmit = async () => {
    if (answers.includes("")) {
      alert("🚫 Please answer all questions before submitting.");
      return;
    }

    try {
      const responsePayload = answers.map((option, index) => ({
        questionIndex: index,
        selectedOption: option,
      }));

      const res = await API.post(`${import.meta.env.VITE_API_BASE_URL}/quiz/submit`, {
        quizId,
        answers: responsePayload,
      });

      const resultData = res.data.data;
      resultData.quiz = quiz;
      navigate("/quiz-result", { state: resultData });
    } catch (err) {
      console.error("Submission failed:", err);
    }
  };

  if (loading) {
    return <div className="text-center py-10 text-lg">⏳ Loading quiz...</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`min-h-screen max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-10 rounded-lg shadow-inner transition-all ${
        isDark
          ? "bg-[#121212] text-white"
          : "bg-gradient-to-br from-white via-orange-50 to-white text-black"
      }`}
    >
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-orange-500">
        🧠 {quiz.course?.title || "Untitled"} Quiz
      </h2>

      <form className="space-y-8">
        {quiz.questions.map((q, idx) => (
          <div
            key={idx}
            className={`rounded-xl shadow-md border-2 transition-all p-5 sm:p-6 ${
              isDark
                ? "bg-[#1e1e1e] border-orange-600"
                : "bg-white border-orange-300"
            }`}
          >
            <legend className="font-semibold text-base sm:text-lg mb-4 text-orange-500">
              {idx + 1}. {q.question}
            </legend>

            <div className="grid sm:grid-cols-2 gap-4">
              {q.options.map((opt, i) => (
                <label
                  key={i}
                  className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-all duration-200 ${
                    answers[idx] === opt
                      ? isDark
                        ? "bg-orange-600 text-white"
                        : "bg-orange-100 border-orange-500"
                      : isDark
                      ? "border-gray-700 bg-[#2a2a2a]"
                      : "border-gray-300 bg-gray-50"
                  }`}
                >
                  <input
                    type="radio"
                    name={`q-${idx}`}
                    value={opt}
                    checked={answers[idx] === opt}
                    onChange={() => handleChange(idx, opt)}
                    className="accent-orange-500 w-4 h-4"
                  />
                  <span className="text-sm sm:text-base">{opt}</span>
                </label>
              ))}
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={handleSubmit}
          className="mt-10 w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:brightness-110 hover:scale-105 transition-all duration-200"
        >
          🚀 Submit Quiz
        </button>
      </form>
    </motion.div>
  );
};

export default StartQuiz;
