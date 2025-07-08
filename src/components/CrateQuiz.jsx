import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createQuiz } from "../api/quiz.api";
import API from "../api/api"; // to fetch teacher's courses
import { useNavigate } from "react-router-dom";
const CreateQuiz = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [courses, setCourses] = useState([]);
  const [courseId, setCourseId] = useState("");
  const [questions, setQuestions] = useState([
    { question: "", options: ["", "", "", ""], answer: "" },
  ]);

  const { loading } = useSelector((state) => state.quiz);
  const isDark = useSelector((state) => state.theme.theme) === "dark";
  const { user } = useSelector((state) => state.auth);

  // Fetch teacher's uploaded courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await API.get(
          `${import.meta.env.VITE_API_BASE_URL + "/course/courese"}`
        );
        const uploaded = res.data.data.filter(
          (c) => c.teacherId?._id === user?._id
        );
        setCourses(uploaded);
      } catch (err) {
        console.error("Failed to load courses", err);
      }
    };

    if (user?._id) fetchCourses();
  }, [user]);

  const handleQuestionChange = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[optIndex] = value;
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", options: ["", "", "", ""], answer: "" },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!courseId) return alert("Please select a course.");
    if (questions.length === 0) return alert("Add at least one question");

    try {
      await dispatch(createQuiz({ courseId, questions })).unwrap();
      alert("Quiz created successfully!");
      setCourseId("");
      setQuestions([{ question: "", options: ["", "", "", ""], answer: "" }]);
    } catch (err) {
      alert(err.message || "Failed to create quiz");
    }
  };

  const inputClasses = `w-full p-2 border rounded text-center ${
    isDark
      ? "bg-[#2a2a2a] border-gray-700 text-white placeholder-white"
      : "bg-gray-50 text-black placeholder-black"
  }`;

  const buttonClasses = `rounded-full px-6 py-2 font-semibold shadow-md transition-transform duration-300 ${
    isDark
      ? "bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 text-black"
      : "bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-400 text-white"
  } hover:scale-105 hover:shadow-lg`;

  return (
    <div
      className={`max-w-3xl mx-auto p-6 rounded-xl shadow ${
        isDark ? "bg-[#1e1e1e] text-white" : "bg-white text-black"
      }`}
    >
      <h2 className="text-2xl font-bold mb-6 text-center">📝 Create Quiz</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <select
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
          className={inputClasses}
        >
          <option value="">-- Select Course --</option>
          {courses.map((course) => (
            <option key={course._id} value={course._id}>
              {course.title}
            </option>
          ))}
        </select>

        {questions.map((q, i) => (
          <div
            key={i}
            className={`p-4 border rounded-lg space-y-3 ${
              isDark ? "bg-[#2a2a2a] border-gray-700" : "bg-gray-50"
            }`}
          >
            <input
              type="text"
              value={q.question}
              onChange={(e) =>
                handleQuestionChange(i, "question", e.target.value)
              }
              placeholder={`Question ${i + 1}`}
              className={inputClasses}
            />
            {q.options.map((opt, j) => (
              <input
                key={j}
                type="text"
                value={opt}
                onChange={(e) => handleOptionChange(i, j, e.target.value)}
                placeholder={`Option ${j + 1}`}
                className={inputClasses}
              />
            ))}
            <input
              type="text"
              value={q.answer}
              onChange={(e) =>
                handleQuestionChange(i, "answer", e.target.value)
              }
              placeholder="Correct Answer"
              className={inputClasses}
            />
          </div>
        ))}

        <div className="flex justify-between flex-wrap gap-4">
          <button type="button" onClick={addQuestion} className={buttonClasses}>
            ➕ Add Question
          </button>

          <button
            type="submit"
            disabled={loading}
            className={`${buttonClasses} disabled:opacity-50`}
          >
            {loading ? "Creating..." : "🚀 Create Quiz"}
          </button>
        </div>
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => navigate("/my-quizzes")}
            className={`${buttonClasses}`}
          >
            📋 Show My Quizzes
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateQuiz;
