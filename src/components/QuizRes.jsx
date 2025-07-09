import React from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { CheckCircle, XCircle } from "lucide-react";

const QuizRes = () => {
  const { state } = useLocation();
  const isDark = useSelector((state) => state.theme.theme) === "dark";

  if (!state || !state.quiz || !state.quiz.questions) {
    return (
      <div className="text-center mt-10 text-lg px-4">
        No quiz result available or data incomplete.
      </div>
    );
  }

  const { score, answers, submittedAt, quiz } = state;

  return (
    <div
      className={`min-h-screen max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-10 transition-all ${
        isDark ? "text-gray-100 bg-[#121212]" : "text-gray-900 bg-white"
      }`}
    >
      <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center text-orange-500">
        📊 Your Quiz Result
      </h2>

      <div
        className={`p-4 rounded-lg shadow-md border mb-10 text-sm sm:text-base ${
          isDark
            ? "bg-gray-800 border-gray-700"
            : "bg-gray-50 border-gray-300"
        }`}
      >
        <p className="mb-2">
          <strong>📘 Quiz:</strong> {quiz?.course?.title || "Untitled"}
        </p>
        <p className="mb-2">
          <strong>✅ Score:</strong> {score} / {answers?.length || 0}
        </p>
        <p>
          <strong>🕒 Submitted:</strong>{" "}
          {new Date(submittedAt).toLocaleString()}
        </p>
      </div>

      <h3 className="text-xl font-semibold mb-6 text-orange-400">
        📝 Answer Review
      </h3>

      <div className="space-y-6">
        {quiz.questions.map((q, idx) => {
          const userAnswer = answers?.[idx]?.selectedOption || "Not answered";
          const correctAnswer = answers?.[idx]?.correctAnswer;
          const isCorrect = answers?.[idx]?.isCorrect;

          return (
            <div
              key={idx}
              className={`p-4 rounded-md shadow border text-sm sm:text-base ${
                isCorrect
                  ? isDark
                    ? "border-green-400 bg-green-800 bg-opacity-10"
                    : "border-green-500 bg-green-100"
                  : isDark
                  ? "border-red-400 bg-red-800 bg-opacity-10"
                  : "border-red-500 bg-red-100"
              }`}
            >
              <p className="font-medium text-base mb-2">
                {idx + 1}. {q.question}
              </p>

              <p className="mb-1 flex items-center gap-x-2">
                <strong>Your Answer:</strong>
                <span>{userAnswer}</span>
                {isCorrect ? (
                  <CheckCircle className="text-green-500 w-5 h-5" />
                ) : (
                  <XCircle className="text-red-500 w-5 h-5" />
                )}
              </p>

              {!isCorrect && (
                <p className="text-sm">
                  <strong>Correct Answer:</strong>{" "}
                  <span
                    className={`font-semibold ${
                      isDark ? "text-green-300" : "text-green-700"
                    }`}
                  >
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
