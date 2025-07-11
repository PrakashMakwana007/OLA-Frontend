import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import LogoutButton from '../components/Logout'; // ✅ your reusable logout button

function MyProfile() {
  const { user } = useSelector((state) => state.auth);
  const isDark = useSelector((state) => state.theme.theme === 'dark');

  const bgClass = isDark ? 'bg-[#121212] text-orange-400' : 'bg-white text-orange-600';
  const labelClass = isDark ? 'text-white' : 'text-black';

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`max-w-md mx-auto mt-12 p-6 rounded-xl shadow-xl border border-orange-400 transition-all ${bgClass}`}
    >
      <h2 className="text-3xl font-bold text-center mb-8">👤 My Profile</h2>

      <div className="space-y-5 text-center">
        <p className={`text-lg ${labelClass}`}>
          <strong className="mr-1">Ful Name:</strong> {user?.fullName}
        </p>
        <p className={`text-lg ${labelClass}`}>
          <strong className="mr-1"> Email:</strong> {user?.email}
        </p>
        <p className={`text-lg ${labelClass}`}>
          <strong className="mr-1"> Role:</strong> {user?.role}
        </p>

        <div className="pt-6">
          <LogoutButton className="mx-auto" />
        </div>
      </div>
    </motion.div>
  );
}

export default MyProfile;
