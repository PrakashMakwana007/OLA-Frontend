import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, getaccount } from '../api/auth.api';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const currentTheme = useSelector((state) => state.theme.theme);
  const isDark = currentTheme === 'dark';

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(login(formData));
    const user = res?.payload?.data?.user;

    if (user) {
      await dispatch(getaccount());
      navigate('/');
    }
  };

  return (
    <div
      className={`min-h-screen flex justify-center items-start pt-16 pb-24 px-4 sm:px-6 md:px-8 ${
        isDark
          ? 'bg-[#121212] text-white'
          : 'bg-gradient-to-br from-orange-100 to-blue-100 text-black'
      }`}
    >
      <form
        onSubmit={handleSubmit}
        className={`w-full max-w-md shadow-xl rounded-2xl p-6 sm:p-8 transition-all duration-300 ${
          isDark ? 'bg-[#1e1e1e]' : 'bg-white'
        }`}
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-orange-500">
          Login
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

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
          className="w-full px-4 py-2 mb-6 border rounded focus:ring-2 focus:ring-orange-400 bg-inherit"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <p className="text-center mt-4 text-sm">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
