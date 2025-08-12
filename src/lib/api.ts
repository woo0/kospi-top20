import axios from 'axios';
import { StockResponse } from '@/types/stock';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const stockApi = {
  getTop20Stocks: async (): Promise<StockResponse> => {
    try {
      const response = await api.get<StockResponse>('/api/stocks/top20');
      return response.data;
    } catch (error) {
      console.error('Error fetching stocks:', error);
      throw error;
    }
  },
};

export default api;