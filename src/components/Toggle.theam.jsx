// src/components/ThemeToggle.jsx
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../store/theamSlice';
import { useEffect } from 'react';

const ThemeToggle = () => {
  const currentTheme = useSelector((state) => state.theme.theme); 
  const dispatch = useDispatch();

  useEffect(() => {
    document.body.className = currentTheme; // apply to <body>
  }, [currentTheme]);

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className="px-4 py-2 rounded font-medium bg-gray-800 text-white hover:bg-gray-700"
    >
      {currentTheme === 'light' ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
};

export default ThemeToggle;
