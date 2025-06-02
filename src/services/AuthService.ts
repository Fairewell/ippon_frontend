import { authAPI } from '../utils/api';

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
}

export interface AuthService {
  login: (email: string, password: string) => Promise<{ token: string }>;
  register: (username: string, email: string, password: string) => Promise<void>;
  getMe: () => Promise<User>;
}

export const defaultAuthService: AuthService = {
  login: async (email, password) => {
    const response = await authAPI.login(email, password);
    return { token: response.data.token };
  },
  register: async (username, email, password) => {
    await authAPI.register(username, email, password);
  },
  getMe: async () => {
    const response = await authAPI.getMe();
    return response.data;
  }
};