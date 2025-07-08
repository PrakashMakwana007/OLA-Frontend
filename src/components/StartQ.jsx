// src/components/StartQuiz.jsx
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

      // ✅ Attach full quiz with questions
      resultData.quiz = quiz;

      // ✅ Navigate with result + full quiz
      navigate("/quiz-result", { state: resultData });
    } catch (err) {
      console.error("Submission failed:", err);
    }
  };

  if (loading) return <div className="text-center">Loading quiz...</div>;

  return (
    <div className={`max-w-4xl mx-auto p-6 ${isDark ? "text-white" : "text-black"}`}>
      <h2 className="text-2xl font-bold text-center mb-6">{quiz.course?.title} Quiz</h2>
      <form className="space-y-6">
        {quiz.questions.map((q, idx) => (
          <div key={idx} className="p-4 border rounded-md">
            <p className="font-semibold mb-2">{idx + 1}. {q.question}</p>
            {q.options.map((opt, i) => (
              <label key={i} className="block">
                <input
                  type="radio"
                  name={`q-${idx}`}
                  value={opt}
                  checked={answers[idx] === opt}
                  onChange={() => handleChange(idx, opt)}
                  className="mr-2"
                />
                {opt}
              </label>
            ))}
          </div>
        ))}
        <button
          type="button"
          onClick={handleSubmit}
          className="mt-6 w-full py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
        >
          Submit Quiz
        </button>
      </form>
    </div>
  );
};

export default StartQuiz;
