import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Закрытие меню при изменении размера экрана (если стало ≥ md)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Фиксируем факт скролла, чтобы менять паддинги navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { title: 'Главная', path: '/' },
    { title: 'Услуги', path: '/services' },
    { title: 'Бронирование', path: '/booking' },
    { title: 'Отзывы', path: '/reviews' },
    { title: 'Контакты', path: '/contacts' }
  ];

  return (
    <>
      {/* ========================= */}
      {/* САМ Navbar */}
      {/* ========================= */}
      <nav
        className={`
          fixed top-0 left-0 right-0 z-50 overflow-hidden 
          bg-gradient-to-br from-gray-900/80 to-violet-900/50 
          backdrop-blur-md border-b border-violet-500/30 
          transition-all duration-300
          ${isScrolled ? 'py-2' : 'py-4'}
        `}
      >
        {/* Ключевая анимация для пунктов меню */}
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fadeIn 0.6s ease-out forwards;
            opacity: 0;
          }
        `}</style>

        {/* Декоративные элементы (фоновые круги) */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-violet-600/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full -translate-x-1/4 translate-y-1/4"></div>

        <div className="container mx-auto flex justify-between items-center relative z-10 px-4">
          {/* Логотип / название */}
          <h1
            className={`
              text-xl md:text-2xl font-bold font-[unbounded] bg-clip-text text-transparent 
              bg-gradient-to-r from-purple-400 to-violet-600 
              transition-transform duration-300 hover:-translate-y-0.5
            `}
          >
            База отдыха "IPPON"
          </h1>

          {/* Десктопное меню (скрыто на мобильных) */}
          <ul className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <li
                key={item.path}
                className="relative transition-all duration-300 hover:-translate-y-0.5 animate-fade-in"
              >
                <Link
                  to={item.path}
                  className={`
                    text-white/90 hover:text-violet-300 transition-colors duration-300 
                    px-3 py-1 rounded-lg bg-white/10 backdrop-blur-sm 
                    hover:bg-white/20 hover:shadow-[0_4px_30px_rgba(0,0,0,0.1)] 
                    focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300
                  `}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>

          {/* Десктопные кнопки авторизации (скрыто на мобильных) */}
          <div className="hidden md:flex space-x-4 animate-fade-in">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="font-semibold bg-black/20 px-3 py-1 rounded-lg backdrop-blur-sm text-white/90">
                  {user?.username}
                </span>
                <button
                  onClick={logout}
                  className={`
                    px-4 py-2 rounded-lg bg-gradient-to-r from-red-600/90 to-red-800/80 
                    text-white font-medium hover:from-red-700 hover:to-red-900 
                    transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20 
                    focus:outline-none focus:ring-2 focus:ring-red-500
                  `}
                >
                  Выйти
                </button>
              </div>
            ) : (
              <div className="flex space-x-3">
                <Link
                  to="/login"
                  className={`
                    px-4 py-2 rounded-lg bg-violet-700/80 text-white font-medium 
                    hover:bg-violet-800 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-violet-500
                  `}
                >
                  Вход
                </Link>
                <Link
                  to="/register"
                  className={`
                    px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600/90 to-violet-800/80 
                    text-white font-medium hover:from-purple-700 hover:to-violet-900 
                    transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 
                    focus:outline-none focus:ring-2 focus:ring-purple-500
                  `}
                >
                  Регистрация
                </Link>
              </div>
            )}
          </div>

          {/* Кнопка гамбургера (моб. версия) */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-6 relative">
                <div
                  className={`
                    absolute w-6 h-0.5 bg-white rounded transition-all duration-300 
                    ${isMenuOpen ? 'rotate-45 top-3' : 'top-1'}
                  `}
                ></div>
                <div
                  className={`
                    absolute w-6 h-0.5 bg-white rounded transition-all duration-300 
                    ${isMenuOpen ? 'opacity-0' : 'top-3'}
                  `}
                ></div>
                <div
                  className={`
                    absolute w-6 h-0.5 bg-white rounded transition-all duration-300 
                    ${isMenuOpen ? '-rotate-45 top-3' : 'top-5'}
                  `}
                ></div>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* ========================= */}
      {/* МОБИЛЬНОЕ МЕНЮ (вне <nav>) */}
      {/* ========================= */}
      <div
        className={`
          md:hidden fixed inset-0 z-40 bg-gray-900/95 backdrop-blur-xl 
          transition-all duration-300 ease-in-out
          ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
        `}
        onClick={() => setIsMenuOpen(false)}
      >
        <div
          className="flex flex-col h-full pt-24 pb-12 px-6 overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <ul className="flex flex-col space-y-6">
            {navItems.map((item) => (
              <li key={item.path} className="animate-fade-in">
                <Link
                  to={item.path}
                  className={`
                    block text-2xl font-bold text-white/90 hover:text-violet-300 
                    transition-colors duration-300 px-3 py-4 rounded-lg 
                    focus:outline-none focus:ring-2 focus:ring-purple-500
                  `}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>

          {/* Блок авторизации в моб.меню (внизу) */}
          <div className="mt-auto pt-8 border-t border-violet-500/30">
            {isAuthenticated ? (
              <div className="flex flex-col space-y-6 animate-fade-in">
                <span className="text-xl font-semibold bg-black/20 px-4 py-3 rounded-lg backdrop-blur-sm text-center text-white/90">
                  {user?.username}
                </span>
                <button
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className={`
                    px-6 py-3 text-lg rounded-lg bg-gradient-to-r from-red-600/90 to-red-800/80 
                    text-white font-medium hover:from-red-700 hover:to-red-900 
                    transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500
                  `}
                >
                  Выйти
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-4 animate-fade-in">
                <Link
                  to="/login"
                  className={`
                    px-6 py-3 text-center text-lg rounded-lg bg-violet-700/80 
                    text-white font-medium hover:bg-violet-800/90 
                    transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-violet-500
                  `}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Вход
                </Link>
                <Link
                  to="/register"
                  className={`
                    px-6 py-3 text-center text-lg rounded-lg 
                    bg-gradient-to-r from-purple-600/90 to-violet-800/80 
                    text-white font-medium hover:from-purple-700 hover:to-violet-900 
                    transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500
                  `}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Регистрация
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
