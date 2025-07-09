import { useDispatch } from 'react-redux';
import { logout } from '../api/auth.api';
import { useNavigate } from 'react-router-dom';
import { clearCredentials } from '../store/authSlice';

function LogoutButton({ className = '' }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();

      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');

      dispatch(clearCredentials());
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className={`bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all font-semibold text-sm sm:text-base ${className}`}
    >
      🚪 Logout
    </button>
  );
}

export default LogoutButton;
