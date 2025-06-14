import React from 'react';
import { useNavigate } from 'react-router-dom';
import CabinCard from '../components/CabinCard';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const cabins = [
    {
      id: 1,
      title: "Домик 1",
      description: "Уютный домик с видом на озеро, современный интерьер 12 мест",
      price: 600,
      imageUrl: "https://downloader.disk.yandex.ru/preview/6233c958f1486c79a93321d3bbfbd44d55b0431d14e35110efe9701d956c15f4/684d89c1/3i8SvC7WERv5JgtrM4WrYujFd9ODXT6RT5_LO_X22V-E3w2jk7FU8_WIDY68LKxSf-XQRzW6xCdsgiB7v6u72A%3D%3D?uid=0&filename=5470122863206981255.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=0&tknv=v3&size=2048x2048",
      alt: "Домик Стандарт"
    },
    {
      id: 2,
      title: "Премиум Вилла",
      description: "Просторная вилла",
      price: 4300,
      imageUrl: "https://disk.yandex.ru/i/P6iqfvhTFeXKtQ",
      alt: "Премиум Вилла"
    },
    {
      id: 3,
      title: "Эко Бунгало",
      description: "Экологичное жильё в стиле минимализм с выходом к лесу",
      price: 2900,
      imageUrl: "https://disk.yandex.ru/i/mLEI0wT24uFoRg",
      alt: "Эко Бунгало в лесу"
    },
    {
      id: 4,
      title: "Домик 2",
      description: "Деревянный дом в окружении соснового леса",
      price: 800,
      imageUrl: "https://disk.yandex.ru/i/2JOmfGuf6rOwhQ",
      alt: "Лесной Дом среди сосен"
    }
  ];

  const [heroIndex, setHeroIndex] = React.useState(0);
  const heroImages = [
    'https://b1b27eaa3f.cbaul-cdnwnd.com/96b91b15702471974376c7c35cc2ec28/200000041-e00a9e00ab/0a6f5c41152e67ec2d66c3841868.webp?ph=b1b27eaa3f',
    'https://b1b27eaa3f.cbaul-cdnwnd.com/96b91b15702471974376c7c35cc2ec28/200000094-e3d33e3d35/%D1%89%D1%83%D1%87%D0%BA%D0%B0.webp?ph=b1b27eaa3f',
    'https://b1b27eaa3f.cbaul-cdnwnd.com/96b91b15702471974376c7c35cc2ec28/200000045-8e29f8e2a0/%D0%B2%D1%81%D1%8F%20%D0%B1%D0%B0%D0%B7%D0%B0.webp?ph=b1b27eaa3f'
  ];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Группируем кабины по 2-4 в зависимости от размера экрана
  const [groupIndex, setGroupIndex] = React.useState(0);
  const itemsPerGroup = 2; // Максимум 4 на больших экранах

  const nextGroup = () => {
    setGroupIndex(prev => (prev + 1) % Math.ceil(cabins.length / itemsPerGroup));
  };

  const prevGroup = () => {
    setGroupIndex(prev => (prev - 1 + Math.ceil(cabins.length / itemsPerGroup)) % Math.ceil(cabins.length / itemsPerGroup));
  };

  // Удаляем вычисление видимой группы (теперь управляется через transform)

  return (
    <div className="w-full bg-white text-gray-800">
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
      {/* Герой-секция с каруселью */}
      <section className="relative overflow-hidden py-16 md:py-24 h-[80vh] flex items-center">
        {/* Карусель фоновых изображений */}
        {heroImages.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
              index === heroIndex ? 'opacity-30' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url(${img})`,
              backgroundAttachment: 'fixed',
              transform: 'translateZ(0)'
            }}
            role="img"
            aria-label={`Фоновое изображение ${index + 1}`}
          ></div>
        ))}
        
        <div className="absolute inset-0 bg-opacity-50 backdrop-blur-md"></div>
        
        <div className="w-full px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800 font-[unbounded] animate-fade-in">
            БАЗА ОТДЫХА <span className="text-blue-700">IPPON</span>
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl mb-8 mx-auto max-w-2xl text-gray-700 font-[raleway] font-medium animate-fade-in">
            Отдых в гармонии с природой на берегу озера Щучье
          </p>
          <button className="inline-block px-8 py-3 text-lg font-[unbounded] font-bold text-white bg-gradient-to-r from-blue-600 to-blue-800 rounded-full animate-fade-in
                            transition-all duration-300 hover:from-blue-700 hover:to-blue-900 hover:shadow-lg hover:shadow-blue-500/20
                            transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-violet-500">
            Забронировать сейчас
          </button>
        </div>
        
        {/* Навигационные точки */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setHeroIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === heroIndex
                  ? 'bg-blue-600 w-6'
                  : 'bg-gray-300 hover:bg-gray-500'
              }`}
              aria-label={`Перейти к слайду ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Секция с домиками (карусель) */}
      <section className="w-full px-4 py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center font-[unbounded] text-blue-800 animate-fade-in">
            Наши домики
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-blue-700 mx-auto mb-12 rounded-full"></div>
          
          <div className="relative">
            {/* Кнопки навигации */}
            {cabins.length > itemsPerGroup && (
              <>
                <button
                  onClick={prevGroup}
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm rounded-full p-3 hover:bg-blue-600 transition-all duration-300 hover:scale-110 animate-pulse-once"
                  aria-label="Предыдущие домики"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <button
                  onClick={nextGroup}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm rounded-full p-3 hover:bg-blue-600 transition-all duration-300 hover:scale-110 animate-pulse-once"
                  aria-label="Следующие домики"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
            
            {/* Карусель с анимацией */}
            <div className="relative overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${groupIndex * 100}%)` }}
              >
                {Array.from({ length: Math.ceil(cabins.length / itemsPerGroup) }).map((_, groupIdx) => {
                  const start = groupIdx * itemsPerGroup;
                  const groupCabins = cabins.slice(start, start + itemsPerGroup);
                  return (
                    <div key={groupIdx} className="w-full flex-shrink-0">
                      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${itemsPerGroup} gap-6`}>
                        {groupCabins.map(cabin => (
                          <div
                            key={cabin.id}
                            className="relative overflow-hidden rounded-xl bg-gray-800/40 backdrop-blur-md border border-violet-500/20 shadow-md hover:shadow-lg transition-all duration-300"
                          >
                            <CabinCard
                              id={cabin.id}
                              title={cabin.title}
                              description={cabin.description}
                              price={cabin.price}
                              imageUrl={cabin.imageUrl}
                              alt={cabin.alt}
                              onBook={(id) => navigate('/booking', { state: { serviceId: id } })}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Секция с услугами */}
      <section className="relative py-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop')] bg-cover bg-center bg-no-repeat opacity-20"
          role="img"
          aria-label="Фоновое изображение леса"
        ></div>
        
        <div className="relative max-w-7xl mx-auto px-4 z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center font-[unbounded] text-blue-800 animate-fade-in">
            Услуги и преимущества
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-blue-700 mx-auto mb-12 rounded-full"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 rounded-xl bg-white/50 backdrop-blur-md border border-blue-200/30 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in">
              <span className="inline-block text-4xl mb-4 bg-gradient-to-br from-blue-400 to-blue-600 bg-clip-text text-transparent">🏊</span>
              <h3 className="text-lg font-bold mb-2 font-[unbounded] text-gray-800">Баня</h3>
              <p className="text-gray-700 font-[raleway] text-sm">Крытая баня с сауной</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-white/50 backdrop-blur-md border border-blue-200/30 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in">
              <span className="inline-block text-4xl mb-4 bg-gradient-to-br from-blue-400 to-blue-600 bg-clip-text text-transparent">🚣</span>
              <h3 className="text-lg font-bold mb-2 font-[unbounded] text-gray-800">Активный отдых</h3>
              <p className="text-gray-700 font-[raleway] text-sm">Прогулки на лодках, велосипеды и пешие маршруты</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-white/50 backdrop-blur-md border border-blue-200/30 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in">
              <span className="inline-block text-4xl mb-4 bg-gradient-to-br from-blue-400 to-blue-600 bg-clip-text text-transparent">🍽️</span>
              <h3 className="text-lg font-bold mb-2 font-[unbounded] text-gray-800">Еда</h3>
              <p className="text-gray-700 font-[raleway] text-sm">Блюда из местных экологически чистых продуктов</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;