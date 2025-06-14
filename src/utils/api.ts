import axios from 'axios';

// Базовый URL API из переменных окружения
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/backend';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Разрешаем передачу кук и авторизационных заголовков
});

// Добавляем интерцептор для автоматической подстановки токена
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (username: string, email: string, password: string) => 
    api.post('/auth/register', { "username": username, "email":email, "password":password }),
  
  login: (email: string, password: string) => 
    api.post('/auth/login', { email, password }),
  
  getMe: () => api.get('/auth/me')
};

export const serviceAPI = {
  getAllServices: () => api.get('/services'),
  
  getServiceById: (id: number) => api.get(`/services/${id}`),
  
  checkAvailability: (id: number, startDate: string, endDate: string) => 
    api.get(`/services/${id}/available`, { params: { startDate, endDate } }),
  
  createService: (name: string, description: string, price_per_day: number) => 
    api.post('/services', { name, description, price_per_day }),
  
  updateService: (id: number, name: string, description: string, price_per_day: number) => 
    api.put(`/services/${id}`, { name, description, price_per_day }),
  
  deleteService: (id: number) => api.delete(`/services/${id}`)
};

export const cartAPI = {
  getCart: () => api.get('/cart'),
  
  addToCart: (serviceId: number, startDate: string, endDate: string) => 
    api.post('/cart/add', { serviceId, startDate, endDate }),
  
  removeFromCart: (id: number) => api.delete(`/cart/${id}`),
  
  clearCart: () => api.delete('/cart')
};

export const bookingAPI = {
  createBooking: (data: {
    serviceId: number;
    startDate: string;
    endDate: string;
    guestName?: string;
    guestEmail?: string;
    guestPhone?: string;
  }) => api.post('/bookings', data),
  
  getUserBookings: () => api.get('/bookings'),
  
  updateBookingStatus: (id: number, status: string) => 
    api.put(`/bookings/${id}/status`, { status }),
  
  checkout: () => api.post('/bookings/checkout')
};

export const reviewAPI = {
  getAllReviews: () => api.get('/reviews'),
  
  getReviewsByService: (serviceId: number) => api.get(`/reviews/service/${serviceId}`),
  
  createReview: (data: {
    userId: number;
    serviceId: number;
    rating: number;
    comment: string;
  }) => api.post('/reviews', data),
  
  updateReview: (id: number, data: {
    rating?: number;
    comment?: string;
  }) => api.put(`/reviews/${id}`, data),
  
  deleteReview: (id: number) => api.delete(`/reviews/${id}`)
};

export default api;