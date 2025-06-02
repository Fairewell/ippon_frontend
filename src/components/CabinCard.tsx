import React from 'react';

interface CabinCardProps {
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  alt?: string;
}

const CabinCard: React.FC<CabinCardProps> = ({
  title,
  description,
  price,
  imageUrl,
  alt
}) => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800/50 to-violet-900/30 backdrop-blur-md border border-violet-500/30 p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:border-purple-400/50 group">
      {/* Image placeholder with glass effect */}
      <div className="mb-4 h-48 overflow-hidden rounded-xl relative">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-violet-800/30 backdrop-blur-sm"></div>
        <div className="relative h-full w-full flex items-center justify-center">
          <span className="text-gray-200 font-[raleway] font-medium bg-black/40 px-4 py-2 rounded-lg backdrop-blur-sm">Изображение домика</span>
        </div>
      </div>
      
      <h3 className="mb-2 text-xl font-bold font-[unbounded] text-white">
        {title}
      </h3>
      <p className="mb-4 text-gray-300 font-[raleway] font-medium">{description}</p>
      
      <div className="flex items-center justify-between mt-6">
        <span className="text-2xl font-[raleway] lining-nums font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-violet-500">
          ₽{price}/ночь
        </span>
        <button className="px-5 py-2.5 font-[unbounded] font-bold text-white bg-gradient-to-r from-purple-600 to-violet-800 rounded-xl
                          transition-all duration-300 hover:from-purple-700 hover:to-violet-900 hover:shadow-lg hover:shadow-purple-500/30
                          transform hover:scale-105 group-hover:-translate-y-0.5">
          Забронировать
        </button>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-violet-600/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-500/10 rounded-full -translate-x-1/4 translate-y-1/4"></div>
    </div>
  );
};

export default CabinCard;