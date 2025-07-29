// Home.jsx
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function Home() {
  const currentTheme = useSelector((state) => state.theme.theme);
  const isDark = currentTheme === 'dark';
  const navigate = useNavigate();

  const cards = [
    {
      title: 'Java Developer',
      image: '/java.jpg',
      description: 'Learn Java from basics to advanced. Build scalable backend systems and ace interviews.',
    },
    {
      title: 'JavaScript Developer',
      image: '/javascipt.jpg',
      description: 'Master JavaScript with real-world projects in frontend and backend (Node.js).',
    },
    {
      title: 'DSA Mastery',
      image: '/DSA.png',
      description: 'Crack coding interviews with top DSA patterns, problem solving & algorithms in Java.',
    },
  ];

  return (
    <div className={`min-h-screen transition-all ${isDark ? 'bg-[#121212] text-white' : 'bg-white text-black'}`}>
      
      {/* Hero Section */}
      <section className={`px-6 py-12 md:py-20 transition-all ${isDark ? 'bg-[#1e1e1e]' : 'bg-orange-50'}`}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex-1 text-center md:text-left"
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-orange-500 mb-4">Welcome to LearnApp 📚</h1>
            <p className="text-lg sm:text-xl mb-6">
              Explore high-quality tech courses taught by real experts. Build skills and grow confidently.
            </p>
            <button
              onClick={() => navigate('/courses')}
              className="mt-4 px-6 py-3 bg-orange-500 text-white rounded-xl shadow hover:bg-orange-600 transition"
            >
              Browse Courses
            </button>
          </motion.div>
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex-1"
          >
            <img
              src="/student.jpg.jpg"
              alt="Student learning"
              className="rounded-xl shadow-lg w-full max-h-[400px] object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Top Developer Tracks */}
      <section className={`px-6 py-16 max-w-6xl mx-auto ${isDark ? 'bg-[#121212]' : 'bg-white'}`}>
        <h2 className="text-3xl font-semibold text-center text-orange-500 mb-10">Top Developer Tracks 🚀</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/courses')}
              className={`cursor-pointer rounded-xl overflow-hidden shadow-md transition-transform duration-300 hover:shadow-xl ${
                isDark ? 'bg-[#1e1e1e]' : 'bg-white'
              }`}
            >
              <img src={card.image} alt={card.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-bold mb-2 text-orange-500">{card.title}</h3>
                <p className="text-sm">{card.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Learn Coding */}
      <section className={`px-6 py-16 ${isDark ? 'bg-[#1a1a1a]' : 'bg-orange-50'}`}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left space-y-4">
            <h2 className="text-3xl font-semibold text-orange-500">Why Learn to Code?</h2>
            <ul className="text-base leading-relaxed space-y-2">
              <li>🚀 Coding is the new literacy</li>
              <li>💼 High-paying jobs globally</li>
              <li>🧠 Boosts your brain like puzzles</li>
              <li>🛠️ Create tools, not just use them</li>
              <li>🤖 Understand AI, ML, automation</li>
              <li>🌍 Build apps that impact millions</li>
              <li>🎯 Improves focus & logic</li>
              <li>🌱 Learn once, grow forever</li>
            </ul>
          </div>
          <div className="flex-1 relative rounded-xl overflow-hidden shadow-lg w-full h-[300px]">
            <video
              src="/coding.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover rounded-xl"
            />
            <div className="absolute inset-0 bg-black opacity-30 rounded-xl" />
          </div>
        </div>
      </section>

      {/* Motivation + Real Student Photos */}
      <section className={`px-6 py-16 max-w-6xl mx-auto ${isDark ? 'bg-[#121212]' : 'bg-white'}`}>
        <div className="mb-10">
          <h2 className="text-3xl font-semibold text-orange-500 text-center mb-6">The Power of Learning 📱📖</h2>
          <p className="text-lg leading-8 text-center max-w-4xl mx-auto">
            In today’s fast-paced world, learning is no longer limited to classrooms. Whether you're on a bus, sitting at a café, or lying on your bed —
            your phone becomes your gateway to knowledge. Students around the world are mastering coding, building apps, and preparing for tech careers
            right from their mobile devices. With LearnApp, learning is not just accessible — it's empowering, flexible, and made for your lifestyle.
            No matter your background, your dream to become a developer can start today. Keep growing, keep building — the future is in your hands. 🚀
          </p>
        </div>

        {/* Student Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <img
            src="/student 3.jpg"
            alt="Student learning on mobile"
            className="rounded-xl shadow-md object-cover w-full h-64"
          />
          <img
            src="/studen22.jpg"
            alt="Girl coding on bed"
            className="rounded-xl shadow-md object-cover w-full h-64"
          />
          <img
            src="/student11.jpg.jpg"
            alt="Boy learning from phone"
            className="rounded-xl shadow-md object-cover w-full h-64"
          />
        </div>
      </section>
            {/* Big Motivation Section */}
      <section className={`px-6 py-16 ${isDark ? 'bg-[#1a1a1a]' : 'bg-orange-50'}`}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-orange-500 mb-6">Your Journey Starts Now 🚀</h2>
          <p className="text-lg leading-8 mb-4">
            Imagine waking up each day with the confidence that you're building something real — something that makes you proud. Whether you're a beginner
            trying to understand variables or a dreamer hoping to build the next big thing, remember this: every expert was once a beginner.
          </p>
          <p className="text-lg leading-8 mb-4">
            The only difference between where you are and where you want to be is action. Start now, even if it's small. LearnApp is built for dreamers
            who want to turn effort into opportunity. You don’t need to be perfect — you just need to begin.
          </p>
          <button
            onClick={() => navigate('/login')}
            className="mt-6 px-6 py-3 bg-orange-500 text-white rounded-xl shadow hover:bg-orange-600 transition"
          >
            Login & Start Learning
          </button>
        </div>
      </section>

    </div>
  );
}

export default Home;
