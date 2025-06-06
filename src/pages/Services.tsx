import React, { useState, useEffect } from 'react';
import CabinCard from '../components/CabinCard';
import { serviceAPI } from '../utils/api';

interface Service {
  id: number;
  name: string;
  description: string;
  price_per_day: string; // Изменено на string, т.к. API возвращает строки
}

interface EnhancedService extends Service {
  type: 'house' | 'room';
  capacity: number;
  isWeekend: boolean;
}

const Services: React.FC = () => {
  const [rawServices, setRawServices] = useState<Service[]>([]);
  const [enhancedServices, setEnhancedServices] = useState<EnhancedService[]>([]);
  const [filteredServices, setFilteredServices] = useState<EnhancedService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Состояния фильтров
  const [serviceType, setServiceType] = useState<'all' | 'house' | 'room'>('all');
  const [dayType, setDayType] = useState<'all' | 'weekday' | 'weekend'>('all');
  const [sortBy, setSortBy] = useState<'price' | 'capacity'>('price');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await serviceAPI.getAllServices();
        setRawServices(response.data);
        setError(null);
      } catch (err) {
        setError('Не удалось загрузить услуги. Пожалуйста, попробуйте позже.');
        console.error('Ошибка при загрузке услуг:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Преобразование данных при изменении rawServices
  useEffect(() => {
    const enhanced = rawServices.map(service => {
      // Определяем тип услуги с явным указанием типа
      const type: 'house' | 'room' =
        service.description.includes('{house}') ? 'house' :
        service.description.includes('{room}') ? 'room' : 'house';
      
      // Извлекаем количество мест
      const capacityMatch = service.name.match(/\{(\d+)\s*мест/);
      const capacity = capacityMatch ? parseInt(capacityMatch[1], 10) : 0;
      
      // Проверяем тип дня
      const isWeekend = service.description.includes('{weekend}') ||
                        service.name.includes('{weekend}');
      
      return {
        ...service,
        type,
        capacity,
        isWeekend
      };
    });
    
    setEnhancedServices(enhanced);
    setFilteredServices(enhanced);
  }, [rawServices]);

  // Фильтрация и сортировка при изменении параметров
  useEffect(() => {
    let result = [...enhancedServices];
    
    // Фильтрация по типу услуги
    if (serviceType !== 'all') {
      result = result.filter(service => service.type === serviceType);
    }
    
    // Фильтрация по типу дня
    if (dayType !== 'all') {
      result = result.filter(service =>
        dayType === 'weekend' ? service.isWeekend : !service.isWeekend
      );
    }
    
    // Сортировка
    result.sort((a, b) => {
      const order = sortOrder === 'asc' ? 1 : -1;
      
      if (sortBy === 'price') {
        return (parseFloat(a.price_per_day) - parseFloat(b.price_per_day)) * order;
      } else {
        return (a.capacity - b.capacity) * order;
      }
    });
    
    setFilteredServices(result);
  }, [enhancedServices, serviceType, dayType, sortBy, sortOrder]);

  let activeButton = `bg-violet-700 text-white font-semibold italic`;
  let disableButton = `bg-gray-800 hover:bg-gray-700`;

  return (
    <div className="w-full bg-gradient-to-b from-gray-900 to-black text-white min-h-screen pt-16">
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
      <div className="w-full px-4 py-16 bg-gradient-to-b from-transparent to-gray-800/50">
        <div className="max-w-7xl mx-auto animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center font-[unbounded] bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-violet-600">
            Наши услуги
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-violet-700 mx-auto mb-12 rounded-full"></div>

          {/* Панель фильтров */}
          <div className="flex flex-wrap gap-4 mb-8 justify-center">
            <div className="flex flex-col">
              <span className="text-gray-300 mb-1 font-[raleway] font-bold">Тип услуги:</span>
              <div className="flex gap-2">
                <button
                  className={`px-3 py-1 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 ${
                    serviceType === 'all'
                      ? `${activeButton}`
                      : `${disableButton}`
                  }`}
                  onClick={() => setServiceType('all')}
                >
                  Все
                </button>
                <button
                  className={`px-3 py-1 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 ${
                    serviceType === 'house'
                      ? `${activeButton}`
                      : `${disableButton}`
                  }`}
                  onClick={() => setServiceType('house')}
                >
                  Дома
                </button>
                <button
                  className={`px-3 py-1 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 ${
                    serviceType === 'room'
                      ? `${activeButton}`
                      : `${disableButton}`
                  }`}
                  onClick={() => setServiceType('room')}
                >
                  Комнаты
                </button>
              </div>
            </div>
            
            <div className="flex flex-col">
              <span className="text-gray-300 mb-1 font-[raleway] font-bold">Дни:</span>
              <div className="flex gap-2">
                <button
                  className={`px-3 py-1 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 ${
                    dayType === 'all'
                      ? `${activeButton}`
                      : `${disableButton}`
                  }`}
                  onClick={() => setDayType('all')}
                >
                  Все
                </button>
                <button
                  className={`px-3 py-1 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 ${
                    dayType === 'weekday'
                      ? `${activeButton}`
                      : `${disableButton}`
                  }`}
                  onClick={() => setDayType('weekday')}
                >
                  Будни
                </button>
                <button
                  className={`px-3 py-1 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 ${
                    dayType === 'weekend'
                      ? `${activeButton}`
                      : `${disableButton}`
                  }`}
                  onClick={() => setDayType('weekend')}
                >
                  Выходные
                </button>
              </div>
            </div>
            
            <div className="flex flex-col">
              <span className="text-gray-300 mb-1 font-[raleway] font-bold">Сортировка:</span>
              <div className="flex gap-2">
                <button
                  className={`px-3 py-1 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 ${
                    sortBy === 'price'
                      ? `${activeButton}`
                      : `${disableButton}`
                  }`}
                  onClick={() => {
                    if (sortBy === 'price') {
                      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                    } else {
                      setSortBy('price');
                      setSortOrder('asc');
                    }
                  }}
                >
                  Цена {sortBy === 'price' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                </button>
                <button
                  className={`px-3 py-1 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 ${
                    sortBy === 'capacity'
                      ? `${activeButton}`
                      : `${disableButton}`
                  }`}
                  onClick={() => {
                    if (sortBy === 'capacity') {
                      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                    } else {
                      setSortBy('capacity');
                      setSortOrder('asc');
                    }
                  }}
                >
                  Места {sortBy === 'capacity' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                </button>
              </div>
            </div>
          </div>

          {loading && (
            <p className="text-center text-gray-300 font-[raleway] font-medium">
              Загрузка услуг...
            </p>
          )}

          {error && (
            <p className="text-red-500 text-center font-[raleway] font-medium">
              {error}
            </p>
          )}

          {!loading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((service, index) => (
                <div
                  key={service.id}
                  className="animate-fade-in transition-all duration-300 ease-in-out transform hover:scale-[1.02]"
                  style={{ animationDelay: `${index * 0.08}s` }}
                >
                  <CabinCard
                    title={`${service.name.replace(/\{.*?\}/g, '')} (${service.capacity} мест)`}
                    description={service.description.replace(/\{.*?\}/g, '')}
                    price={parseFloat(service.price_per_day)}
                    imageUrl=""
                    alt={`Услуга: ${service.name}`}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Services;