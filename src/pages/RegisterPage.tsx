import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Dialog } from '@headlessui/react';
import { CheckIcon, ExclamationCircleIcon } from '@heroicons/react/24/solid';

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register, error: authError } = useAuth();
  const navigate = useNavigate();

  // Локальное состояние для управления модалками
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [localError, setLocalError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Если в контексте возникла ошибка регистрации, показываем модалку
  useEffect(() => {
    if (authError) {
      setLocalError(authError);
      setShowErrorModal(true);
    }
  }, [authError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');
    setIsLoading(true);

    try {
      await register(username, email, password);
      // При успешной регистрации показываем Success Modal
      setShowSuccessModal(true);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Ошибка регистрации. Возможно, пользователь с таким email уже существует.';
      setLocalError(message);
      setShowErrorModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleErrorClose = () => {
    setShowErrorModal(false);
    setLocalError('');
  };

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
          <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
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
          <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
          <div className="relative z-10 w-full max-w-md p-6 mx-auto my-8 bg-white rounded-2xl shadow-xl text-left">
            <Dialog.Title as="h3" className="flex items-center text-lg font-medium leading-6 text-green-700">
              <CheckIcon className="w-6 h-6 mr-2 text-green-700" />
              Успешная регистрация
            </Dialog.Title>
            <div className="mt-2">
              <p className="text-sm text-gray-500">Учётная запись создана! Сейчас вы будете перенаправлены.</p>
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

      {/* Форма регистрации */}
      <div className="w-full max-w-md p-6 bg-white/70 backdrop-blur-lg rounded-xl border border-gray-300/30 shadow-lg">
        <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center font-[unbounded] text-blue-800">
          Регистрация
        </h2>
        <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-blue-700 mx-auto mb-12 rounded-full"></div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              className="block text-gray-700 mb-1 font-semibold font-[raleway]"
              htmlFor="username"
            >
              Имя пользователя
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white/80 lining-nums font-semibold font-[raleway] backdrop-blur-sm text-gray-800 placeholder:text-gray-500 border border-gray-300/50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              required
            />
          </div>

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
              {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
