"use client";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import RandomMission from "./RandomMission";
import EditProfile from "@/components/profile/EditProfile";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { fetchProfileData } from "@/api/profile/fetchProfileData";
import MobileMenu from "./MobileMenu";
import LoadingProfileSideBar from "@/components/profile/ui/LoadingProfileSideBar";

type ProfileType = {
  activePoint: number;
  birthday: string;
  email: string;
  nickname: string;
  number: string;
  profileImage: string;
  provider: string;
  uid: string;
} | null;

const SideBar = () => {
  const searchId = useParams().id as string;
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHideProfile, setIsHideProfile] = useState(false);
  const [isBtnFocused, setIsBtnFocused] = useState("");
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const webMenuBtn = (e: any) => {
    setIsBtnFocused(e.target.name);
  };

  //모바일 환경에서 프로필 이외의 다른 버튼들 클릭하면 프로필 이미지 등이 가려지게 하기 위함
  const hideProfile = (value: string) => {
    window.innerWidth >= 768
      ? setIsHideProfile(false)
      : value === "프로필"
      ? setIsHideProfile(false)
      : setIsHideProfile(true);
  };

  const currentUser = useAuth();
  const { data: profileData, isLoading } = useQuery<ProfileType>(
    ["fetchProfileData", searchId],
    () => fetchProfileData(searchId),
    { cacheTime: 30000 },
  );

  if (isLoading) return <LoadingProfileSideBar />;

  return (
    <>
      <div className="w-full flex flex-col items-start">
        <div className="w-full relative">
          <div className="flex flex-row justify-between text-[18px] font-bold text-gray-700">
            <div>마이페이지</div>
            {/* 햄버거 아이콘을 클릭하면 모바일 메뉴가 열리도록 설정 */}
            <button
              className="xl:hidden font-bold text-gray-700"
              onClick={toggleMobileMenu}
            >
              ☰
            </button>
          </div>

          {/* 모바일 메뉴 */}
          {isMobileMenuOpen && (
            <MobileMenu
              toggleMobileMenu={toggleMobileMenu}
              searchId={searchId}
              hideProfile={hideProfile}
              currentUser={currentUser}
              profileDataId={profileData?.uid}
              setShowModal={setShowModal}
            />
          )}
        </div>

        <div
          className={`md:flex flex-col ${
            isHideProfile && window.innerWidth < 768 ? "hidden" : "flex"
          } justify-center items-center gap-6 self-stretch leading-none`}
        >
          {/* <div className="hidden flex-col justify-center items-center gap-6 self-stretch leading-none"> */}
          <div className="relative w-[8.75rem] h-[8.75rem] aspect-w-1 aspect-h-1 object-contain rounded-full overflow-hidden mx-auto">
            {profileData?.profileImage ? (
              <Image
                src={profileData.profileImage}
                alt="마이페이지 프로필 이미지"
                fill
                style={{
                  objectFit: "cover",
                }}
              />
            ) : (
              <Image
                src="https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/public/profileImage/default_profile_image.svg"
                alt="마이페이지 기본 프로필 이미지"
                fill
                style={{
                  objectFit: "cover",
                }}
              />
            )}
          </div>
          <div className="flex flex-col items-center gap-4">
            <p className="text-gray-900 text-[24px] non-italic font-semibold leading-7">
              {profileData?.nickname}
            </p>
            {searchId == currentUser?.uid ? (
              <EditProfile profileData={profileData} />
            ) : (
              ""
            )}
          </div>
        </div>

        {/* 웹 브라우저 환경에서 보여야 하는 버튼들 */}
        <div className="hidden xl:flex flex-col items-start w-full">
          <button
            name="프로필"
            className={`btn-sidebar ${
              isBtnFocused === "프로필" ? "bg-[#E8FFD4] text-[#10C800]" : ""
            } w-full p-2 text-start rounded-2xl`}
            onClick={(e) => {
              router.push(`/profile/${searchId}/myprofile`);
              webMenuBtn(e);
            }}
          >
            프로필
          </button>
          <button
            name="나의 미션"
            className={`btn-sidebar ${
              isBtnFocused === "나의 미션" ? "bg-[#E8FFD4] text-[#10C800]" : ""
            } w-full p-2 text-start rounded-2xl`}
            onClick={(e) => {
              router.push(`/profile/${searchId}/mymission/missiondoing`);
              webMenuBtn(e);
            }}
          >
            나의 미션
          </button>
          <button
            name="커뮤니티 활동"
            className={`btn-sidebar ${
              isBtnFocused === "커뮤니티 활동" ? "bg-[#E8FFD4] text-[#10C800]"  : ""
            } w-full p-2 text-start rounded-2xl`}
            onClick={(e) => {
              router.push(`/profile/${searchId}/mycommunity/myposts`);
              webMenuBtn(e);
            }}
          >
            커뮤니티 활동
          </button>
          <button
            name="좋아요"
            className={`btn-sidebar ${
              isBtnFocused === "좋아요" ? "bg-[#E8FFD4] text-[#10C800]"  : ""
            } w-full p-2 text-start rounded-2xl`}
            onClick={(e) => {
              router.push(`/profile/${searchId}/myfavorite/myfavoriteproducts`);
              webMenuBtn(e);
            }}
          >
            좋아요
          </button>
          {currentUser && currentUser.uid == profileData?.uid && (
            <button
              className="btn-sidebar w-full p-2 text-start rounded-2xl"
              onClick={() => {
                setShowModal(true);
              }}
            >
              일일미션 뽑기
            </button>
          )}
          {currentUser && currentUser.uid == profileData?.uid && (
            <button
              name="회원정보 수정"
              className={`btn-sidebar ${
                isBtnFocused === "회원정보 수정" ? "bg-[#E8FFD4] text-[#10C800]"  : ""
              } w-full p-2 text-start rounded-2xl`}
              onClick={(e) => {
                router.push(`/profile/${searchId}/setting`);
                webMenuBtn(e);
              }}
            >
              회원정보 수정
            </button>
          )}
        </div>
        <RandomMission
          showModal={showModal}
          user={profileData}
          setShowModal={setShowModal}
          profile={profileData}
        />
      </div>
    </>
  );
};
export default SideBar;
