import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './Toggle.theam';
import LogoutButton from './Logout';
import { logout } from '../api/auth.api';
import { clearCredentials } from '../store/authSlice';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const currentTheme = useSelector((state) => state.theme.theme);
  const isDark = currentTheme === 'dark';
  const { user } = useSelector((state) => state.auth);
  const role = user?.role || 'student';

  const navLinks = useMemo(() => {
    return role === 'teacher'
      ? [
          { label: 'Home', path: '/' },
          { label: 'Uploaded Courses', path: '/mycourses' },
          { label: 'Create Course', path: '/courses' },
          { label: 'Create Quiz', path: '/quiz' },
          {label:'Profile', path:'/myprofile'}
        ]
      : [
          { label: 'Home', path: '/' },
          { label: 'Courses', path: '/corselist' },
          { label: 'Quiz', path: '/quiz-list' },
          { label: 'Profile', path: '/myprofile' }
        ];
  }, [role]);

  const handleMobileLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      dispatch(clearCredentials());
    } catch (err) {
      console.error('Logout failed:', err);
    } finally {
      setIsOpen(false);
    }
  };

  const hoverLinkClasses =
    'transition-all duration-300 ease-in-out hover:text-orange-500 hover:scale-105 hover:drop-shadow-[1px_1px_0px_rgba(0,0,255,0.4)]';

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b-4 border-orange-400 transition-colors duration-300 shadow-lg ${
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
              <Link key={path} to={path} className={hoverLinkClasses}>
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

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-3xl text-orange-600 transition-transform duration-300 hover:scale-110"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            ☰
          </button>
        </div>
      </header>

      {/* Mobile Sidebar Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Background Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black bg-opacity-50"
              onClick={() => setIsOpen(false)}
            />

            {/* Slide-in Sidebar */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className={`fixed top-0 left-0 z-50 h-full w-64 p-5 space-y-4 shadow-xl border-r border-orange-400 ${
                isDark ? 'bg-[#1e1e1e] text-white' : 'bg-white text-black'
              }`}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="text-2xl font-bold text-orange-500 hover:text-orange-600 transition"
              >
                ✕
              </button>

              {/* Navigation Links */}
              {navLinks.map(({ label, path }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setIsOpen(false)}
                  className={`block text-lg font-medium ${hoverLinkClasses}`}
                >
                  {label}
                </Link>
              ))}

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Login/Logout Button */}
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
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;
