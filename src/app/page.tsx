'use client';

import { useState, useEffect } from 'react';
import { Stock } from '@/types/stock';
import { stockApi } from '@/lib/api';
import StockCard from '@/components/StockCard';
import StockTable from '@/components/StockTable';
import LoadingSpinner from '@/components/LoadingSpinner';
import PullToRefresh from '@/components/PullToRefresh';
import { RefreshCw, Grid, List, TrendingUp } from 'lucide-react';

export default function Home() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [viewMode, setViewMode] = useState<'card' | 'table'>('card');
  const [refreshing, setRefreshing] = useState(false);

  const fetchStocks = async () => {
    try {
      setError(null);
      const response = await stockApi.getTop20Stocks();
      if (response.success) {
        setStocks(response.data);
        setLastUpdated(response.lastUpdated);
      } else {
        setError(response.error || 'Failed to fetch stock data');
      }
    } catch {
      setError('네트워크 오류가 발생했습니다.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchStocks();
  };

  useEffect(() => {
    fetchStocks();

    // 1분마다 자동 새로고침
    const interval = setInterval(fetchStocks, 60000);
    return () => clearInterval(interval);
  }, []);

  const formatLastUpdated = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('ko-KR');
  };

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
              KOSPI 시가총액 상위 20위
            </h1>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                새로고침
              </button>
              
              <div className="flex items-center bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setViewMode('card')}
                  className={`flex items-center gap-2 px-3 py-2 rounded-l-lg transition-colors ${
                    viewMode === 'card'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                  <span className="hidden sm:inline">카드</span>
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`flex items-center gap-2 px-3 py-2 rounded-r-lg transition-colors ${
                    viewMode === 'table'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                >
                  <List className="w-4 h-4" />
                  <span className="hidden sm:inline">테이블</span>
                </button>
              </div>
            </div>
            
            {lastUpdated && (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                마지막 업데이트: {formatLastUpdated(lastUpdated)}
              </p>
            )}
          </div>
        </header>

        {/* Content */}
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="text-center py-12">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
              <p className="text-red-600 dark:text-red-400 font-medium">{error}</p>
              <button
                onClick={handleRefresh}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                다시 시도
              </button>
            </div>
          </div>
        ) : (
          <>
            {viewMode === 'card' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {stocks.map((stock) => (
                  <StockCard key={stock.code} stock={stock} />
                ))}
              </div>
            ) : (
              <StockTable stocks={stocks} />
            )}
          </>
        )}
        </div>
      </div>
    </PullToRefresh>
  );
}