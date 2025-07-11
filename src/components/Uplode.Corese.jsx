import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCourse } from '../api/corese.api';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function AddCourse() {
  const [formData, setFormData] = useState({ title: '', description: '' });
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [lessons, setLessons] = useState([{ title: '', videoURL: '' }]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isDark = useSelector((state) => state.theme.theme === 'dark');

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

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

  const isValidURL = (url) =>
    /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(url);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!thumbnailFile) {
      toast.error('Please select a thumbnail image.');
      return;
    }

    const hasInvalidURL = lessons.some((lesson) => !isValidURL(lesson.videoURL));
    if (hasInvalidURL) {
      toast.error('Please enter valid video URLs.');
      return;
    }

    setIsSubmitting(true);

    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('thumbnail', thumbnailFile);
    data.append('lessons', JSON.stringify(lessons));

    try {
      const res = await dispatch(createCourse(data)).unwrap();
      toast.success(res.data.meseage || 'Course created successfully!');
      setFormData({ title: '', description: '' });
      setThumbnailFile(null);
      setLessons([{ title: '', videoURL: '' }]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      navigate('/corselist');
    } catch (err) {
      toast.error(err.message || 'Failed to upload course');
    } finally {
      setIsSubmitting(false);
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
      className={`px-4 sm:px-6 py-10 max-w-3xl mx-auto rounded-xl shadow-lg transition-all duration-300 ${
        isDark ? 'bg-[#0f172a] text-white' : 'bg-white text-black'
      }`}
    >
      <h2
        className={`text-2xl sm:text-3xl font-bold mb-6 text-center ${
          isDark ? 'text-orange-400' : 'text-orange-600'
        }`}
      >
        📦 Upload a Course
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Course Title"
          className={inputClasses}
          required
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Course Description"
          className={inputClasses}
          required
        />

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

        {/* Lessons Section */}
        <div className="space-y-6">
          {lessons.map((lesson, index) => (
            <div key={index} className="space-y-3">
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

        <button
          type="submit"
          disabled={isSubmitting}
          className={`${buttonClasses} w-full ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? '⏳ Uploading...' : '🚀 Upload Course'}
        </button>
      </form>
    </div>
  );
}

export default AddCourse;
