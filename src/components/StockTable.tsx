'use client';

import { Stock } from '@/types/stock';
import { formatCurrency, formatMarketCap, getChangeColor, formatChangePercent } from '@/lib/utils';

interface StockTableProps {
  stocks: Stock[];
}

export default function StockTable({ stocks }: StockTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow-md text-sm">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              순위
            </th>
            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              종목명
            </th>
            <th className="px-2 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              현재가
            </th>
            <th className="px-2 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              등락률
            </th>
            <th className="px-2 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider hidden sm:table-cell">
              등락액
            </th>
            <th className="px-2 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider hidden md:table-cell">
              시가총액
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
          {stocks.map((stock) => {
            const changeColorClass = getChangeColor(stock.changePercent);
            
            return (
              <tr key={stock.code} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <td className="px-2 py-3 text-sm">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-bold rounded-full">
                    {stock.rank}
                  </span>
                </td>
                <td className="px-2 py-3">
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {stock.name}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 sm:hidden">
                      {stock.code} • {formatMarketCap(stock.marketCap)}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">
                      {stock.code}
                    </div>
                  </div>
                </td>
                <td className="px-2 py-3 text-right text-sm font-medium text-gray-900 dark:text-gray-100">
                  {formatCurrency(stock.currentPrice)}
                </td>
                <td className={`px-2 py-3 text-right text-sm font-semibold ${changeColorClass}`}>
                  {formatChangePercent(stock.changePercent)}
                  <div className={`text-xs ${changeColorClass} sm:hidden`}>
                    {stock.changeAmount > 0 ? '+' : ''}{formatCurrency(stock.changeAmount)}
                  </div>
                </td>
                <td className={`px-2 py-3 text-right text-sm font-medium ${changeColorClass} hidden sm:table-cell`}>
                  {stock.changeAmount > 0 ? '+' : ''}{formatCurrency(stock.changeAmount)}
                </td>
                <td className="px-2 py-3 text-right text-sm text-gray-600 dark:text-gray-400 hidden md:table-cell">
                  {formatMarketCap(stock.marketCap)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}