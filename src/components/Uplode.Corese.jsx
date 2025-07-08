import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCourse } from '../api/corese.api';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function AddCourse() {
  const [formData, setFormData] = useState({ title: '', description: '' });
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [lessons, setLessons] = useState([{ title: '', videoURL: '' }]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isDark = useSelector((state) => state.theme.theme === 'dark');

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLessonChange = (index, e) => {
    const updatedLessons = [...lessons];
    updatedLessons[index][e.target.name] = e.target.value;
    setLessons(updatedLessons);
  };

  const addLessonField = () => {
    setLessons([...lessons, { title: '', videoURL: '' }]);
  };

  const removeLessonField = (index) => {
    const updated = lessons.filter((_, i) => i !== index);
    setLessons(updated);
  };

  const handleFileChange = (e) => {
    setThumbnailFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!thumbnailFile) {
      toast.error('Please select a thumbnail image.');
      return;
    }

    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('thumbnail', thumbnailFile);
    data.append('lessons', JSON.stringify(lessons));

    try {
      const res = await dispatch(createCourse(data)).unwrap();
      console.log("cretd corese ",res);
      toast.success(res.data.meseage || 'Course created successfully!');
      setFormData({ title: '', description: '' });
      setThumbnailFile(null);
      setLessons([{ title: '', videoURL: '' }]);
      navigate('/corselist');
    } catch (err) {
      toast.error(err.message || 'Failed to upload course');
    }
  };

  const inputClasses = `w-full p-2 border rounded text-center focus:outline-none ${
    isDark
      ? 'bg-[#1e293b] border-orange-400 text-white placeholder-white'
      : 'bg-orange-100 border-orange-500 text-black placeholder-black'
  }`;

  const buttonClasses = `rounded-full px-6 py-2 font-semibold shadow-md transition-transform duration-300 ${
    isDark
      ? 'bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 text-black'
      : 'bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-400 text-white'
  } hover:scale-105 hover:shadow-lg`;

  return (
    <div
      className={`p-6 max-w-3xl mx-auto rounded-xl shadow-lg transition-all duration-300 ${
        isDark ? 'bg-[#0f172a] text-white' : 'bg-white text-black'
      }`}
    >
      <h2
        className={`text-3xl font-bold mb-6 text-center ${
          isDark ? 'text-orange-400' : 'text-orange-600'
        }`}
      >
        📦 Upload a Course
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Course Title"
          className={inputClasses}
          required
        />

        {/* Description */}
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Course Description"
          className={inputClasses}
          required
        />

        {/* Thumbnail */}
        <input
          type="file"
          name="thumbnail"
          onChange={handleFileChange}
          accept="image/*"
          className={`w-full p-2 border rounded cursor-pointer ${
            isDark
              ? 'bg-[#1e293b] border-orange-400 text-white'
              : 'bg-orange-100 border-orange-500 text-black'
          }`}
          required
        />

        {/* Lessons */}
        <div className="space-y-6">
          {lessons.map((lesson, index) => (
            <div key={index} className="space-y-2">
              <input
                type="text"
                name="title"
                value={lesson.title}
                onChange={(e) => handleLessonChange(index, e)}
                placeholder={`Lesson ${index + 1} Title`}
                className={inputClasses}
                required
              />
              <input
                type="text"
                name="videoURL"
                value={lesson.videoURL}
                onChange={(e) => handleLessonChange(index, e)}
                placeholder="Video URL"
                className={inputClasses}
                required
              />
              {lessons.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeLessonField(index)}
                  className="text-sm text-red-500 hover:underline"
                >
                  ❌ Remove Lesson
                </button>
              )}
            </div>
          ))}

          <button type="button" onClick={addLessonField} className={buttonClasses}>
            ➕ Add Lesson
          </button>
        </div>

        {/* Upload Button */}
        <button type="submit" className={`${buttonClasses} w-full`}>
          🚀 Upload Course
        </button>
      </form>
    </div>
  );
}

export default AddCourse;
