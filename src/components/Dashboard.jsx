import React, {
  useState,
  useEffect,
  useRef,
} from "react";

import {
  Search,
  Bell,
  Play,
  Plus,
  ThumbsUp,
  Settings,
  LogOut,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [openMenu, setOpenMenu] =
    useState(false);

  const menuRef = useRef(null);

  useEffect(() => {
    const token = JSON.parse(
      localStorage.getItem("token")
    );

    if (!token) {
      navigate("/login", {
        replace: true,
      });
    }
  }, [navigate]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target)
      ) {
        setOpenMenu(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const handleLogout = () => {
    dispatch(logout());

    navigate("/login", {
      replace: true,
    });
  };

  const handleChangePassword = () => {
    navigate("/change-password");
  };

  const featuredMovie = {
    title: "Stranger Things",
    description:
      "When a young boy disappears, a small town uncovers a mystery involving secret experiments and supernatural forces.",
    image:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1920",
  };

  const trendingMovies = [
    {
      id: 1,
      title: "Wednesday",
      image:
        "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500",
    },
    {
      id: 2,
      title: "Extraction",
      image:
        "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=500",
    },
    {
      id: 3,
      title: "Money Heist",
      image:
        "https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=500",
    },
    {
      id: 4,
      title: "Dark",
      image:
        "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=500",
    },
    {
      id: 5,
      title: "Lucifer",
      image:
        "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=500",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md">
        <div className="flex items-center justify-between px-8 py-4">

          <div className="flex items-center gap-10">
            <h1 className="text-red-600 text-4xl font-bold">
              NETFLIX
            </h1>

            <ul className="hidden md:flex gap-6 text-sm">
              <li className="cursor-pointer hover:text-gray-300">
                Home
              </li>

              <li className="cursor-pointer hover:text-gray-300">
                TV Shows
              </li>

              <li className="cursor-pointer hover:text-gray-300">
                Movies
              </li>

              <li className="cursor-pointer hover:text-gray-300">
                New & Popular
              </li>

              <li className="cursor-pointer hover:text-gray-300">
                My List
              </li>
            </ul>
          </div>

          <div className="flex items-center gap-5">
            <Search size={22} />

            <Bell size={22} />

            {/* Profile Menu */}
            <div
              className="relative"
              ref={menuRef}
            >
              <div
                onClick={() =>
                  setOpenMenu(!openMenu)
                }
                className="w-10 h-10 rounded bg-red-600 flex items-center justify-center font-bold cursor-pointer hover:bg-red-700 transition"
              >
                M
              </div>

              {openMenu && (
                <div className="absolute right-0 mt-3 w-60 bg-zinc-900 border border-zinc-700 rounded-lg shadow-2xl overflow-hidden">

                  <div className="p-4 border-b border-zinc-700">
                    <h3 className="font-semibold text-white">
                      Meet Patel
                    </h3>

                    <p className="text-sm text-gray-400">
                      meet@gmail.com
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setOpenMenu(false);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-zinc-800 transition"
                  >
                    Profile
                  </button>

                  <button
                    onClick={
                      handleChangePassword
                    }
                    className="w-full px-4 py-3 flex items-center gap-3 hover:bg-zinc-800 transition"
                  >
                    <Settings size={18} />
                    Change Password
                  </button>

                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-3 flex items-center gap-3 text-red-500 hover:bg-zinc-800 transition"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        className="h-screen bg-cover bg-center relative flex items-center"
        style={{
          backgroundImage: `url(${featuredMovie.image})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>

        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

        <div className="relative z-10 max-w-2xl px-8 md:px-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-5">
            {featuredMovie.title}
          </h1>

          <p className="text-lg text-gray-200 mb-8">
            {featuredMovie.description}
          </p>

          <div className="flex gap-4">
            <button className="bg-white text-black px-8 py-3 rounded flex items-center gap-2 font-semibold">
              <Play
                size={20}
                fill="black"
              />
              Play
            </button>

            <button className="bg-gray-700/80 px-8 py-3 rounded font-semibold">
              More Info
            </button>
          </div>
        </div>
      </section>

      {/* Trending */}
      <section className="px-8 md:px-16 py-10">
        <h2 className="text-2xl font-bold mb-6">
          Trending Now
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {trendingMovies.map(
            (movie) => (
              <div
                key={movie.id}
                className="group relative overflow-hidden rounded-lg cursor-pointer"
              >
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="w-full h-72 object-cover transition duration-300 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex flex-col justify-end p-4">
                  <h3 className="font-semibold mb-3">
                    {movie.title}
                  </h3>

                  <div className="flex gap-2">
                    <button className="bg-white text-black p-2 rounded-full">
                      <Play
                        size={16}
                        fill="black"
                      />
                    </button>

                    <button className="border p-2 rounded-full">
                      <Plus size={16} />
                    </button>

                    <button className="border p-2 rounded-full">
                      <ThumbsUp size={16} />
                    </button>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </section>

      {/* Continue Watching */}
      <section className="px-8 md:px-16 pb-20">
        <h2 className="text-2xl font-bold mb-6">
          Continue Watching
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {trendingMovies.map(
            (movie) => (
              <div
                key={movie.id}
                className="bg-zinc-900 rounded-lg overflow-hidden"
              >
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="w-full h-44 object-cover"
                />

                <div className="p-4">
                  <h4 className="font-semibold">
                    {movie.title}
                  </h4>

                  <div className="w-full h-1 bg-zinc-700 mt-3 rounded">
                    <div className="w-2/3 h-full bg-red-600 rounded"></div>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;