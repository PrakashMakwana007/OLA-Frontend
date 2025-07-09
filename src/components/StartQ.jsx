import React, { useEffect, useState } from "react";
import API from "../api/api";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const StartQuiz = () => {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const isDark = useSelector((state) => state.theme.theme) === "dark";
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

  if (loading) return <div className="text-center py-10">Loading quiz...</div>;

  return (
    <div
      className={`min-h-screen max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-10 transition-all ${
        isDark ? "text-white bg-[#121212]" : "text-black bg-white"
      }`}
    >
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-orange-500">
        {quiz.course?.title} Quiz
      </h2>

      <form className="space-y-8">
        {quiz.questions.map((q, idx) => (
          <div
            key={idx}
            className={`p-4 sm:p-6 rounded-lg shadow-md ${
              isDark ? "bg-[#1e1e1e]" : "bg-gray-100"
            }`}
          >
            <p className="font-semibold text-base sm:text-lg mb-4">
              {idx + 1}. {q.question}
            </p>
            <div className="flex flex-col gap-2">
              {q.options.map((opt, i) => (
                <label key={i} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name={`q-${idx}`}
                    value={opt}
                    checked={answers[idx] === opt}
                    onChange={() => handleChange(idx, opt)}
                    className="mr-3"
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={handleSubmit}
          className="mt-8 w-full py-3 bg-orange-500 text-white rounded-md font-semibold hover:bg-orange-600 transition"
        >
          🚀 Submit Quiz
        </button>
      </form>
    </div>
  );
};

export default StartQuiz;
