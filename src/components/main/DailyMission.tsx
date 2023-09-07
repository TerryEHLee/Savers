"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import supabase from "@/libs/supabase";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import RandomMission from "@/app/profile/components/RandomMission";
import { ToastInfo } from "@/libs/toastifyAlert";
import { useAuth } from "@/hooks/useAuth";

const DailyMission = () => {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  const currentUser = useAuth();

  const missionHandler = () => {
    if (!currentUser) {
      ToastInfo("로그인이 필요한 서비스 입니다.");
      router.push("/login");
    } else {
      router.push(`/profile/${currentUser.uid}/mymission/missiondoing`);
    }
  };

  return (
    <>
      <h1 className="sm:text-2xl mb-6 font-semibold inline-block text-lg">
        일일미션
      </h1>

      <span
        className={`text-gray-700 ml-2 text-[14px] relative cursor-pointer${
          isHovered ? "hovered" : ""
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        ?
        {isHovered && (
          <div className="absolute left-1 bottom-3 bg-[#eaf0e5] w-[220px] rounded-md p-1.5">
            하루마다 주어지는 일일미션을 완료해 나만의 미션 캘린더를 채워보세요!
          </div>
        )}
      </span>

      <div
        onClick={missionHandler}
        className="h-[120px] xl:h-[158px] bg-[#5FD100] flex relative items-center justify-between w-full  rounded-2xl p-8 mb-16 cursor-pointer"
      >
        <img
          src="assets/mission/card.png"
          alt="카드 이미지"
          className="absolute right-20 xl:h-full h-[120px] "
        />

        <div>
          <span className="text-white text-[20px]">지구를 지키는</span>
          <br />
          <span className="font-semibold text-white text-[20px]">
            일일미션 랜덤 뽑기
          </span>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className="inline-block"
          style={{ verticalAlign: "middle" }}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.29289 19.7071C7.90237 19.3166 7.90237 18.6834 8.29289 18.2929L14.5858 12L8.29289 5.70711C7.90237 5.31658 7.90237 4.68342 8.29289 4.29289C8.68342 3.90237 9.31658 3.90237 9.70711 4.29289L16.7071 11.2929C17.0976 11.6834 17.0976 12.3166 16.7071 12.7071L9.70711 19.7071C9.31658 20.0976 8.68342 20.0976 8.29289 19.7071Z"
            fill="white"
          />
        </svg>
      </div>
    </>
  );
};

export default DailyMission;
