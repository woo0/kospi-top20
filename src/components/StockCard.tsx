'use client';

import { Stock } from '@/types/stock';
import { formatCurrency, formatMarketCap, getChangeColor, formatChangePercent } from '@/lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StockCardProps {
  stock: Stock;
}

export default function StockCard({ stock }: StockCardProps) {
  const changeColorClass = getChangeColor(stock.changePercent);
  const isPositive = stock.changePercent > 0;
  const isNegative = stock.changePercent < 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-bold rounded-full">
            {stock.rank}
          </span>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-lg">
            {stock.name}
          </h3>
        </div>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {stock.code}
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {formatCurrency(stock.currentPrice)}
          </span>
          <div className={`flex items-center gap-1 ${changeColorClass}`}>
            {isPositive && <TrendingUp className="w-4 h-4" />}
            {isNegative && <TrendingDown className="w-4 h-4" />}
            <span className="font-semibold">
              {formatChangePercent(stock.changePercent)}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className={`${changeColorClass} font-medium`}>
            {stock.changeAmount > 0 ? '+' : ''}{formatCurrency(stock.changeAmount)}
          </span>
          <span className="text-gray-600 dark:text-gray-400">
            시총: {formatMarketCap(stock.marketCap)}
          </span>
        </div>
      </div>
    </div>
  );
}