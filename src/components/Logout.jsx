import { useDispatch } from 'react-redux';
import { logout } from '../api/auth.api';
import { useNavigate } from 'react-router-dom';
import { clearCredentials } from '../store/authSlice';
import { useState } from 'react';

function LogoutButton({ className = '' }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    if (loading) return;

    setLoading(true);

    try {
      await dispatch(logout()).unwrap();

      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');

      dispatch(clearCredentials());
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Logout failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className={`flex items-center justify-center gap-2 bg-red-500 text-white px-4 py-2 rounded-md transition-all font-semibold text-sm sm:text-base 
      hover:bg-red-600 hover:shadow-md hover:scale-[1.03] active:scale-[0.97] disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
    >
      {loading ? (
        <>
          <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
          Logging out...
        </>
      ) : (
        <>
          🚪 Logout
        </>
      )}
    </button>
  );
}

export default LogoutButton;
