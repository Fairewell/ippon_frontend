import React from 'react';

interface CabinCardProps {
  id: number;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  alt?: string;
  onBook?: (id: number) => void; // Updated to accept id
}

const CabinCard: React.FC<CabinCardProps> = ({
  id,
  title,
  description,
  price,
  onBook,
  imageUrl,
  alt
}) => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-white/70 backdrop-blur-lg border border-gray-300/30 p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:border-blue-400/50 group">
      {/* Actual image */}
      <div className="mb-4 h-48 overflow-hidden rounded-xl relative">
        <img
          src={imageUrl}
          alt={alt || title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-blue-100/20 backdrop-blur-sm"></div>
      </div>
      
      <h3 className="mb-2 text-xl font-bold font-[unbounded] text-gray-800">
        {title}
      </h3>
      <p className="mb-4 text-gray-600 font-[raleway] font-medium">{description}</p>
      
      <div className="flex items-center justify-between mt-6">
        <span className="text-2xl font-[raleway] lining-nums font-bold text-blue-700">
          ₽{price}/ночь
        </span>
        <button
          onClick={() => onBook && onBook(id)}
          // Note: Actual navigation will be implemented in parent components
          className="px-5 py-2.5 font-[unbounded] font-bold text-white bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl
                      transition-all duration-300 hover:from-blue-600 hover:to-blue-800 hover:shadow-lg hover:shadow-blue-500/30
                      transform hover:scale-105 group-hover:-translate-y-0.5"
        >
          Забронировать
        </button>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100/30 rounded-full -translate-y-1/2 translate-x-1/2 backdrop-blur-sm"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-200/20 rounded-full -translate-x-1/4 translate-y-1/4 backdrop-blur-sm"></div>
    </div>
  );
};

export default CabinCard;