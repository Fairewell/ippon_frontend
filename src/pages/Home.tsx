import React from 'react';
import CabinCard from '../components/CabinCard';

const Home: React.FC = () => {
  const cabins = [
    {
      id: 1,
      title: "Стандарт Люкс",
      description: "Уютный домик с видом на озеро, современный интерьер",
      price: 5000,
      imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop",
      alt: "Домик Стандарт Люкс с видом на озеро"
    },
    {
      id: 2,
      title: "Премиум Вилла",
      description: "Просторная вилла с бассейном и панорамными окнами",
      price: 12000,
      imageUrl: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop",
      alt: "Премиум Вилла с панорамными окнами"
    },
    {
      id: 3,
      title: "Эко Бунгало",
      description: "Экологичное жильё в стиле минимализм с выходом к лесу",
      price: 3500,
      imageUrl: "https://images.unsplash.com/photo-1597077353333-1a9e97424b1b?auto=format&fit=crop",
      alt: "Эко Бунгало в лесу"
    },
    {
      id: 4,
      title: "Лесной Дом",
      description: "Деревянный дом в окружении соснового леса",
      price: 6000,
      imageUrl: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop",
      alt: "Лесной Дом среди сосен"
    }
  ];

  const [heroIndex, setHeroIndex] = React.useState(0);
  const heroImages = [
    'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop',
    'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop',
    'https://images.unsplash.com/photo-1455156218386-6e6f33508429?auto=format&fit=crop'
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
    <div className="w-full bg-gradient-to-b from-gray-900 to-black text-white">
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
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-violet-600 font-[unbounded]">
            БАЗА ОТДЫХА <span className="text-violet-400">IPPON</span>
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl mb-8 mx-auto max-w-2xl text-gray-200 font-[raleway] font-medium">
            Отдых в гармонии с природой на берегу озера Щучье
          </p>
          <button className="inline-block px-8 py-3 text-lg font-[unbounded] font-bold text-white bg-gradient-to-r from-purple-600 to-violet-800 rounded-full
                            transition-all duration-300 hover:from-purple-700 hover:to-violet-900 hover:shadow-lg hover:shadow-purple-500/20
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
                  ? 'bg-violet-600 w-6'
                  : 'bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Перейти к слайду ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Секция с домиками (карусель) */}
      <section className="w-full px-4 py-16 bg-gradient-to-b from-transparent to-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center font-[unbounded] bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-violet-600">
            Наши домики
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-violet-700 mx-auto mb-12 rounded-full"></div>
          
          <div className="relative">
            {/* Кнопки навигации */}
            {cabins.length > itemsPerGroup && (
              <>
                <button
                  onClick={prevGroup}
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 backdrop-blur-sm rounded-full p-3 hover:bg-violet-700 transition-all duration-300 hover:scale-110 animate-pulse-once"
                  aria-label="Предыдущие домики"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <button
                  onClick={nextGroup}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 backdrop-blur-sm rounded-full p-3 hover:bg-violet-700 transition-all duration-300 hover:scale-110 animate-pulse-once"
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
                              title={cabin.title}
                              description={cabin.description}
                              price={cabin.price}
                              imageUrl={cabin.imageUrl}
                              alt={cabin.alt}
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
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center font-[unbounded] bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-violet-600">
            Услуги и преимущества
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-violet-700 mx-auto mb-12 rounded-full"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 rounded-xl bg-gray-800/50 backdrop-blur-md border border-violet-500/20 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <span className="inline-block text-4xl mb-4 bg-gradient-to-br from-purple-400 to-violet-600 bg-clip-text text-transparent">🏊</span>
              <h3 className="text-lg font-bold mb-2 font-[unbounded] text-white">Бассейн и SPA</h3>
              <p className="text-gray-300 font-[raleway] text-sm">Крытый подогреваемый бассейн и комплекс SPA-услуг</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-gray-800/50 backdrop-blur-md border border-violet-500/20 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <span className="inline-block text-4xl mb-4 bg-gradient-to-br from-purple-400 to-violet-600 bg-clip-text text-transparent">🚣</span>
              <h3 className="text-lg font-bold mb-2 font-[unbounded] text-white">Активный отдых</h3>
              <p className="text-gray-300 font-[raleway] text-sm">Прогулки на лодках, велосипеды и пешие маршруты</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-gray-800/50 backdrop-blur-md border border-violet-500/20 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <span className="inline-block text-4xl mb-4 bg-gradient-to-br from-purple-400 to-violet-600 bg-clip-text text-transparent">🍽️</span>
              <h3 className="text-lg font-bold mb-2 font-[unbounded] text-white">Ресторан</h3>
              <p className="text-gray-300 font-[raleway] text-sm">Блюда из местных экологически чистых продуктов</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;