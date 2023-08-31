"use client";

import React, { useEffect, useState } from "react";
import MarkerLists from "@/components/restaurant/MarkerLists";

const getCurrentCoordinate = async () => {
  return new Promise((res, rej) => {
    // HTML5의 geolocaiton으로 사용할 수 있는지 확인합니다.
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다.
      navigator.geolocation.getCurrentPosition(function (position) {
        const lat = position.coords.latitude; // 위도
        const lon = position.coords.longitude; // 경도

        const coordinate = new kakao.maps.LatLng(lat, lon);
        res(coordinate);
      });
    } else {
      rej(new Error("현재 위치를 불러올 수 없습니다."));
    }
  });
};

const KakaoMap = () => {
  const [mapCenter, setMapCenter] = useState({ x: 127.1086228, y: 37.4012191 });
  const [currentCategory, setCurrentCategory] = useState(""); // 기본값으로 "전체" 카테고리 설정
  const [markerList, setMarkerList] = useState([]); // 마커 리스트 상태 추가

  useEffect(() => {
    if (window.kakao) {
      window.kakao.maps.load(() => {
        // id가 'map'인 요소에 지도를 생성
        const Container = document.getElementById("map");
        const Option = {
          // 해당 좌표는 서울 시청을 중심으로 함
          center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
          // 줌 레벨 3으로 설정
          level: 5,
        };
        const map = new window.kakao.maps.Map(Container, Option);

        const setInitLocation = async () => {
          let locPosition: any = await getCurrentCoordinate();

          setMapCenter({
            x: locPosition.La,
            y: locPosition.Ma,
          });

          // 지도 중심좌표를 접속위치로 변경합니다
          map.setCenter(locPosition);

          //현재 위치에 마커 표시
          new kakao.maps.Marker({
            position: locPosition,
            map: map,
          });

          //   CoordPlaces.refetch();
        };
        setInitLocation();

        // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
        var mapTypeControl = new kakao.maps.MapTypeControl();

        // 지도에 컨트롤을 추가해야 지도위에 표시됩니다
        // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
        map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

        // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
        var zoomControl = new kakao.maps.ZoomControl();
        map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

        //
        //
        //
        const searchPlaces = async (coordinate: any) => {
          const ps = new window.kakao.maps.services.Places();

          const options = {
            location: coordinate,
            radius: 10000,
            sort: window.kakao.maps.services.SortBy.DISTANCE,
          };

          ps.keywordSearch(
            currentCategory,
            (data: any, status: any) => {
              if (status === window.kakao.maps.services.Status.OK) {
                displayPlaces(data);
              }
            },
            options,
          );
        };

        const displayPlaces = (places: any) => {
          removeMarker();

          const newMarkerList: any = [];

          let imgSrc = "";

          places.forEach((place: any) => {
            const markerPosition = new window.kakao.maps.LatLng(
              place.y,
              place.x,
            );

            if (currentCategory === "비건베이커리") {
              imgSrc =
                "https://cdn2.iconfinder.com/data/icons/bakery-and-baking-filled/64/bakery_baked_flour-125-512.png";
            }
            if (currentCategory === "비건식당") {
              imgSrc =
                "https://cdn4.iconfinder.com/data/icons/food-delivery-59/64/15-Location-256.png";
            }
            if (currentCategory === "비건카페") {
              imgSrc =
                "https://cdn1.iconfinder.com/data/icons/location-107/64/08-Coffee-shop-512.png";
            }
            let imgSize = new kakao.maps.Size(38, 38),
              imgOption = { offset: new kakao.maps.Point(27, 69) };
            const markerImg = new window.kakao.maps.MarkerImage(
              imgSrc,
              imgSize,
              imgOption,
            );

            const marker = new window.kakao.maps.Marker({
              position: markerPosition,
              image: markerImg,
              map: map,
            });

            //     var iwContent = `<div style= "padding: 8px; width: 250px; border: 1px solid black; border-radius: 25px;">
            // <h1 class="infoWindow-name" style="font-weight: bold">${place.place_name}</h1>
            // <p class="infoWindow-address" style="font-size: 13px; color: #1f1f1f">${place.address_name}</p>
            // <p class="infoWindow-road-address" style="font-size: 13px; color: #1f1f1f">(지번)${place.road_address_name}</p>
            // <p class="infoWindow-phone"style="font-size: 13px; color: #1f1f1f" >${place.phone}</p>
            // <a href=${place.place_url} " target="_blank"><button style="border-radius: 15px; border: 1px solid black;  background-color:rgb(249 250 251); color:rgb(107 114 128); font-size: 13px; padding:3px; width: 90px;">상세보기</button></a>
            // </div>`;

            //     var iwRemoveable = true;

            //     // 인포윈도우를 생성합니다
            //     var infowindow = new kakao.maps.InfoWindow({
            //       content: iwContent,
            //       removable: iwRemoveable,
            //     });

            //     window.kakao.maps.event.addListener(marker, "click", function () {
            //       // 마커에 마우스오버 이벤트가 발생하면 인포윈도우를 마커위에 표시합니다
            //       infowindow.open(map, marker);
            //     });

            //     // 마커에 마우스아웃 이벤트: map을 누르면 실행
            //     window.kakao.maps.event.addListener(map, "click", function () {
            //       // 마커에 마우스아웃 이벤트가 발생하면 인포윈도우를 제거합니다
            //       infowindow.close();
            //     });
            var content = document.createElement("div");

            // 커스텀 오버레이 엘리먼트를 만들고, 컨텐츠를 추가합니다
            var info = document.createElement("div");
            // info.appendChild(document.createTextNode(pos.title));
            info.className = "overlay";
            info.innerHTML = `<div style= "background-color:white; padding: 10px; padding-left:15px; width: 250px; border-radius: 20px;">
            <h1 class="infoWindow-name" style="font-weight: bold">${place.place_name}</h1>
             <p class="infoWindow-address" style="font-size: 13px; color: rgb(148 163 184)">${place.address_name}</p>
             <p class="infoWindow-road-address" style="font-size: 13px; color: rgb(148 163 184)">(지번)${place.road_address_name}</p>
             <p class="infoWindow-phone"style="font-size: 13px; color: rgb(148 163 184)" >${place.phone}</p>
             <a href=${place.place_url} " target="_blank"><button style="margin-left: 60px; auto; border-radius: 15px;  background-color:rgb(249 250 251); color:rgb(100 116 139); font-size: 13px; padding:3px; width: 90px;">상세보기</button></a>
             </div>`;
            content.appendChild(info);

            var closeBtn = document.createElement("button");
            closeBtn.innerHTML = `<p style="margin-top:5px; margin-left: 105px; padding-top:2px; font-weight:bold; background-color: white;height:30px; width:30px; border-radius: 30px ">X</p>`;
            // 닫기 이벤트 추가
            closeBtn.onclick = function () {
              overlay.setMap(null);
            };

            content.appendChild(closeBtn);

            var overlay = new window.kakao.maps.CustomOverlay({
              content: content,
              position: marker.getPosition(),
            });

            // 마커를 클릭했을 때 커스텀 오버레이를 표시합니다
            window.kakao.maps.event.addListener(marker, "click", function () {
              overlay.setMap(map);
            });

            markers.push(marker);
            newMarkerList.push(place);
          });
          setMarkerList(newMarkerList);
        };

        const removeMarker = () => {
          markers.forEach((marker: any) => {
            marker.setMap(null);
          });
          markers = [];
        };

        let markers: any = [];

        const mapIdleHandler = () => {
          const latlng = map.getCenter();
          const coordinate = new window.kakao.maps.LatLng(
            latlng.getLat(),
            latlng.getLng(),
          );
          searchPlaces(coordinate);
        };

        window.kakao.maps.event.addListener(map, "idle", mapIdleHandler);
        return () => {
          window.kakao.maps.event.removeListener(map, "idle", mapIdleHandler);
        };
      });
    }
  }, [currentCategory]);

  return (
    <div>
      <div className="mt-20">
        <div className="text-lg mb-3 font-semibold ">비건식당 찾기</div>
        <div id="pageBody">
          <div id="pageLeft" className="  w-[29%] float-left">
            <div id="buttons" className="mb-3">
              <button
                onClick={() => setCurrentCategory("비건")}
                className={`categoryBtn ${
                  currentCategory === "비건" ? "active" : ""
                }`}
              >
                전체
              </button>
              <button
                onClick={() => setCurrentCategory("비건식당")}
                className={`categoryBtn ${
                  currentCategory === "비건식당" ? "active" : ""
                }`}
              >
                식당
              </button>
              <button
                onClick={() => setCurrentCategory("비건베이커리")}
                className={`categoryBtn ${
                  currentCategory === "비건베이커리" ? "active" : ""
                }`}
              >
                베이커리
              </button>
              <button
                onClick={() => setCurrentCategory("비건카페")}
                className={`categoryBtn ${
                  currentCategory === "비건카페" ? "active" : ""
                }`}
              >
                카페
              </button>
            </div>
            <MarkerLists markerList={markerList} />
          </div>
          <div id="map" className="w-[70%] h-[36vw] float-right"></div>
        </div>
      </div>
    </div>
  );
};

export default KakaoMap;
