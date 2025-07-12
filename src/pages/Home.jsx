// Home.jsx
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

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
    <div
      className={`min-h-screen px-4 sm:px-6 md:px-8 py-10 transition-all ${
        isDark ? 'bg-[#121212] text-white' : 'bg-white text-black'
      }`}
    >
      {/* Welcome Section */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 mb-16">
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl font-bold text-orange-500 mb-4">
            Welcome to LearnApp 📚
          </h1>
          <p className="text-lg sm:text-xl mb-6">
            Your journey to knowledge begins here! Explore high-quality courses taught by real experts, build your skills, and grow with confidence.
          </p>
          <p className="text-md">
            Whether you're a student or a teacher — LearnApp helps you level up with the right tools. Join thousands of learners today!
          </p>
        </div>
        <div className="flex-1">
          <img
            src="/student.jpg.jpg"
            alt="Student learning"
            className="rounded-xl shadow-lg w-full object-cover max-h-[400px] md:max-h-[500px]"
          />
        </div>
      </div>

      {/* Top Developer Tracks */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-center text-orange-500 mb-10">
          Top Developer Tracks 🚀
        </h2>
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {cards.map((card, index) => (
            <div
              key={index}
              onClick={() => navigate('/courses')}
              className={`cursor-pointer rounded-xl overflow-hidden shadow-md transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl ${
                isDark ? 'bg-[#1e1e1e]' : 'bg-white'
              }`}
            >
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-40 sm:h-48 md:h-56 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-orange-500">{card.title}</h3>
                <p className="text-sm">{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Motivation + Video Section */}
      <div className="max-w-6xl mx-auto mt-20 flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1 space-y-3 text-center md:text-left">
          <h2 className="text-3xl font-semibold text-orange-500">Why Learn to Code?</h2>
          <p className="text-base leading-relaxed">
            🚀 Coding is the new literacy.<br />
            💡 It sharpens your logic and creativity.<br />
            🌍 Builds apps that impact millions.<br />
            💼 Opens up high-paying global jobs.<br />
            📊 Teaches data thinking & problem solving.<br />
            🤖 Helps you understand AI, ML, and automation.<br />
            🧠 Boosts your brain like solving puzzles daily.<br />
            🛠️ Lets you create tools, not just use them.<br />
            🔐 Gives control over privacy and security.<br />
            🎯 Improves focus, discipline, and strategy.<br />
            🌱 Learn once, grow forever.<br />
            🧑‍💻 LearnApp makes it simple and fun to begin!
          </p>
        </div>
        <div className="flex-1 relative rounded-xl overflow-hidden shadow-lg w-full h-[250px] sm:h-[300px] md:h-[350px]">
          <div className="absolute inset-0 bg-black opacity-30 z-10 rounded-xl" />
          <video
            src="/coding.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover rounded-xl z-0"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
