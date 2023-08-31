import QueryProvider from "./QueryProvider";
import Header from "@/components/Header";
import "@/styles/globals.css";
import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Savers",
  description: "Generated by create next app",
  icons: {
    icon: [
      '/favicon.ico?v=4',
    ],
    apple: [
      'apple-touch-icon.png?v=4',
    ],
    shortcut: [
      'apple-tough-icon.png'
    ]
  },
  manifest: 'stie.webmanifest'
};

declare global {
  interface Window {
    kakao: any;
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <Header />
          {children}
        </QueryProvider>
      </body>
      {/* 해당 부분에 Script를 추가한다. */}
      <Script src="https://developers.kakao.com/sdk/js/kakao.js" async />
      {/* 이 두번째 Script는 kakao map을 이용하기 위한 Script이다. appkey 부분엔 발급받은 본인의 API KEY를 입력한다. */}
      <Script
        type="text/javascript"
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_KEY}&autoload=false&libraries=services`}
      />
    </html>
  );
}
