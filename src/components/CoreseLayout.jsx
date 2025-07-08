import React, { useEffect, useState } from 'react';
import API from '../api/api';
import { useSelector } from 'react-redux';
import './CourseList.css'; // ⬅ custom CSS for flip effect

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const isDark = useSelector((state) => state.theme.theme === 'dark');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await API.get(`${import.meta.env.VITE_API_BASE_URL}/course/courese`);
        setCourses(res.data.data || []);
      } catch (err) {
        console.error('Failed to fetch courses:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className={`max-w-7xl mx-auto p-6 mt-6 ${isDark ? 'text-gray-100 bg-[#121212]' : 'text-gray-900 bg-white'}`}>
      <h2 className="text-3xl font-bold mb-6 text-center text-orange-500">🎓 Available Courses</h2>

      {loading ? (
        <p className="text-center">Loading courses...</p>
      ) : courses.length === 0 ? (
        <p className="text-center text-red-500">No courses available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course._id} className="flip-card">
              <div className="flip-card-inner">
                {/* Front */}
                <div className={`flip-card-front ${isDark ? 'bg-blue-500 text-white' : 'bg-white text-black'} border rounded-xl shadow p-4`}>
                  <img
                    src={`${import.meta.env.VITE_LOCAL_URL}/${course.thumbnail.replace(/\\/g, '/')}`}
                    alt={course.title}
                    className="w-24 h-24 rounded-full object-cover border mx-auto mb-3"
                  />
                  <h3 className="text-lg font-bold text-center">{course.title}</h3>
                </div>

                {/* Back */}
                <div className={`flip-card-back ${isDark ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'} border rounded-xl shadow p-4`}>
                  <h4 className="text-lg font-semibold mb-2">📖 Description</h4>
                  <p className="text-sm mb-3 max-h-32 overflow-y-auto">
                    {course.description}
                  </p>
                  {course.lessons?.length > 0 ? (
                    <a
                      href={course.lessons[0].videoURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm underline text-blue-500"
                    >
                      ▶ Watch First Lesson
                    </a>
                  ) : (
                    <p className="italic text-sm text-gray-400">No lessons available</p>
                  )}
                  {/* <p className="mt-2 text-xs text-right italic text-gray-500">
                    👨‍🏫 By {course.teacherId?.userName || 'Unknown'}
                  </p> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseList;
