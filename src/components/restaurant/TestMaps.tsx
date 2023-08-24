"use client";

import React, { useState, useEffect } from "react";
// import { Map, MapMarker } from "react-kakao-maps-sdk";

declare global {
  interface Window {
    kakao: any;
  }
}

//현재 접속 위치 추적
const getCurrentCoordinate = async () => {
  return new Promise((res, rej) => {
    // HTML5의 geolocaiton으로 사용할 수 있는지 확인합니다.
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다.
      navigator.geolocation.getCurrentPosition(function (pos) {
        var currentPos = new window.kakao.maps.LatLng(
          pos.coords.latitude, // 위도
          pos.coords.longitude, // 경도
        );

        res(currentPos);
      });
    } else {
      rej(new Error("현재 위치를 불러올 수 없습니다."));
    }
  });
};

const TestMaps = () => {
  const [map, setMap] = useState<any>();
  const [pointer, setPointer] = useState<any>();

  const CATEGORY_NAMES = ["헬스장", "필라테스"];
  const [searchSubmitValue, setSearchSubmitValue] = useState(null);

  //카카오맵 불러오기
  useEffect(() => {
    window.kakao.maps.load(() => {
      //지도를 담을 영역의 DOM 레퍼런스
      const container = document.getElementById("map");
      //지도를 생성 기본 옵션
      const options = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };

      //지도 생성 및 객체 리턴 / 마커 생성
      setMap(new window.kakao.maps.Map(container, options));
      setPointer(new window.kakao.maps.Marker());
    });

    //검색 결과 마커롤 표시
    //마커 담을 배열
    let markers = [];
    let currentInfowindow = null;

    //인포윈도우 오류
    const infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });

    // 장소 검색 객체를 생성합니다
    const ps = new window.kakao.maps.services.Places();

    //
    //warning!!!
    //여기부터 오류 또는 문제 발생
  }, []);

  //현재 위치 가져와서 표시 및 기본 위치 변경
  const setInitLocation = async () => {
    let locPosition = await getCurrentCoordinate();

    map.setCenter(locPosition);

    pointer.setMap(null);
    pointer.setPosition(locPosition);
    pointer.setMap(map);
  };
  setInitLocation();

  //현재 위치로 버튼 함수
  const getCurrentPosBtn = () => {
    navigator.geolocation.getCurrentPosition(
      getPosSuccess,
      () => alert("위치 정보를 가져오는데 실패했습니다."),
      {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 27000,
      },
    );
  };

  //정상적으로 현재위치 가져올 경우 실행
  const getPosSuccess = (pos: GeolocationPosition) => {
    // 현재 위치(위도, 경도) 가져온다.
    var currentPos = new window.kakao.maps.LatLng(
      pos.coords.latitude, // 위도
      pos.coords.longitude, // 경도
    );
    // 지도를 이동 시킨다.
    map.panTo(currentPos);

    // 기존 마커를 제거하고 새로운 마커를 넣는다.
    pointer.setMap(null);
    pointer.setPosition(currentPos);
    pointer.setMap(map);
  };

  return (
    <div>
      <div id="map" style={{ width: "100%", height: "400px" }}></div>
      <div onClick={getCurrentPosBtn}>현재 위치</div>
    </div>
  );
};

export default TestMaps;
