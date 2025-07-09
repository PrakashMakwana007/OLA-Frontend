import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import API from "../api/api";

const MyQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useSelector((state) => state.auth);
  const isDark = useSelector((state) => state.theme.theme) === "dark";

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const res = await API.get(`${import.meta.env.VITE_API_BASE_URL}/quiz`);
        const uploaded = res.data.data.filter(
          (quiz) => quiz?.course?.teacherId === user?._id
        );
        setQuizzes(uploaded);
      } catch (err) {
        console.error("Failed to load quizzes", err);
      } finally {
        setLoading(false);
      }
    };

    if (user?._id) fetchQuizzes();
  }, [user]);

  return (
    <div
      className={`min-h-screen max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-10 transition-all rounded-xl shadow ${
        isDark ? "bg-[#1e1e1e] text-white" : "bg-white text-black"
      }`}
    >
      <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center text-orange-500">
        📚 My Quizzes
      </h2>

      {loading ? (
        <p className="text-center text-lg">⏳ Loading quizzes...</p>
      ) : quizzes.length === 0 ? (
        <p className="text-center text-lg">🚫 No quizzes found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quizzes.map((quiz) => (
            <div
              key={quiz._id}
              className={`p-5 rounded-lg border shadow space-y-5 ${
                isDark
                  ? "bg-[#2a2a2a] border-gray-700"
                  : "bg-gray-100 border-gray-200"
              }`}
            >
              <h3 className="text-lg sm:text-xl font-semibold text-orange-400">
                📘 {quiz?.course?.title || "Untitled Course"}
              </h3>
              <p>📝 Total Questions: {quiz?.questions?.length || 0}</p>
              <p>
                📅 Created:{" "}
                {quiz?.createdAt
                  ? new Date(quiz.createdAt).toLocaleDateString()
                  : "N/A"}
              </p>

              <div className="space-y-4">
                {quiz.questions.map((q, i) => (
                  <div
                    key={i}
                    className={`p-4 rounded-md shadow-sm ${
                      isDark ? "bg-[#1a1a1a]" : "bg-white"
                    }`}
                  >
                    <h4 className="font-medium mb-2">
                      Q{i + 1}: {q.question}
                    </h4>
                    <ul className="list-disc pl-5 text-sm sm:text-base space-y-1">
                      {q.options.map((opt, idx) => (
                        <li key={idx}>{opt}</li>
                      ))}
                    </ul>
                    <p className="mt-2 text-sm font-semibold text-green-500">
                      ✅ Correct Answer: {q.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyQuizzes;
