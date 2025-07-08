import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../api/auth.api';
import { useNavigate, Link } from 'react-router-dom';
import { p } from 'framer-motion/client';

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const currentTheme = useSelector((state) => state.theme.theme);
  const isDark = currentTheme === 'dark';

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    role: 'student',
  });

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(register(formData));
    if (res?.payload?.data?.user) navigate('/');  
      
  };

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 ${
      isDark ? 'bg-[#121212] text-white' : 'bg-gradient-to-br from-orange-100 to-blue-100 text-black'
    }`}>
      <form
        onSubmit={handleSubmit}
        className={`shadow-lg rounded-xl p-8 w-full max-w-md transition-all duration-300 ${
          isDark ? 'bg-[#1e1e1e]' : 'bg-white'
        }`}
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-orange-500">Create Account</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 mb-4 border rounded focus:ring-2 focus:ring-orange-400 bg-inherit"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 mb-4 border rounded focus:ring-2 focus:ring-orange-400 bg-inherit"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 mb-4 border rounded focus:ring-2 focus:ring-orange-400 bg-inherit"
        />

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full px-4 py-2 mb-6 border rounded focus:ring-2 focus:ring-orange-400 bg-inherit"
        >
          <option value="student">Student</option>
          <option value="teacher">Instructor</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition"
        >
          {loading ? 'Registering...' : 'Register'}
        </button>

        <p className="text-center mt-4 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
