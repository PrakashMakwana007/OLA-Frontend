import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCourses } from '../api/corese.api';
import { motion } from 'framer-motion';

const UploadedCourses = () => {
  const dispatch = useDispatch();
  const { courses, loading, error } = useSelector((state) => state.corse);
  const user = useSelector((state) => state.auth.user);
  const isDark = useSelector((state) => state.theme.theme === 'dark');

  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);

  const uploadedCourses = courses.filter((course) => {
    const teacherId = typeof course.teacherId === 'object' ? course.teacherId._id : course.teacherId;
    return teacherId?.toString() === user?._id?.toString();
  });

  if (loading) return <p className="text-center py-6">Loading your uploaded courses...</p>;
  if (error) return <p className="text-center text-red-500 py-6">Error: {error}</p>;

  return (
    <div
      className={`min-h-screen px-4 sm:px-6 md:px-8 py-10 transition-all ${
        isDark ? 'bg-[#0f172a] text-white' : 'bg-white text-black'
      }`}
    >
      <h1 className="text-2xl sm:text-3xl font-bold mb-10 text-center text-orange-500">
        📦 My Uploaded Courses
      </h1>

      {uploadedCourses.length === 0 ? (
        <p className="text-center text-gray-400">You haven't uploaded any courses yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {uploadedCourses.map((course, i) => (
            <motion.div
              key={course._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className={`relative group rounded-xl border overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 ${
                isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}
            >
              {/* Course Front */}
              <div className="flex flex-col items-center text-center p-5">
                <img
                  src={`${import.meta.env.VITE_LOCAL_URL}/${course.thumbnail?.replace(/\\/g, '/')}`}
                  alt={course.title}
                  className="w-24 h-24 rounded-full object-cover border mb-3"
                  loading="lazy"
                />
                <h2
                  className="text-lg font-semibold truncate max-w-[200px]"
                  title={course.title}
                >
                  {course.title}
                </h2>
              </div>

              {/* Hover Overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-center px-4 py-6 z-10"
                style={{
                  backgroundColor: isDark ? '#1f2937ee' : '#f9fafbee',
                }}
              >
                <p
                  className={`text-sm mb-2 max-h-[80px] overflow-y-auto ${
                    isDark ? 'text-gray-300' : 'text-gray-800'
                  }`}
                >
                  <strong>Description:</strong>
                  <br />
                  {course.description || 'No description'}
                </p>

                {course.lessons?.length > 0 ? (
                  <a
                    href={course.lessons[0].videoURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-blue-500 hover:underline mt-2"
                  >
                    ▶ Watch First Lesson
                  </a>
                ) : (
                  <p className="italic text-sm text-gray-400">No lessons available</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UploadedCourses;
