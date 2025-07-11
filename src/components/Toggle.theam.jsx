// src/components/ThemeToggle.jsx
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../store/theamSlice';
import { useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

const ThemeToggle = () => {
  const currentTheme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    document.body.className = currentTheme;
  }, [currentTheme]);

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      aria-label="Toggle theme"
      className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-colors duration-300 shadow-sm 
        ${currentTheme === 'light'
          ? 'bg-gray-100 text-gray-800 hover:bg-gray-200'
          : 'bg-gray-800 text-white hover:bg-gray-700'}
      `}
    >
      {currentTheme === 'light' ? (
        <>
          <Moon className="w-5 h-5" /> Dark
        </>
      ) : (
        <>
          <Sun className="w-5 h-5" /> Light
        </>
      )}
    </button>
  );
};

export default ThemeToggle;
