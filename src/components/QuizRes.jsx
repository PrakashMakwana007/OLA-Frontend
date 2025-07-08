// src/components/QuizRes.jsx
import React from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { CheckCircle, XCircle } from "lucide-react";

const QuizRes = () => {
  const { state } = useLocation();
  const isDark = useSelector((state) => state.theme.theme) === "dark";

  if (!state || !state.quiz || !state.quiz.questions) {
    return <div className="text-center mt-10 text-lg">No quiz result available or data incomplete.</div>;
  }

  const { score, answers, submittedAt, quiz } = state;

  return (
    <div className={`max-w-4xl mx-auto p-6 ${isDark ? "text-gray-100" : "text-gray-900"}`}>
      <h2 className="text-3xl font-bold mb-6 text-center">📊 Your Quiz Result</h2>

      <div className={`p-4 rounded-lg shadow-md border mb-8 ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"}`}>
        <p className="text-lg"><strong>📘 Quiz:</strong> {quiz?.course?.title || "Untitled"}</p>
        <p className="text-lg"><strong>✅ Score:</strong> {score} / {answers?.length || 0}</p>
        <p className="text-lg"><strong>🕒 Submitted:</strong> {new Date(submittedAt).toLocaleString()}</p>
      </div>

      <h3 className="text-xl font-semibold mb-4">📝 Answer Review</h3>

      <div className="space-y-6">
        {quiz.questions.map((q, idx) => {
          const userAnswer = answers?.[idx]?.selectedOption || "Not answered";
          const correctAnswer = answers?.[idx]?.correctAnswer;
          const isCorrect = answers?.[idx]?.isCorrect;

          return (
            <div
              key={idx}
              className={`p-4 rounded-md shadow border ${
                isCorrect
                  ? isDark
                    ? "border-green-400 bg-green-800 bg-opacity-10"
                    : "border-green-500 bg-green-100"
                  : isDark
                  ? "border-red-400 bg-red-800 bg-opacity-10"
                  : "border-red-500 bg-red-100"
              }`}
            >
              <p className="font-medium text-lg mb-2">
                {idx + 1}. {q.question}
              </p>

              <p className="mb-1 flex items-center">
                <strong>Your Answer:</strong>
                <span className="ml-2">{userAnswer}</span>
                {isCorrect ? (
                  <CheckCircle className="ml-2 text-green-500 w-5 h-5" />
                ) : (
                  <XCircle className="ml-2 text-red-500 w-5 h-5" />
                )}
              </p>

              {!isCorrect && (
                <p className="text-sm">
                  <strong>Correct Answer:</strong>{" "}
                  <span className={`${isDark ? "text-green-300" : "text-green-700"}`}>
                    {correctAnswer}
                  </span>
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuizRes;
