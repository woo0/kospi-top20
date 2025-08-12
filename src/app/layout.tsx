import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KOSPI 시총 상위 20위 | 실시간 주식 정보",
  description: "KOSPI 시가총액 상위 20개 종목의 실시간 주가 정보를 모바일과 데스크톱에서 확인하세요. 현재가, 등락률, 시가총액 정보를 제공합니다.",
  viewport: "width=device-width, initial-scale=1",
  keywords: "KOSPI, 주식, 시가총액, 상위종목, 실시간주가, 한국주식",
  openGraph: {
    title: "KOSPI 시총 상위 20위",
    description: "KOSPI 시가총액 상위 20개 종목 실시간 정보",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
