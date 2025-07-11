import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createQuiz } from "../api/quiz.api";
import API from "../api/api";
import { useNavigate } from "react-router-dom";


const QuestionForm = React.memo(({ index, question, onQuestionChange, onOptionChange, inputClasses }) => (
  <div className="p-4 rounded-lg border shadow-sm space-y-3 bg-opacity-20">
    <h4 className="font-semibold text-orange-500">Question {index + 1}</h4>
    <input
      type="text"
      value={question.question}
      onChange={(e) => onQuestionChange(index, "question", e.target.value)}
      placeholder="Type your question here..."
      className={inputClasses}
      required
    />
    {question.options.map((opt, j) => (
      <input
        key={j}
        type="text"
        value={opt}
        onChange={(e) => onOptionChange(index, j, e.target.value)}
        placeholder={`Option ${j + 1}`}
        className={inputClasses}
        required
      />
    ))}
    <input
      type="text"
      value={question.answer}
      onChange={(e) => onQuestionChange(index, "answer", e.target.value)}
      placeholder="Correct Answer"
      className={inputClasses}
      required
    />
  </div>
));

const CreateQuiz = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [courses, setCourses] = useState([]);
  const [courseId, setCourseId] = useState("");
  const [questions, setQuestions] = useState([
    { question: "", options: ["", "", "", ""], answer: "" },
  ]);
  const [fetchingCourses, setFetchingCourses] = useState(true);

  const { loading } = useSelector((state) => state.quiz);
  const { user } = useSelector((state) => state.auth);
  const isDark = useSelector((state) => state.theme.theme === "dark");

  const fetchCourses = useCallback(async () => {
    try {
      const res = await API.get(`${import.meta.env.VITE_API_BASE_URL}/course/courese`);
      const uploaded = res.data.data.filter(c => c.teacherId?._id === user?._id);
      setCourses(uploaded);
    } catch (err) {
      console.error("Failed to load courses", err);
    } finally {
      setFetchingCourses(false);
    }
  }, [user]);

  useEffect(() => {
    if (user?._id) fetchCourses();
  }, [fetchCourses, user]);

  const handleQuestionChange = useCallback((index, field, value) => {
    setQuestions(prev => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  }, []);

  const handleOptionChange = useCallback((qIndex, optIndex, value) => {
    setQuestions(prev => {
      const updated = [...prev];
      updated[qIndex].options[optIndex] = value;
      return updated;
    });
  }, []);

  const addQuestion = () => {
    setQuestions([...questions, { question: "", options: ["", "", "", ""], answer: "" }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!courseId) return alert("Please select a course.");
    if (questions.length === 0) return alert("Add at least one question");

    try {
      await dispatch(createQuiz({ courseId, questions })).unwrap();
      alert("🎉 Quiz created successfully!");
      setCourseId("");
      setQuestions([{ question: "", options: ["", "", "", ""], answer: "" }]);
    } catch (err) {
      alert(err.message || "Failed to create quiz");
    }
  };

  const inputClasses = `w-full p-2 border rounded focus:ring-2 focus:outline-none ${
    isDark
      ? "bg-[#2a2a2a] border-gray-700 text-white placeholder-white focus:ring-orange-400"
      : "bg-gray-50 border-orange-300 text-black placeholder-black focus:ring-orange-500"
  }`;

  const buttonClasses = `rounded-full px-6 py-2 font-semibold shadow-md transition-transform duration-300 ${
    isDark
      ? "bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 text-black"
      : "bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-400 text-white"
  } hover:scale-105 hover:shadow-lg`;

  return (
    <div className={`min-h-screen px-4 sm:px-6 md:px-8 py-10 max-w-3xl mx-auto rounded-xl shadow transition-all ${
      isDark ? "bg-[#1e1e1e] text-white" : "bg-white text-black"
    }`}>
      <h2 className="text-3xl font-bold mb-8 text-center text-orange-500">📝 Create a New Quiz</h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Course Selection */}
        <div>
          <label className="block mb-1 font-medium">Select Course</label>
          {fetchingCourses ? (
            <div className="text-sm text-gray-400">Loading courses...</div>
          ) : (
            <select
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              className={inputClasses}
              required
            >
              <option value="">-- Select Course --</option>
              {courses.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.title}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Question Inputs */}
        <div className="space-y-6">
          {questions.map((q, i) => (
            <QuestionForm
              key={i}
              index={i}
              question={q}
              onQuestionChange={handleQuestionChange}
              onOptionChange={handleOptionChange}
              inputClasses={inputClasses}
            />
          ))}
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <button type="button" onClick={addQuestion} className={buttonClasses}>
            ➕ Add Question
          </button>
          <button type="submit" disabled={loading} className={`${buttonClasses} disabled:opacity-60`}>
            {loading ? "Creating..." : "🚀 Create Quiz"}
          </button>
        </div>

        <div className="text-center mt-8">
          <button
            type="button"
            onClick={() => navigate("/my-quizzes")}
            className={buttonClasses}
          >
            📋 View My Quizzes
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateQuiz;
