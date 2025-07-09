import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './Toggle.theam';
import LogoutButton from './Logout';
import { logout } from '../api/auth.api';
import { clearCredentials } from '../store/authSlice';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const currentTheme = useSelector((state) => state.theme.theme);
  const isDark = currentTheme === 'dark';
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const role = user?.role || 'student';

  const teacherLinks = [
    { label: 'Home', path: '/' },
    { label: 'Uploaded Courses', path: '/mycourses' },
    { label: 'Create Course', path: '/courses' },
    { label: 'Create Quiz', path: '/quiz' },
  ];

  const studentLinks = [
    { label: 'Home', path: '/' },
    { label: 'Courses', path: '/corselist' },
    { label: 'Quiz', path: '/quiz-list' },
  ];

  const navLinks = role === 'teacher' ? teacherLinks : studentLinks;

  const handleMobileLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      dispatch(clearCredentials());
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setIsOpen(false);
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b-4 border-orange-400 transition-all duration-300 shadow-lg ${
          isDark ? 'bg-[#121212] text-white' : 'bg-white text-black'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="/logo2.png"
              alt="Logo"
              className="h-12 w-12 object-contain drop-shadow-[2px_2px_0px_rgba(0,0,255,0.3)]"
            />
            <span className="text-2xl font-bold text-orange-600">Learn App</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex flex-1 justify-center items-center space-x-6">
            {navLinks.map(({ label, path }) => (
              <Link
                key={path}
                to={path}
                className="hover:text-orange-500 transition duration-300 hover:drop-shadow-[1px_1px_0px_rgba(0,0,255,0.4)]"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            {user ? (
              <LogoutButton />
            ) : (
              <Link
                to="/login"
                className="bg-orange-400 text-white px-4 py-1.5 rounded hover:bg-orange-500 hover:shadow-[0_4px_10px_rgba(0,0,255,0.3)] transition font-medium"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-3xl text-orange-600"
            onClick={() => setIsOpen(!isOpen)}
          >
            ☰
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`md:hidden mx-4 mt-2 mb-4 rounded-lg border border-orange-400 p-4 space-y-3 overflow-hidden shadow-[0_8px_15px_rgba(255,165,0,0.4),0_4px_10px_rgba(0,0,255,0.2)] ${
              isDark ? 'bg-[#1e1e1e] text-white' : 'bg-white text-black'
            }`}
          >
            {navLinks.map(({ label, path }) => (
              <Link
                key={path}
                to={path}
                onClick={() => setIsOpen(false)}
                className="block hover:text-orange-500 transition"
              >
                {label}
              </Link>
            ))}

            <ThemeToggle />

            {user ? (
              <button
                onClick={handleMobileLogout}
                className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition font-medium"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center bg-orange-400 text-white px-4 py-2 rounded hover:bg-orange-500 transition font-medium"
              >
                Login
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;
