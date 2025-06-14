import React, { useState, useEffect } from 'react';
import { reviewAPI, serviceAPI } from '../utils/api';
import ReviewCard from '../components/ReviewCard';
import { useAuth } from '../contexts/AuthContext';
import { Listbox } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/solid';

interface Review {
  id: number;
  userId: number;
  serviceId: number;
  rating: number;
  comment: string;
  createdAt: string;
  userName?: string;
  serviceName?: string;
}

interface Service {
  id: number;
  name: string;
}

type SortKey = 'date' | 'rating';

const Reviews: React.FC = () => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [filtered, setFiltered] = useState<Review[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openForm, setOpenForm] = useState(false);
  const [newReview, setNewReview] = useState({ serviceId: 0, rating: 5, comment: '' });
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedFilterService, setSelectedFilterService] = useState<Service | null>(null);

  const [serviceFilter, setServiceFilter] = useState<number | 'all'>('all');
  const [ratingFilter, setRatingFilter] = useState<number | 'all'>('all');
  const [sortBy, setSortBy] = useState<SortKey>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const total = reviews.length;
  const average = total
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / total).toFixed(1)
    : '0.0';

  // Fetch services
  useEffect(() => {
    (async () => {
      try {
        const { data } = await serviceAPI.getAllServices();
        setServices(data);
      } catch (e) {
        console.error('Failed to fetch services:', e);
      }
    })();
  }, []);

  // Update selected service when serviceId changes
  useEffect(() => {
    if (newReview.serviceId > 0 && services.length > 0) {
      const service = services.find(s => s.id === newReview.serviceId);
      setSelectedService(service || null);
    } else {
      setSelectedService(null);
    }
  }, [newReview.serviceId, services]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await reviewAPI.getAllReviews();
        setReviews(data);
        setError(null);
      } catch (e) {
        console.error(e);
        setError('Не удалось загрузить отзывы.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleAdd = async () => {
    if (!user) {
      setError('Авторизуйтесь для добавления отзыва.');
      return;
    }
    try {
      const { data } = await reviewAPI.createReview({ userId: user.id, ...newReview });
      setReviews(prev => [...prev, data]);
      setNewReview({ serviceId: 0, rating: 5, comment: '' });
      setSelectedService(null);
      setOpenForm(false);
    } catch (e) {
      console.error(e);
      setError('Не удалось добавить отзыв.');
    }
  };

  // Обновляем отфильтрованный список
  useEffect(() => {
    let list = [...reviews];
    if (serviceFilter !== 'all') list = list.filter(r => r.serviceId === serviceFilter);
    if (ratingFilter !== 'all') list = list.filter(r => r.rating === ratingFilter);

    list.sort((a, b) => {
      const dir = sortOrder === 'asc' ? 1 : -1;
      if (sortBy === 'date') {
        return (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) * dir;
      }
      return (a.rating - b.rating) * dir;
    });
    setFiltered(list);
  }, [reviews, serviceFilter, ratingFilter, sortBy, sortOrder]);

  const activeClass = 'bg-blue-600 text-white';
  const inactiveClass = 'bg-gray-100 hover:bg-gray-200 text-gray-700';

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
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
      <div className="max-w-4xl mx-auto animate-fade-in">
        <h2 className="text-4xl font-bold text-center text-blue-800 mb-2">Отзывы наших клиентов</h2>
        <div className="h-1 w-32 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto mb-8 rounded-full animate-fade-in" />

        <div className="flex flex-col md:flex-row gap-6 justify-center mb-8">
          <div className="flex-1 bg-white rounded-2xl shadow p-6 text-center animate-fade-in">
            <div className="text-3xl font-semibold text-blue-600">{total}</div>
            <div className="text-gray-500">Всего отзывов</div>
          </div>
          <div className="flex-1 bg-white rounded-2xl shadow p-6 text-center animate-fade-in">
            <div className="text-3xl font-semibold text-blue-600">{average}</div>
            <div className="text-gray-500">Средний рейтинг</div>
          </div>
        </div>

        {user && (
          <div className="text-center mb-8 animate-fade-in">
            <button
              onClick={() => setOpenForm(o => !o)}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium transition"
            >
              {openForm ? 'Отменить' : 'Добавить отзыв'}
            </button>
          </div>
        )}

        {openForm && user && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-10 animate-fade-in">
            <h3 className="text-2xl font-bold mb-4">Новый отзыв</h3>
            <div className="space-y-4">
              <div>
                <label className="block mb-1 font-medium text-gray-700">Услуга</label>
                <Listbox
                  value={selectedService}
                  onChange={(service) => {
                    setSelectedService(service);
                    setNewReview(prev => ({ ...prev, serviceId: service?.id || 0 }));
                  }}
                >
                  <div className="relative mt-1">
                    <Listbox.Button className="relative w-full py-3 pl-4 pr-10 text-left bg-gradient-to-r from-blue-50 to-white border border-blue-200 rounded-xl shadow-md cursor-pointer hover:bg-blue-100 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
                      <span className="block truncate text-gray-800 font-medium">
                        {selectedService ? selectedService.name : "Выберите услугу"}
                      </span>
                      <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <ChevronUpDownIcon
                          className="w-6 h-6 text-blue-500"
                          aria-hidden="true"
                        />
                      </span>
                    </Listbox.Button>
                    <Listbox.Options className="absolute z-10 w-full py-2 mt-2 overflow-auto text-base bg-white rounded-xl shadow-xl max-h-60 ring-1 ring-blue-200 focus:outline-none sm:text-sm transition duration-150 ease-in-out">
                      {services.map((service) => (
                        <Listbox.Option
                          key={service.id}
                          value={service}
                          className={({ active }) =>
                            `cursor-pointer select-none relative py-2 pl-10 pr-4 ${
                              active ? 'bg-blue-100 text-blue-900' : 'text-gray-800'
                            } hover:bg-blue-50 transition duration-150`
                          }
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? 'font-semibold' : 'font-normal'
                                }`}
                              >
                                {service.name}
                              </span>
                              {selected ? (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                                  <CheckIcon className="w-5 h-5" aria-hidden="true" />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </div>
                </Listbox>
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700">Рейтинг</label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map(r => (
                    <button
                      key={r}
                      onClick={() => setNewReview(prev => ({ ...prev, rating: r }))}
                      className={`text-3xl ${r <= newReview.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700">Комментарий</label>
                <textarea
                  rows={4}
                  value={newReview.comment}
                  onChange={e => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <button
                onClick={handleAdd}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
              >
                Отправить
              </button>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow p-6 mb-8 grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in">
          <div>
            <p className="font-medium mb-2">Услуга</p>
            <Listbox
              value={selectedFilterService}
              onChange={(service) => {
                setSelectedFilterService(service);
                setServiceFilter(service ? service.id : 'all');
              }}
            >
              <div className="relative mt-1">
                <Listbox.Button className="relative w-full py-3 pl-4 pr-10 text-left bg-gradient-to-r from-blue-50 to-white border border-blue-200 rounded-xl shadow-md cursor-pointer hover:bg-blue-100 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
                  <span className="block truncate text-gray-800 font-medium">
                    {selectedFilterService ? selectedFilterService.name : "Все услуги"}
                  </span>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <ChevronUpDownIcon
                      className="w-6 h-6 text-blue-500"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>
                <Listbox.Options className="absolute z-10 w-full py-2 mt-2 overflow-auto text-base bg-white rounded-xl shadow-xl max-h-60 ring-1 ring-blue-200 focus:outline-none sm:text-sm transition duration-150 ease-in-out">
                  <Listbox.Option
                    value={null}
                    className={({ active }) =>
                      `cursor-pointer select-none relative py-2 pl-10 pr-4 ${
                        active ? 'bg-blue-100 text-blue-900' : 'text-gray-800'
                      } hover:bg-blue-50 transition duration-150`
                    }
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-semibold' : 'font-normal'
                          }`}
                        >
                          Все услуги
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                            <CheckIcon className="w-5 h-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                  {services.map((service) => (
                    <Listbox.Option
                      key={service.id}
                      value={service}
                      className={({ active }) =>
                        `cursor-pointer select-none relative py-2 pl-10 pr-4 ${
                          active ? 'bg-blue-100 text-blue-900' : 'text-gray-800'
                        } hover:bg-blue-50 transition duration-150`
                      }
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? 'font-semibold' : 'font-normal'
                            }`}
                          >
                            {service.name}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                              <CheckIcon className="w-5 h-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
            </Listbox>
          </div>
          <div>
            <p className="font-medium mb-2">Рейтинг</p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setRatingFilter('all')}
                className={`px-4 py-2 rounded-full transition ${ratingFilter === 'all' ? activeClass : inactiveClass}`}
              >Все</button>
              {[5,4,3,2,1].map(r => (
                <button
                  key={r}
                  onClick={() => setRatingFilter(r)}
                  className={`px-4 py-2 rounded-full transition ${ratingFilter === r ? activeClass : inactiveClass}`}
                >{r} ★</button>
              ))}
            </div>
          </div>
          <div>
            <p className="font-medium mb-2">Сортировать</p>
            <div className="flex flex-wrap gap-2">
              {( ['date', 'rating'] as const ).map(key => (
                <button
                  key={key}
                  onClick={() => {
                    if (sortBy === key) setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
                    else {
                      setSortBy(key);
                      setSortOrder('desc');
                    }
                  }}
                  className={`px-4 py-2 rounded-full transition ${sortBy === key ? activeClass : inactiveClass}`}
                >
                  {key === 'date' ? 'Дата' : 'Рейтинг'} {sortBy === key ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                </button>
              ))}
            </div>
          </div>
        </div>

        {loading && <p className="text-center text-blue-600 animate-fade-in">Загрузка...</p>}
        {error && <p className="text-center text-red-500 animate-fade-in">{error}</p>}

        <div className="grid gap-6">
          {filtered.map(r => (
            <ReviewCard
              key={r.id}
              id={r.id}
              userName={r.userName || 'Аноним'}
              serviceName={r.serviceName || 'Услуга'}
              rating={r.rating}
              comment={r.comment}
              date={r.createdAt}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;