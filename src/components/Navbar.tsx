import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();

  // Определяем массив навигационных элементов с правильными путями
  const navItems = [
    { title: 'Главная', path: '/' },
    { title: 'Услуги', path: '/services' },
    { title: 'Бронирование', path: '/booking' },
    { title: 'Отзывы', path: '/reviews' },
    { title: 'Контакты', path: '/contacts' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 overflow-hidden bg-gradient-to-br from-gray-900/80 to-violet-900/50 backdrop-blur-md border-b border-violet-500/30 p-4 text-white shadow-lg font-[raleway] font-semibold group">
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
      {/* Декоративные элементы */}
      
      <div className="absolute top-0 right-0 w-48 h-48 bg-violet-600/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full -translate-x-1/4 translate-y-1/4"></div>
      
      <div className="container mx-auto flex justify-between items-center relative z-10">
        <h1 className="text-2xl font-bold font-[unbounded] bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-violet-600 group-hover:-translate-y-0.5 transition-transform duration-300">
          База отдыха "IPPON"
        </h1>
        
        <ul className="flex space-x-6">
          {navItems.map((item) => (
            <li key={item.path} className="transition-all duration-300 hover:-translate-y-0.5 animate-fade-in">
              <Link 
                to={item.path} 
                className="hover:text-violet-300 transition-colors duration-300 px-3 py-1 rounded-lg"
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
        
        <div className="flex space-x-4 animate-fade-in">
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <span className="font-semibold bg-black/20 px-3 py-1 rounded-lg backdrop-blur-sm">
                {user?.username}
              </span>
              <button 
                onClick={logout} 
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-red-600/90 to-red-800/80 text-white font-medium hover:from-red-700 hover:to-red-900 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20 group-hover:-translate-y-0.5"
              >
                Выйти
              </button>
            </div>
          ) : (
            <div className="flex space-x-3">
              <Link 
                to="/login" 
                className="px-4 py-2 rounded-lg bg-violet-700/80 text-white font-medium hover:bg-violet-800 transition-colors duration-300 group-hover:-translate-y-0.5"
              >
                Вход
              </Link>
              <Link 
                to="/register" 
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600/90 to-violet-800/80 text-white font-medium hover:from-purple-700 hover:to-violet-900 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 group-hover:-translate-y-0.5"
              >
                Регистрация
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;