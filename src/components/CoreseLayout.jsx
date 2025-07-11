import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import API from '../api/api';
import './CourseList.css'; // Flip card styles

const CourseList = React.memo(() => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const isDark = useSelector((state) => state.theme.theme === 'dark');

  const fetchCourses = useCallback(async () => {
    setLoading(true);
    try {
      const res = await API.get(`${import.meta.env.VITE_API_BASE_URL}/course/courese`);
      setCourses(res.data.data || []);
    } catch (err) {
      console.error('Failed to fetch courses:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  return (
    <div className={`max-w-7xl mx-auto p-6 mt-6 transition-all duration-300 ease-in-out ${isDark ? 'text-gray-100 bg-[#121212]' : 'text-gray-900 bg-white'}`}>
      <h2 className="text-3xl font-bold mb-6 text-center text-orange-500">🎓 Available Courses</h2>

      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="w-10 h-10 border-4 border-orange-400 border-dashed rounded-full animate-spin"></div>
        </div>
      ) : courses.length === 0 ? (
        <p className="text-center text-red-500">No courses available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course._id} className="w-full flex justify-center">
              <div className="flip-card w-full min-w-[250px] h-[320px] relative">
                <div className="flip-card-inner">
                  {/* Front Side */}
                  <div className={`flip-card-front ${isDark ? 'bg-orange-700 text-white' : 'bg-white text-black'} border rounded-xl shadow p-4`}>
                    <img
                      loading="lazy"
                      src={`${import.meta.env.VITE_LOCAL_URL}/${course.thumbnail?.replace(/\\/g, '/')}`}
                      alt={course.title}
                      onError={(e) => { e.target.src = '/default-course.jpg'; }}
                      className="w-24 h-24 rounded-full object-cover border mx-auto mb-3"
                    />
                    <h3 className="text-lg font-bold text-center">{course.title}</h3>
                  </div>

                  {/* Back Side */}
                  <div className={`flip-card-back ${isDark ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'} border rounded-xl shadow p-4`}>
                    <h4 className="text-lg font-semibold mb-2">📖 Description</h4>
                    <p className="text-sm mb-3 max-h-32 overflow-y-auto">{course.description}</p>

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
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

export default CourseList;
