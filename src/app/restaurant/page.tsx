"use client";

import React from "react";

import KakaoMap from "../kakaoMap";
import { useEffect } from "react";

const Restaurant = () => {
  //window오류로 useEffect안으로 이동
  useEffect(() => {
    const { Kakao } = window;
    if (window.kakao) {
      if (!Kakao.isInitialized()) {
        window.Kakao.init(process.env.NEXT_PUBLIC_KAKAOMAP_KEY);
      }
    }
    //기존 에러 코드
    // if (!Kakao.isInitialized()) {
    //   window.Kakao.init(process.env.NEXT_PUBLIC_KAKAOMAP_KEY);
    // }
  }, []);
  return (
    <>
      <KakaoMap />
    </>
  );
};

export default Restaurant;
