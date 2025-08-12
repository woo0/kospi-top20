# KOSPI Top 20 - 실시간 주식 정보

한국 KOSPI 시가총액 상위 20개 종목의 실시간 주가 정보를 제공하는 반응형 웹 애플리케이션입니다.

## 🚀 라이브 데모

- **프론트엔드**: [배포 후 URL 업데이트 예정]
- **GitHub**: https://github.com/woo0/kospi-top20

## ✨ 주요 기능

- 📊 **실시간 데이터**: Yahoo Finance API를 통한 실제 KOSPI 주식 데이터
- 📱 **반응형 디자인**: 모바일과 데스크톱 모두 최적화
- 🔄 **Pull-to-Refresh**: 모바일에서 아래로 당겨서 새로고침
- 🎯 **듀얼 뷰**: 카드뷰(모바일용) + 테이블뷰(데스크톱용)
- ⚡ **자동 업데이트**: 30초마다 자동 데이터 새로고침
- 🛡️ **에러 처리**: API 실패시 캐시된 데이터 사용

## 🏗️ 기술 스택

### Frontend
- **Next.js 15** + TypeScript
- **Tailwind CSS** (반응형 디자인)
- **Lucide React** (아이콘)
- **Axios** (HTTP 클라이언트)

### Backend
- **Express.js** + TypeScript
- **Yahoo Finance API** (실시간 주식 데이터)
- **CORS** 지원
- **30초 캐싱** 시스템

## 🚀 로컬 개발 환경 설정

### 1. 저장소 클론
```bash
git clone https://github.com/woo0/kospi-top20.git
cd kospi-top20
```

### 2. 의존성 설치
```bash
# 프론트엔드
npm install

# 백엔드
cd backend
npm install
cd ..
```

### 3. 개발 서버 실행
```bash
# 터미널 1: 백엔드 서버 (포트 8000)
cd backend
npm run dev

# 터미널 2: 프론트엔드 서버 (포트 3000)
npm run dev
```

### 4. 브라우저에서 확인
- 프론트엔드: http://localhost:3000
- 백엔드 API: http://localhost:8000/api/stocks/top20

## 📱 모바일 접속

같은 WiFi 네트워크에서 다른 디바이스로 접속:
- 프론트엔드: http://[YOUR-IP]:3000
- 백엔드: http://[YOUR-IP]:8000

## 📊 실제 데이터 예시

```json
{
  "success": true,
  "data": [
    {
      "code": "005930",
      "name": "삼성전자",
      "currentPrice": 71100,
      "changePercent": 0.14,
      "changeAmount": 100,
      "marketCap": 468443090386944,
      "rank": 1
    }
  ]
}
```

## 🔧 환경 변수

### 프론트엔드 (.env.local)
```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 백엔드
```bash
PORT=8000
```

## 📦 배포

### Vercel (프론트엔드)
1. Vercel에 GitHub 연동
2. 자동 배포 설정

### Railway/Render (백엔드)
1. 플랫폼에 GitHub 연동
2. 환경 변수 설정
3. 자동 배포

## 📈 포함된 종목 (상위 20개)

1. 삼성전자 (005930)
2. SK하이닉스 (000660)
3. LG에너지솔루션 (373220)
4. 삼성SDI (006400)
5. NAVER (035420)
6. 삼성바이오로직스 (207940)
7. 카카오 (035720)
8. LG화학 (051910)
9. SK이노베이션 (096770)
10. 현대자동차 (005380)
11. 기아 (000270)
12. POSCO홀딩스 (005490)
13. 삼성물산 (028260)
14. 한국전력 (015760)
15. KB금융 (105560)
16. 신한지주 (055550)
17. LG전자 (066570)
18. S-Oil (010950)
19. HD한국조선해양 (009540)
20. 하나금융지주 (086790)

## 📄 라이선스

MIT License

## 👨‍💻 개발자

개발: [@woo0](https://github.com/woo0)  
AI 지원: Claude Code