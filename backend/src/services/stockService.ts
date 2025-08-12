import axios from 'axios';
import yahooFinance from 'yahoo-finance2';
import { Stock } from '../types/stock';

// Yahoo Finance 알림 숨기기
yahooFinance.suppressNotices(['yahooSurvey']);

let stockCache: Stock[] = [];
let lastUpdateTime: Date | null = null;
const CACHE_DURATION = 30 * 1000; // 30초 캐시

// KOSPI 상위 20개 종목 정보 (Yahoo Finance 심볼 포함)
const TOP_20_STOCKS = [
  { symbol: '005930.KS', name: '삼성전자', code: '005930' },
  { symbol: '000660.KS', name: 'SK하이닉스', code: '000660' },
  { symbol: '373220.KS', name: 'LG에너지솔루션', code: '373220' },
  { symbol: '006400.KS', name: '삼성SDI', code: '006400' },
  { symbol: '035420.KS', name: 'NAVER', code: '035420' },
  { symbol: '207940.KS', name: '삼성바이오로직스', code: '207940' },
  { symbol: '035720.KS', name: '카카오', code: '035720' },
  { symbol: '051910.KS', name: 'LG화학', code: '051910' },
  { symbol: '096770.KS', name: 'SK이노베이션', code: '096770' },
  { symbol: '005380.KS', name: '현대자동차', code: '005380' },
  { symbol: '000270.KS', name: '기아', code: '000270' },
  { symbol: '005490.KS', name: 'POSCO홀딩스', code: '005490' },
  { symbol: '028260.KS', name: '삼성물산', code: '028260' },
  { symbol: '015760.KS', name: '한국전력', code: '015760' },
  { symbol: '105560.KS', name: 'KB금융', code: '105560' },
  { symbol: '055550.KS', name: '신한지주', code: '055550' },
  { symbol: '066570.KS', name: 'LG전자', code: '066570' },
  { symbol: '010950.KS', name: 'S-Oil', code: '010950' },
  { symbol: '009540.KS', name: 'HD한국조선해양', code: '009540' },
  { symbol: '086790.KS', name: '하나금융지주', code: '086790' }
];

export const getTop20Stocks = async (): Promise<Stock[]> => {
  // 캐시된 데이터가 있고 아직 유효하면 반환
  if (stockCache.length > 0 && lastUpdateTime && 
      Date.now() - lastUpdateTime.getTime() < CACHE_DURATION) {
    return stockCache;
  }

  try {
    console.log('Fetching real stock data from Yahoo Finance...');
    const realData = await fetchRealStockData();
    
    stockCache = realData;
    lastUpdateTime = new Date();
    
    console.log(`Successfully fetched ${realData.length} stocks`);
    return stockCache;
  } catch (error) {
    console.error('Error fetching stock data:', error);
    
    // 에러 발생 시 캐시된 데이터가 있으면 반환
    if (stockCache.length > 0) {
      console.log('Using cached data due to API error');
      return stockCache;
    }
    
    // 캐시도 없고 API도 실패하면 mock 데이터 사용
    console.log('Using mock data as fallback');
    const fallbackData = generateMockStockData();
    return fallbackData;
  }
};

// Yahoo Finance API를 통한 실제 주식 데이터 가져오기 (재시도 로직 포함)
const fetchRealStockData = async (retryCount = 0): Promise<Stock[]> => {
  const MAX_RETRIES = 2;
  
  try {
    const symbols = TOP_20_STOCKS.map(stock => stock.symbol);
    
    // 병렬로 모든 주식 데이터 가져오기 (기본 필드 사용)
    const quotes = await yahooFinance.quote(symbols);
    
    const stocks: Stock[] = [];
    
    // 각 주식의 데이터 처리
    for (let i = 0; i < TOP_20_STOCKS.length; i++) {
      const stockInfo = TOP_20_STOCKS[i];
      const quote = (quotes as any)[stockInfo.symbol] || (quotes as any)[i];
      
      if (quote && quote.regularMarketPrice !== null && quote.regularMarketPrice !== undefined) {
        const currentPrice = quote.regularMarketPrice;
        const previousClose = quote.regularMarketPreviousClose || currentPrice;
        const changeAmount = currentPrice - previousClose;
        const changePercent = previousClose > 0 ? ((changeAmount / previousClose) * 100) : 0;
        
        // 시가총액 계산 (Yahoo Finance에서 제공하는 값 우선 사용)
        let marketCap = quote.marketCap;
        if (!marketCap && quote.sharesOutstanding) {
          marketCap = currentPrice * quote.sharesOutstanding;
        }
        
        stocks.push({
          code: stockInfo.code,
          name: stockInfo.name,
          currentPrice: Math.round(currentPrice),
          changePercent: Number(changePercent.toFixed(2)),
          changeAmount: Math.round(changeAmount),
          marketCap: Math.round(marketCap || 0),
          rank: i + 1
        });
      } else {
        console.warn(`No data available for ${stockInfo.name} (${stockInfo.symbol})`);
        
        // 데이터가 없는 경우 기본값으로 채우기
        stocks.push({
          code: stockInfo.code,
          name: stockInfo.name,
          currentPrice: 0,
          changePercent: 0,
          changeAmount: 0,
          marketCap: 0,
          rank: i + 1
        });
      }
    }
    
    // 유효한 데이터가 있는 주식들만 필터링하고 시가총액 기준 정렬
    const validStocks = stocks.filter(stock => stock.currentPrice > 0 && stock.marketCap > 0);
    
    if (validStocks.length === 0) {
      throw new Error('No valid stock data received');
    }
    
    return validStocks.sort((a, b) => b.marketCap - a.marketCap).map((stock, index) => ({
      ...stock,
      rank: index + 1
    }));
    
  } catch (error) {
    console.error(`Yahoo Finance API error (attempt ${retryCount + 1}):`, error);
    
    // 재시도 로직
    if (retryCount < MAX_RETRIES) {
      console.log(`Retrying in 1 second... (${retryCount + 1}/${MAX_RETRIES})`);
      await new Promise(resolve => setTimeout(resolve, 1000));
      return fetchRealStockData(retryCount + 1);
    }
    
    throw error;
  }
};

// 실제 API 연동을 위한 함수 (현재는 모의 데이터)
const generateMockStockData = (): Stock[] => {
  const stockNames = [
    '삼성전자', 'SK하이닉스', 'LG에너지솔루션', 'Samsung SDI', 'NAVER',
    '삼성바이오로직스', '카카오', 'LG화학', 'SK이노베이션', '현대자동차',
    '기아', 'POSCO홀딩스', '삼성물산', '한국전력', 'KB금융',
    '신한지주', 'LG전자', 'S-Oil', 'HD한국조선해양', '하나금융지주'
  ];

  return stockNames.map((name, index) => {
    const basePrice = Math.random() * 100000 + 10000;
    const changePercent = (Math.random() - 0.5) * 10; // -5% ~ +5%
    const changeAmount = Math.round(basePrice * (changePercent / 100));
    
    return {
      code: `A${String(index + 1).padStart(6, '0')}`,
      name,
      currentPrice: Math.round(basePrice),
      changePercent: Number(changePercent.toFixed(2)),
      changeAmount,
      marketCap: Math.round((basePrice * (Math.random() * 1000000 + 100000)) / 100000000) * 100000000, // 억원 단위
      rank: index + 1
    };
  });
};

export const getCacheInfo = () => {
  return {
    hasCache: stockCache.length > 0,
    lastUpdate: lastUpdateTime,
    cacheSize: stockCache.length
  };
};