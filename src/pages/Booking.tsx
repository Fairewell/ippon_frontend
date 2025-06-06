import React, { useState, useEffect, Fragment } from 'react';
import { serviceAPI, bookingAPI } from '../utils/api';
import { useAuth } from '../contexts/AuthContext';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon, ExclamationCircleIcon } from '@heroicons/react/24/solid';

interface Cabin {
  id: number;
  name: string;
  description: string;
  price_per_day: number;
  thumbnailUrl?: string; // Опционально: ссылка на изображение
}

const Booking: React.FC = () => {
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
  const [success, setSuccess] = useState<boolean>(false);
  const [activeType, setActiveType] = useState<'houses' | 'rooms'>('houses');

  // Для внутреннего поиска в списке
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    const fetchCabins = async () => {
      try {
        const response = await serviceAPI.getAllServices();
        setCabins(response.data);
      } catch (err) {
        setError('Не удалось загрузить список домиков');
      } finally {
        setLoading(false);
      }
    };
    fetchCabins();
  }, []);

  // Фильтрация на основе типа (houses/rooms)
  const filteredByType = cabins.filter(cabin =>
    activeType === 'houses'
      ? cabin.description.includes('{house}')
      : cabin.description.includes('{room}')
  );

  // Дополнительная фильтрация по запросу (query)
  const searchResults = filteredByType.filter(cabin =>
    cabin.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCabin) {
      setError('Пожалуйста, выберите домик');
      return;
    }
    try {
      const bookingData = {
        serviceId: selectedCabin.id,
        startDate,
        endDate,
        guestName,
        guestEmail,
        guestPhone
      };
      await bookingAPI.createBooking(bookingData);
      setSuccess(true);
      setError(null);
    } catch (err) {
      setError('Ошибка при бронировании. Попробуйте снова.');
      setSuccess(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 w-full">
      <h2 className="text-3xl font-bold mb-6 text-center font-[unbounded]">Бронирование домика</h2>

      {success ? (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
          <p className="font-bold font-[unbounded]">Бронирование успешно создано!</p>
          <p>Спасибо за бронирование. Мы свяжемся с вами для подтверждения.</p>
        </div>
      ) : (
        <>
          {/* Переключатель типа с анимацией */}
          <div className="relative inline-flex bg-gray-200 rounded-lg p-1 mb-6">
            <div
              className={`
                absolute top-1 bottom-1 left-1 w-1/2 bg-purple-600 rounded-lg transition-all duration-300
                ${activeType === 'rooms' ? 'translate-x-full' : 'translate-x-0'}
              `}
            />
            <button
              className={`
                relative z-10 flex-1 text-center py-2 font-medium transition-colors duration-200
                ${activeType === 'houses' ? 'text-white' : 'text-gray-700'}
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
                ${activeType === 'rooms' ? 'text-white' : 'text-gray-700'}
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

          {error && (
            <div className="flex items-center bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded mb-4">
              <ExclamationCircleIcon className="w-5 h-5 mr-2" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Блок селектора */}
            <div>
              <label htmlFor="cabin-listbox" className="block text-white/70 mb-1 font-semibold font-[raleway]">
                Выберите домик
              </label>

              {loading ? (
                <div className="p-4 space-y-2">
                  {[1, 2, 3].map(idx => (
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
                      w-full py-2 pl-3 pr-10 text-left bg-white/10 backdrop-blur-md
                      rounded-xl ring-1 ring-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.1)]
                      text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300
                      ${!filteredByType.length ? 'bg-gray-100/50 text-gray-400 cursor-not-allowed' : ''}
                    `}
                  >
                    <span className="block truncate font-semibold font-[raleway] lining-nums">
                      {filteredByType.length === 0
                        ? 'Нет доступных домиков'
                        : selectedCabin
                        ? `${selectedCabin.name} — ${selectedCabin.price_per_day} ₽/день`
                        : 'Выберите домик'}
                    </span>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <ChevronUpDownIcon className="w-5 h-5 text-purple-300" aria-hidden="true" />
                    </span>
                  </Listbox.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-500"
                    enterFrom="opacity-0 translate-y-2"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-300"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-2"
                  >
                    <Listbox.Options className="absolute z-10 w-full mt-1 max-h-60 overflow-auto 
                      rounded-xl bg-white/10 backdrop-blur-md ring-1 ring-white/20 
                      shadow-[0_8px_30px_rgba(0,0,0,0.15)] text-white focus:outline-none
                      animate-fade-in"
                    >
                      <div className="px-3 py-2">
                        <input
                          type="text"
                          value={query}
                          onChange={e => setQuery(e.target.value)}
                          placeholder="Поиск..."
                          className="w-full px-3 py-2 rounded-md bg-white/20 text-white placeholder:text-white/60 
                            focus:outline-none focus:ring-2 focus:ring-purple-500 backdrop-blur-sm font-semibold font-[raleway] lining-nums"
                        />
                      </div>

                      {searchResults.length === 0 ? (
                        <div className="cursor-default select-none px-4 py-2 text-white/50 font-semibold font-[raleway]">
                          Ничего не найдено
                        </div>
                      ) : (
                        searchResults.map(cabin => (
                          <Listbox.Option
                            key={cabin.id}
                            value={cabin}
                            className={({ active }) =>
                              `relative cursor-default select-none py-2 pl-3 pr-9 rounded-md transition-colors lining-nums font-medium font-[raleway] duration-200 ${
                                active ? 'bg-purple-500/30 text-white' : 'text-white/90'
                              }`
                            }
                          >
                            {({ selected }) => (
                              <div className="flex items-center space-x-3">
                                {cabin.thumbnailUrl && (
                                  <img
                                    src={cabin.thumbnailUrl}
                                    alt={cabin.name}
                                    className="w-10 h-10 rounded-md object-cover"
                                  />
                                )}
                                <div className="flex flex-col">
                                  <span className={`text-sm ${selected ? 'font-semibold' : 'font-normal'}`}>
                                    {cabin.name}
                                  </span>
                                  <span className="text-xs text-white/60">
                                    {cabin.price_per_day} ₽/день
                                  </span>
                                </div>
                                {selected && (
                                  <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-purple-300">
                                    <CheckIcon className="w-5 h-5" />
                                  </span>
                                )}
                              </div>
                            )}
                          </Listbox.Option>
                        ))
                      )}
                    </Listbox.Options>
                  </Transition>
                </Listbox>
              )}

              {filteredByType.length > 0 && (
                <p className="text-sm text-gray-500 mt-1">
                  Введите название домика, чтобы быстро найти нужный вариант.
                </p>
              )}
            </div>

            {/* Дата заезда и выезда */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white/70 mb-1 font-semibold font-[raleway]">Дата заезда</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={e => setStartDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white/10 lining-nums font-semibold font-[raleway] backdrop-blur-md text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-white/70 mb-1 font-semibold font-[raleway]">Дата выезда</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={e => setEndDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white/10 lining-nums font-semibold font-[raleway] backdrop-blur-md text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  required
                />
              </div>
            </div>

            {/* Данные гостя */}
            <div>
              <label className="block text-white/70 mb-1 font-semibold font-[raleway]">Полное имя</label>
              <input
                type="text"
                value={guestName}
                onChange={e => setGuestName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white/10 lining-nums font-semibold font-[raleway] backdrop-blur-md text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                required={!user}
              />
            </div>
            <div>
              <label className="block text-white/70 mb-1 font-semibold font-[raleway]">Телефон</label>
              <input
                type="tel"
                value={guestPhone}
                onChange={e => setGuestPhone(e.target.value)}
className="w-full px-3 py-2 rounded-xl bg-white/10 lining-nums font-semibold font-[raleway] backdrop-blur-md text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"                required={!user}
              />
            </div>
            <div>
              <label className="block text-white/70 mb-1 font-semibold font-[raleway]">Email</label>
              <input
                type="email"
                value={guestEmail}
                onChange={e => setGuestEmail(e.target.value)}
className="w-full px-3 py-2 lining-nums font-semibold font-[raleway] rounded-xl bg-white/10 backdrop-blur-md text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"                required={!user}
              />
            </div>

            {/* Кнопка подтверждения */}
            <button
              type="submit"
              className="w-full bg-purple-500/80 hover:bg-purple-600/90 text-white lining-nums font-semibold font-[raleway] py-3 px-4 rounded-xl shadow-lg backdrop-blur-md transition-all duration-300"            >
              Подтвердить бронирование
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default Booking;
