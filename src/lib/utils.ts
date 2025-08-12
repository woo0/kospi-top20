export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
  }).format(amount);
};

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('ko-KR').format(num);
};

export const formatMarketCap = (marketCap: number): string => {
  if (marketCap >= 1000000000000) {
    return `${(marketCap / 1000000000000).toFixed(1)}조원`;
  } else if (marketCap >= 100000000) {
    return `${(marketCap / 100000000).toFixed(1)}억원`;
  }
  return formatCurrency(marketCap);
};

export const getChangeColor = (changePercent: number): string => {
  if (changePercent > 0) return 'text-red-600';
  if (changePercent < 0) return 'text-blue-600';
  return 'text-gray-600';
};

export const formatChangePercent = (percent: number): string => {
  const sign = percent > 0 ? '+' : '';
  return `${sign}${percent.toFixed(2)}%`;
};