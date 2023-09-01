import React from "react";
import SocialLogin from "@/components/auth/SocialLogin";
import NicknameMaker from "@/components/auth/NicknameMaker";
import PwLogin from "@/components/auth/PwLogin";

const login = () => {
  return (
    <>
      <div className="flex w-1200 flex-col items-start gap-10 pt-28">
        <div className="text-2xl pb-16 text-gray-900  font-semibold">
          로그인/회원가입
        </div>
      </div>
      <div>
        <PwLogin />
        <SocialLogin />
      </div>
    </>
  );
};

export default login;
