import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Dialog } from '@headlessui/react';
import { ExclamationCircleIcon } from '@heroicons/react/24/solid';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error: authError } = useAuth();
  const navigate = useNavigate();

  // Локальное состояние для управления модалками
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [localError, setLocalError] = useState<string>('');

  // Если в контексте появилась ошибка, показываем модалку
  useEffect(() => {
    if (authError) {
      setLocalError(authError);
      setShowErrorModal(true);
    }
  }, [authError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await login(email, password);
      // После успешного логина показываем Success Modal
      setShowSuccessModal(true);
    } catch (err) {
      // Ошибка тоже ловится, но многие useAuth уже выставляют authError.
      // На всякий случай продублируем
      const message =
        err instanceof Error ? err.message : 'Не удалось выполнить вход.';
      setLocalError(message);
      setShowErrorModal(true);
    }
  };

  // Закрытие Error Modal
  const handleErrorClose = () => {
    setShowErrorModal(false);
    setLocalError('');
  };

  // Закрытие Success Modal — после него переходим на главную
  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 flex items-center justify-center px-4 py-8">
      {/* Error Modal */}
      {showErrorModal && (
        <Dialog
          open={showErrorModal}
          onClose={handleErrorClose}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto"
        >
          {/* Полупрозрачный фон */}
          <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

          {/* Контент модалки */}
          <div className="relative z-10 w-full max-w-md p-6 mx-auto my-8 bg-white rounded-2xl shadow-xl text-left">
            <Dialog.Title
              as="h3"
              className="flex items-center text-lg font-medium leading-6 text-red-700"
            >
              <ExclamationCircleIcon className="w-6 h-6 mr-2 text-red-700" />
              Ошибка
            </Dialog.Title>
            <div className="mt-2">
              <p className="text-sm text-gray-500">{localError}</p>
            </div>
            <div className="mt-4 text-right">
              <button
                type="button"
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
                onClick={handleErrorClose}
              >
                Закрыть
              </button>
            </div>
          </div>
        </Dialog>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <Dialog
          open={showSuccessModal}
          onClose={handleSuccessClose}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto"
        >
          {/* Полупрозрачный фон */}
          <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

          {/* Контент модалки */}
          <div className="relative z-10 w-full max-w-md p-6 mx-auto my-8 bg-white rounded-2xl shadow-xl text-left">
            <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-green-700">
              Успешный вход
            </Dialog.Title>
            <div className="mt-2">
              <p className="text-sm text-gray-500">Вы успешно вошли в систему!</p>
            </div>
            <div className="mt-4 text-right">
              <button
                type="button"
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-500"
                onClick={handleSuccessClose}
              >
                Продолжить
              </button>
            </div>
          </div>
        </Dialog>
      )}

      {/* Форма логина */}
      <div className="w-full max-w-md p-6 bg-white/70 backdrop-blur-lg rounded-xl border border-gray-300/30 shadow-lg">
        <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center font-[unbounded] text-blue-800">
          Авторизация
        </h2>
        <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-blue-700 mx-auto mb-12 rounded-full"></div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              className="block text-gray-700 mb-1 font-semibold font-[raleway]"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white/80 lining-nums font-semibold font-[raleway] backdrop-blur-sm text-gray-800 placeholder:text-gray-500 border border-gray-300/50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              required
            />
          </div>

          <div>
            <label
              className="block text-gray-700 mb-1 font-semibold font-[raleway]"
              htmlFor="password"
            >
              Пароль
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white/80 lining-nums font-semibold font-[raleway] backdrop-blur-sm text-gray-800 placeholder:text-gray-500 border border-gray-300/50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              required
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white lining-nums font-semibold font-[raleway] py-3 px-4 rounded-xl shadow-lg transition-all duration-300 disabled:opacity-50"
            >
              {isLoading ? 'Вход...' : 'Войти'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
