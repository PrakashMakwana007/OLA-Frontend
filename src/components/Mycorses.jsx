import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCourses } from "../api/corese.api";

const UploadedCourses = () => {
  const dispatch = useDispatch();
  const { courses, loading, error } = useSelector((state) => state.corse);
  const user = useSelector((state) => state.auth.user);
  const isDark = useSelector((state) => state.theme.theme === "dark");

  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);

  const uploadedCourses = courses.filter((course) => {
    const courseTeacherId =
      typeof course.teacherId === "object"
        ? course.teacherId._id
        : course.teacherId;

    return courseTeacherId?.toString() === user?._id?.toString();
  });

  if (loading)
    return <p className="text-center py-6">Loading your uploaded courses...</p>;
  if (error)
    return <p className="text-center text-red-500 py-6">Error: {error}</p>;

  return (
    <div className={`p-4 min-h-screen ${isDark ? "bg-[#0f172a]" : "bg-white"}`}>
      <h1 className="text-2xl font-bold mb-6 text-center text-orange-500">
        My Uploaded Courses
      </h1>

      {uploadedCourses.length === 0 ? (
        <p className="text-gray-500 text-center">
          You haven't uploaded any courses yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {uploadedCourses.map((course) => (
            <div
              key={course._id}
              className={`relative group border rounded-xl shadow transition-all duration-300 hover:shadow-lg ${
                isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
              }`}
            >
              {/* Front */}
              <div className="flex flex-col items-center text-center p-4">
                <img
                  src={`${
                    import.meta.env.VITE_LOCAL_URL
                  }/${course.thumbnail.replace(/\\/g, "/")}`}
                  alt={course.title}
                  className="w-24 h-24 rounded-full object-cover border mb-3"
                />
                <h2
                  className={`text-lg font-semibold ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  {course.title}
                </h2>
              </div>

              {/* Hover Reveal */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-opacity-90 flex flex-col justify-center items-center text-center px-4 py-6 z-10"
                style={{
                  backgroundColor: isDark ? "#1f2937" : "#f9fafb",
                }}
              >
                <p
                  className={`text-sm mb-2 ${
                    isDark ? "text-gray-300" : "text-gray-800"
                  }`}
                >
                  <strong>Description:</strong> <br />
                  {course.description || "No description"}
                </p>

                {course.lessons?.length > 0 ? (
                  <a
                    href={course.lessons[0].videoURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-blue-500 hover:underline"
                  >
                    ▶ Watch First Lesson
                  </a>
                ) : (
                  <p className="italic text-sm text-gray-400">
                    No lessons available
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UploadedCourses;
