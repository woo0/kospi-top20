# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

KOSPI Top 20 is a real-time stock information web application that displays the top 20 KOSPI (Korea Composite Stock Price Index) stocks by market capitalization. The application provides current prices, percentage changes, and market cap data in both mobile-friendly card view and desktop table view.

## Architecture

### Frontend (Next.js 15 + TypeScript)
- **Framework**: Next.js 15 with App Router and TypeScript
- **Styling**: Tailwind CSS for responsive design
- **UI Components**: Custom components for stock cards and tables
- **State Management**: React hooks for local state
- **API Client**: Axios for HTTP requests
- **Mobile Features**: Pull-to-refresh, responsive design

### Backend (Node.js + Express + TypeScript)
- **Framework**: Express.js with TypeScript
- **Data Source**: Yahoo Finance API (real-time KOSPI stock data)
- **Caching**: In-memory cache with 30-second TTL
- **API**: RESTful endpoints for stock data
- **Error Handling**: Automatic retry logic with fallback to cached data

## Development Commands

### Frontend (run from root directory)
```bash
npm run dev        # Start development server (http://localhost:3000)
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
```

### Backend (run from backend/ directory)
```bash
npm run dev        # Start development server (http://localhost:8000)
npm run build      # Compile TypeScript
npm run start      # Start production server
```

### Full Development Setup
1. Start backend: `cd backend && npm run dev`
2. Start frontend (new terminal): `npm run dev`
3. Access application at http://localhost:3000

## Key Features

- **Real-time Data**: Stock information updates every minute
- **Responsive Design**: Optimized for both mobile and desktop
- **Pull-to-Refresh**: Mobile gesture support for data refresh
- **Dual View Modes**: Card view for mobile, table view for desktop
- **Auto-refresh**: Automatic data updates every 60 seconds
- **Error Handling**: Graceful error states with retry options

## API Endpoints

- `GET /api/stocks/top20` - Fetch top 20 KOSPI stocks
- `GET /health` - Health check endpoint
- `GET /api/stocks/cache-info` - Cache debugging information

## File Structure

```
├── src/
│   ├── app/                 # Next.js app router
│   ├── components/          # React components
│   │   ├── StockCard.tsx    # Mobile-optimized stock card
│   │   ├── StockTable.tsx   # Desktop stock table
│   │   └── PullToRefresh.tsx # Mobile pull-to-refresh
│   ├── lib/                 # Utilities and API client
│   └── types/               # TypeScript type definitions
├── backend/
│   └── src/
│       ├── routes/          # Express routes
│       ├── services/        # Business logic
│       └── types/           # Backend type definitions
└── .env.local               # Environment variables
```

## Environment Variables

- `NEXT_PUBLIC_API_URL`: Backend API URL (default: http://localhost:8000)
- `PORT`: Backend server port (default: 8000)

## Mobile Optimization

The application is built mobile-first with:
- Touch-friendly interfaces
- Pull-to-refresh functionality
- Responsive breakpoints (sm: 640px, md: 768px, lg: 1024px, xl: 1280px)
- Optimized font sizes and spacing
- Compressed table view for small screens

## Development Notes

- **Real Data Integration**: Backend now uses Yahoo Finance API for actual KOSPI stock prices
- **Stock Data**: Includes Samsung Electronics (71,100 KRW), SK Hynix, LG Energy Solution, etc.
- **Fallback System**: Mock data serves as fallback when API fails
- **Performance**: 30-second cache + retry logic for optimal response times
- **Error Handling**: Graceful degradation from real API → cached data → mock data
- Frontend automatically handles API errors and shows appropriate user feedback
- The application supports both light and dark modes through Tailwind CSS

## Data Sources

- **Primary**: Yahoo Finance API (real-time Korean stock data with .KS suffix)
- **Fallback**: In-memory cached data from previous successful API calls
- **Emergency**: Mock data generator for complete API failure scenarios