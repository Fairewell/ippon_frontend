import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { serviceAPI, bookingAPI } from '../utils/api';
import { useAuth } from '../contexts/AuthContext';
import { Listbox, Dialog } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon, ExclamationCircleIcon } from '@heroicons/react/24/solid';

interface Cabin {
  id: number;
  name: string;
  description: string;
  price_per_day: number;
  imageUrl: string;
}

const Booking: React.FC = () => {
  const location = useLocation();
  const { serviceId } = location.state || {};
  const { user } = useAuth();
  const [cabins, setCabins] = useState<Cabin[]>([]);
  const [selectedCabin, setSelectedCabin] = useState<Cabin | null>(null);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [guestName, setGuestName] = useState<string>('');
  const [guestEmail, setGuestEmail] = useState<string>('');
  const [guestPhone, setGuestPhone] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeType, setActiveType] = useState<'houses' | 'rooms'>('houses');
  const [query, setQuery] = useState<string>('');

  // Control modal visibility
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

  interface ServiceResponse {
    id: number;
    name: string;
    description: string;
    price_per_day: number;
    imageurl: string;
    created_at: string;
    updated_at: string;
  }

  useEffect(() => {
    const fetchCabins = async () => {
      try {
        const response = await serviceAPI.getAllServices();
        const cabinsData = response.data.map((service: ServiceResponse) => ({
          id: service.id,
          name: service.name,
          description: service.description,
          price_per_day: service.price_per_day,
          imageUrl: service.imageurl
        }));
        setCabins(cabinsData);

        // Pre-select service if serviceId is passed
        if (serviceId) {
            const serviceToSelect: Cabin | undefined = cabinsData.find((cabin: Cabin) => cabin.id === serviceId);
          if (serviceToSelect) {
            setSelectedCabin(serviceToSelect);
            // Scroll to booking form
            document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' });
          }
        }
      } catch {
        setError('Не удалось загрузить список домиков');
        setShowErrorModal(true);
      } finally {
        setLoading(false);
      }
    };
    fetchCabins();
  }, [serviceId]);

  const filteredByType = cabins.filter(cabin =>
    activeType === 'houses'
      ? cabin.description.includes('{house}')
      : cabin.description.includes('{room}')
  );

  const searchResults = filteredByType.filter(cabin =>
    cabin.name.toLowerCase().includes(query.toLowerCase())
  );

  // Handler to close Error Modal and reset error text
  const handleErrorClose = () => {
    setShowErrorModal(false);
    setError(null);
  };

  // Handler to close Success Modal and reset form fields
  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    // Reset all form fields
    setSelectedCabin(null);
    setStartDate('');
    setEndDate('');
    setGuestName('');
    setGuestEmail('');
    setGuestPhone('');
    setQuery('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCabin) {
      setError('Пожалуйста, выберите домик');
      setShowErrorModal(true);
      return;
    }
    try {
      const bookingData = {
        serviceId: selectedCabin.id,
        startDate,
        endDate,
        guestName,
        guestEmail,
        guestPhone,
      };
      await bookingAPI.createBooking(bookingData);

      // Успешный ответ только от POST запроса
      setShowSuccessModal(true);
      setError(null);
    } catch {
      setError('Ошибка при бронировании. Попробуйте снова.');
      setShowErrorModal(true);
    }
  };

  return (
    <div className="relative bg-white text-gray-800">
      {/* Success Modal (только Dialog, без Transition) */}
      {showSuccessModal && (
        <Dialog
          open={showSuccessModal}
          onClose={handleSuccessClose}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto"
        >
          {/* Фон */}
          <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

          {/* Контент модалки */}
          <div className="relative z-10 w-full max-w-md p-6 mx-auto my-8 bg-gray-50 rounded-2xl shadow-xl text-left">
            <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-green-700">
              Успех!
            </Dialog.Title>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Бронирование успешно создано! Спасибо за бронирование. Мы свяжемся с вами для подтверждения.
              </p>
            </div>
            <div className="mt-4 text-right">
              <button
                type="button"
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-green-500 border border-transparent rounded-md hover:bg-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-500"
                onClick={handleSuccessClose}
              >
                Закрыть
              </button>
            </div>
          </div>
        </Dialog>
      )}

      {/* Error Modal (только Dialog, без Transition) */}
      {showErrorModal && (
        <Dialog
          open={showErrorModal}
          onClose={handleErrorClose}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto"
        >
          {/* Фон */}
          <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

          {/* Контент модалки */}
          <div className="relative z-10 w-full max-w-md p-6 mx-auto my-8 bg-gray-50 rounded-2xl shadow-xl text-left">
            <Dialog.Title as="h3" className="flex items-center text-lg font-medium leading-6 text-red-700">
              <ExclamationCircleIcon className="w-6 h-6 mr-2 text-red-700" />
              Ошибка
            </Dialog.Title>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                {error}
              </p>
            </div>
            <div className="mt-4 text-right">
              <button
                type="button"
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-500 border border-transparent rounded-md hover:bg-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
                onClick={handleErrorClose}
              >
                Закрыть
              </button>
            </div>
          </div>
        </Dialog>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 w-full">
        <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center font-[unbounded] text-blue-800">
            Бронирование домиков
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-blue-700 mx-auto mb-12 rounded-full"></div>

        {/* Toggle Houses / Rooms */}
        <div className="relative inline-flex bg-gray-100 rounded-lg p-1 mb-6">
          <div
            className={`
              absolute top-1 bottom-1 left-1 w-1/2 bg-blue-600 rounded-lg transition-all duration-300
              ${activeType === 'rooms' ? 'translate-x-full' : 'translate-x-0'}
            `}
          />
          <button
            className={`
              relative z-10 flex-1 text-center py-2 font-medium transition-colors duration-200
              ${activeType === 'houses' ? 'text-white' : 'text-gray-800'}
            `}
            onClick={() => {
              setActiveType('houses');
              setSelectedCabin(null);
              setQuery('');
            }}
          >
            Домики
          </button>
          <button
            className={`
              relative z-10 flex-1 text-center py-2 font-medium transition-colors duration-200
              ${activeType === 'rooms' ? 'text-white' : 'text-gray-800'}
            `}
            onClick={() => {
              setActiveType('rooms');
              setSelectedCabin(null);
              setQuery('');
            }}
          >
            Комнаты
          </button>
        </div>

        <form id="booking-form" onSubmit={handleSubmit} className="space-y-6">
          {/* Listbox */}
          <div>
            <label htmlFor="cabin-listbox" className="block text-gray-700 mb-1 font-semibold font-[raleway]">
              Выберите домик
            </label>
            {loading ? (
              <div className="p-4 space-y-2">
                {[1, 2, 3].map((idx) => (
                  <div key={idx} className="h-6 bg-gray-200 rounded animate-pulse"></div>
                ))}
              </div>
            ) : (
              <Listbox
                value={selectedCabin}
                onChange={setSelectedCabin}
                as="div"
                className="relative"
                disabled={!filteredByType.length}
              >
                <Listbox.Button
                  id="cabin-listbox"
                  className={`
                    w-full py-2 pl-3 pr-10 text-left bg-white border border-gray-300
                    rounded-xl shadow-sm
                    text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300
                    ${!filteredByType.length ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : ''}
                  `}
                >
                  <span className="block truncate font-semibold font-[raleway] lining-nums text-gray-800">
                    {filteredByType.length === 0
                      ? 'Нет доступных домиков'
                      : selectedCabin
                      ? `${selectedCabin.name} — ${selectedCabin.price_per_day} ₽/день`
                      : 'Выберите домик'}
                  </span>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <ChevronUpDownIcon className="w-5 h-5 text-gray-500" aria-hidden="true" />
                  </span>
                </Listbox.Button>

                <Listbox.Options className="absolute z-10 w-full mt-1 max-h-60 overflow-auto rounded-xl bg-white border border-gray-300 shadow-lg focus:outline-none">
                  <div className="px-3 py-2">
                    <input
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Поиск..."
                      className="w-full px-3 py-2 rounded-md bg-white border border-gray-300 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold font-[raleway] lining-nums"
                    />
                  </div>

                  {searchResults.length === 0 ? (
                    <div className="cursor-default select-none px-4 py-2 text-gray-500 font-semibold font-[raleway]">
                      Ничего не найдено
                    </div>
                  ) : (
                    searchResults.map((cabin) => (
                      <Listbox.Option
                        key={cabin.id}
                        value={cabin}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-3 pr-9 rounded-md transition-colors lining-nums font-medium font-[raleway] duration-200 ${
                            active ? 'bg-blue-100 text-gray-800' : 'text-gray-700'
                          }`
                        }
                      >
                        {({ selected }) => (
                          <div className="flex items-center space-x-3">
                            <div className="flex flex-col">
                              <span className={`text-sm ${selected ? 'font-semibold' : 'font-normal'}`}>
                                {cabin.name}
                              </span>
                              <span className="text-xs text-gray-500">{cabin.price_per_day} ₽/день</span>
                            </div>
                            {selected && (
                              <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-500">
                                <CheckIcon className="w-5 h-5" />
                              </span>
                            )}
                          </div>
                        )}
                      </Listbox.Option>
                    ))
                  )}
                </Listbox.Options>
              </Listbox>
            )}

            {filteredByType.length > 0 && (
              <p className="text-sm text-gray-600 mt-1">
                Введите название домика, чтобы быстро найти нужный вариант.
              </p>
            )}
          </div>

          {/* Date Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1 font-semibold font-[raleway]">Дата заезда</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white border border-gray-300 lining-nums font-semibold font-[raleway] text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1 font-semibold font-[raleway]">Дата выезда</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white border border-gray-300 lining-nums font-semibold font-[raleway] text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                required
              />
            </div>
          </div>

          {/* Guest Information */}
          <div>
            <label className="block text-gray-700 mb-1 font-semibold font-[raleway]">Полное имя</label>
            <input
              type="text"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white border border-gray-300 lining-nums font-semibold font-[raleway] text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              required={!user}
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1 font-semibold font-[raleway]">Телефон</label>
            <input
              type="tel"
              value={guestPhone}
              onChange={(e) => setGuestPhone(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white border border-gray-300 lining-nums font-semibold font-[raleway] text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              required={!user}
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1 font-semibold font-[raleway]">Email</label>
            <input
              type="email"
              value={guestEmail}
              onChange={(e) => setGuestEmail(e.target.value)}
              className="w-full px-3 py-2 lining-nums font-semibold font-[raleway] rounded-xl bg-white border border-gray-300 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              required={!user}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white lining-nums font-semibold font-[raleway] py-3 px-4 rounded-xl shadow-lg transition-all duration-300"
          >
            Подтвердить бронирование
          </button>
        </form>
      </div>
    </div>
  );
};

export default Booking;
