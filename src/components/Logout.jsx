import { useDispatch } from 'react-redux';
import { logout } from '../api/auth.api';
import { useNavigate } from 'react-router-dom';
import { clearCredentials } from '../store/authSlice'; // ✅ optional

function LogoutButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();

      // ✅ Clear tokens
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');

      // ✅ Optional: clear Redux state manually
      dispatch(clearCredentials());

      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-4 py-1.5 rounded hover:bg-red-600 transition font-medium"
    >
      Logout
    </button>
  );
}

export default LogoutButton;
