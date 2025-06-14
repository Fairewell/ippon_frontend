import React from 'react';

const Contacts: React.FC = () => {
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
      
      {/* Hero section */}
      <section className="relative overflow-hidden py-16 md:py-24 h-[50vh] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
          style={{
            backgroundImage: `url('https://b1b27eaa3f.cbaul-cdnwnd.com/96b91b15702471974376c7c35cc2ec28/200000041-e00a9e00ab/0a6f5c41152e67ec2d66c3841868.webp?ph=b1b27eaa3f')`,
            backgroundAttachment: 'fixed',
          }}
          role="img"
          aria-label="Фоновое изображение озера Щучье"
        ></div>
        
        <div className="absolute inset-0 bg-opacity-50 backdrop-blur-md"></div>
        
        <div className="w-full px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight text-white drop-shadow-lg font-[unbounded] animate-fade-in">
            Контакты
          </h1>
          <p className="text-lg md:text-xl text-white drop-shadow-md font-[raleway] animate-fade-in [animation-delay:0.2s]">
            Свяжитесь с нами, чтобы забронировать незабываемый отдых на озере Щучье.
          </p>
        </div>
      </section>

      {/* Contact information section */}
      <section className="w-full px-4 py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center font-[unbounded] text-blue-800 animate-fade-in">
            ИППОН
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-blue-700 mx-auto mb-12 rounded-full"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Visit Card */}
            <div className="text-center p-6 rounded-xl bg-white/70 backdrop-blur-lg border border-blue-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in">
              <span className="inline-block text-4xl mb-4 text-blue-600">📍</span>
              <h3 className="text-xl font-bold mb-4 font-[unbounded] text-gray-800">Посетите Нас</h3>
              <p className="text-gray-700 text-lg font-[raleway] leading-relaxed">
                Южное побережье озера Щучье, 2/1,<br />
                Селенгинский район, Республика Бурятия
              </p>
            </div>
            
            {/* Call Card */}
            <div className="text-center p-6 rounded-xl bg-white/70 backdrop-blur-lg border border-blue-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in [animation-delay:0.1s]">
              <span className="inline-block text-4xl mb-4 text-blue-600">📞</span>
              <h3 className="text-xl font-bold mb-4 font-[unbounded] text-gray-800">Позвоните Нам</h3>
              <p className="text-gray-700 text-lg font-[raleway] leading-relaxed">
                +7 (924) 453 70 86 (Анна)<br />
                +7 (924) 554 43 31
              </p>
            </div>
            
            {/* Write Card */}
            <div className="text-center p-6 rounded-xl bg-white/70 backdrop-blur-lg border border-blue-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in [animation-delay:0.2s]">
              <span className="inline-block text-4xl mb-4 text-blue-600">✉️</span>
              <h3 className="text-xl font-bold mb-4 font-[unbounded] text-gray-800">Напишите Нам</h3>
              <p className="text-gray-700 text-lg font-[raleway] leading-relaxed">
                WhatsApp: 8 (924) 453 70 86<br />
                Viber: 8 (964) 411 47 00<br />
                VK: <a href="https://vk.com/ipponbaza" className="text-blue-600 hover:underline transition-colors">vk.com/ipponbaza</a><br />
                Instagram: <a href="https://instagram.com/anton.sidler" className="text-blue-600 hover:underline transition-colors">instagram.com/anton.sidler</a><br />
                Telegram: <a href="https://t.me/ipponbaza" className="text-blue-600 hover:underline transition-colors">t.me/ipponbaza</a> или 89244537086
              </p>
            </div>
          </div>
          
          {/* Call to action */}
          <div className="text-center mt-12">
            <a 
              href="/booking" 
              className="inline-block bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 font-[raleway] animate-fade-in [animation-delay:0.3s]"
            >
              Забронировать
            </a>
          </div>
        </div>
      </section>
      
      {/* Map section */}
      <section className="w-full px-4 py-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center font-[unbounded] text-blue-800 animate-fade-in">
            Наше местоположение
          </h2>
          <div className="w-full h-96 rounded-xl overflow-hidden shadow-lg animate-fade-in [animation-delay:0.1s]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2488.902540606803!2d106.53127347648064!3d51.404845418190305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5da583da1d8743d9%3A0x9cc8a73db24004a8!2z0JHQsNC30LAg0L7RgtC00YvRhdCwINCY0J_Qn9Ce0J0!5e0!3m2!1sru!2sru!4v1749896885819!5m2!1sru!2sru"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              title="Карта озера Щучье"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contacts;