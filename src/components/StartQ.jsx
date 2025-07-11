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
      className={`min-h-screen max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-10 transition-all ${
        isDark ? "text-white bg-[#121212]" : "text-black bg-white"
      }`}
    >
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-orange-500">
        🧠 {quiz.course?.title || "Untitled"} Quiz
      </h2>

      <form className="space-y-6 sm:space-y-8">
        {quiz.questions.map((q, idx) => (
          <fieldset
            key={idx}
            className={`rounded-xl border p-4 sm:p-6 transition-all ${
              isDark ? "bg-[#1e1e1e] border-gray-700" : "bg-gray-50 border-gray-200"
            }`}
          >
            <legend className="font-semibold text-base sm:text-lg mb-4">
              {idx + 1}. {q.question}
            </legend>

            <div className="flex flex-col gap-3">
              {q.options.map((opt, i) => (
                <label
                  key={i}
                  className="flex items-center gap-3 cursor-pointer text-sm sm:text-base"
                >
                  <input
                    type="radio"
                    name={`q-${idx}`}
                    value={opt}
                    checked={answers[idx] === opt}
                    onChange={() => handleChange(idx, opt)}
                    className="accent-orange-500 w-4 h-4"
                    required
                  />
                  {opt}
                </label>
              ))}
            </div>
          </fieldset>
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
