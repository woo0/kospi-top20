import { Router } from 'express';
import { getTop20Stocks, getCacheInfo } from '../services/stockService';
import { StockResponse } from '../types/stock';

const router = Router();

// KOSPI 시총 상위 20개 종목 조회
router.get('/top20', async (req, res) => {
  try {
    const stocks = await getTop20Stocks();
    
    const response: StockResponse = {
      success: true,
      data: stocks,
      lastUpdated: new Date().toISOString()
    };
    
    res.json(response);
  } catch (error) {
    console.error('Error in /top20 endpoint:', error);
    
    const response: StockResponse = {
      success: false,
      data: [],
      lastUpdated: new Date().toISOString(),
      error: 'Failed to fetch stock data'
    };
    
    res.status(500).json(response);
  }
});

// 캐시 정보 조회 (디버깅용)
router.get('/cache-info', (req, res) => {
  const cacheInfo = getCacheInfo();
  res.json(cacheInfo);
});

export { router as stockRoutes };