import React from 'react';

interface ReviewCardProps {
  id: number;
  userName: string;
  serviceName: string;
  rating: number;
  comment: string;
  date: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  userName,
  serviceName,
  rating,
  comment,
  date
}) => {
  // Форматируем дату
  const formattedDate = new Date(date).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Создаем звездочки рейтинга
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span
        key={i}
        className={`text-xl ${i <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
      >
        ★
      </span>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-start mb-4">
        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 flex items-center justify-center text-gray-500 font-bold mr-4">
          {userName.charAt(0)}
        </div>
        <div>
          <h3 className="text-lg font-bold">{userName}</h3>
          <p className="text-gray-600 text-sm">Услуга: {serviceName}</p>
          <div className="flex items-center mt-1">
            {stars}
            <span className="ml-2 text-gray-500">{rating}.0</span>
          </div>
        </div>
      </div>
      <p className="text-gray-700 mb-4">{comment}</p>
      <p className="text-gray-500 text-sm text-right">{formattedDate}</p>
    </div>
  );
};

export default ReviewCard;