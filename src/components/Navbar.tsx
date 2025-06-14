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
          bg-white/80 backdrop-blur-lg border-b border-gray-300/30
          shadow-sm
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
        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-100/30 rounded-full -translate-y-1/2 translate-x-1/2 backdrop-blur-sm"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-200/20 rounded-full -translate-x-1/4 translate-y-1/4 backdrop-blur-sm"></div>

        <div className="container mx-auto flex justify-between items-center relative z-10 px-4">
          {/* Логотип / название */}
          <h1
            className={`
              text-xl md:text-2xl font-bold font-[unbounded] bg-clip-text text-transparent 
              bg-gradient-to-r from-blue-500 to-blue-700
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
                    text-gray-800 hover:text-blue-600 transition-colors duration-300
                    px-3 py-1 rounded-lg bg-white/50 backdrop-blur-sm
                    hover:bg-white/70 hover:shadow-sm
                    focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300
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
                <span className="font-semibold bg-white/50 backdrop-blur-sm px-3 py-1 rounded-lg border border-gray-300/50 text-gray-800">
                  {user?.username}
                </span>
                <button
                  onClick={logout}
                  className={`
                    px-4 py-2 rounded-lg bg-red-500
                    text-white font-medium hover:bg-red-600
                    transition-all duration-300
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
                    px-4 py-2 rounded-lg bg-blue-500 text-white font-medium
                    hover:bg-blue-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500
                  `}
                >
                  Вход
                </Link>
                <Link
                  to="/register"
                  className={`
                    px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700
                    text-white font-medium hover:from-blue-600 hover:to-blue-800
                    transition-all duration-300
                    focus:outline-none focus:ring-2 focus:ring-blue-500
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
              className="text-gray-800 focus:outline-none"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-6 relative">
                <div
                  className={`
                    absolute w-6 h-0.5 bg-gray-800 rounded transition-all duration-300
                    ${isMenuOpen ? 'rotate-45 top-3' : 'top-1'}
                  `}
                ></div>
                <div
                  className={`
                    absolute w-6 h-0.5 bg-gray-800 rounded transition-all duration-300
                    ${isMenuOpen ? 'opacity-0' : 'top-3'}
                  `}
                ></div>
                <div
                  className={`
                    absolute w-6 h-0.5 bg-gray-800 rounded transition-all duration-300
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
          md:hidden fixed inset-0 z-40 bg-white/90 backdrop-blur-xl
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
                    block text-2xl font-bold text-gray-800 hover:text-blue-600
                    transition-colors duration-300 px-3 py-4 rounded-lg bg-white/30 backdrop-blur-sm
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                  `}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>

          {/* Блок авторизации в моб.меню (внизу) */}
          <div className="mt-auto pt-8 border-t border-gray-300">
            {isAuthenticated ? (
              <div className="flex flex-col space-y-6 animate-fade-in">
                <span className="text-xl font-semibold bg-white/50 backdrop-blur-sm px-4 py-3 rounded-lg border border-gray-300/50 text-center text-gray-800">
                  {user?.username}
                </span>
                <button
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className={`
                    px-6 py-3 text-lg rounded-lg bg-red-500
                    text-white font-medium hover:bg-red-600
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
                    px-6 py-3 text-center text-lg rounded-lg bg-blue-500
                    text-white font-medium hover:bg-blue-600
                    transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500
                  `}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Вход
                </Link>
                <Link
                  to="/register"
                  className={`
                    px-6 py-3 text-center text-lg rounded-lg
                    bg-gradient-to-r from-blue-500 to-blue-700
                    text-white font-medium hover:from-blue-600 hover:to-blue-800
                    transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500
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
