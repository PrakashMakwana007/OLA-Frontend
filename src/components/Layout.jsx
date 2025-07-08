import { useSelector } from 'react-redux';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

function Layout() {
  const currentTheme = useSelector((state) => state.theme.theme);
  const isDark = currentTheme === 'dark';

  return (
    <div className={`${isDark ? 'bg-[#121212] text-white' : 'bg-white text-black'} flex flex-col min-h-screen`}>
      <Header />
      
      {/* Page Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default Layout;
