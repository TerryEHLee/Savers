"use client";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

const NavBar = () => {
  const currentUser = useAuth();
  const router = useRouter();
  return (
    <>
      <nav className="flex justify-center items-center mx-auto pt-20">
        <ul className="flex space-x-5 items-center">
          <li>
            <button
              onClick={() => router.push("/community")}
              className="w-28 border-b-4 border-green-300 px-5 py-2 shadow-sm hover:-translate-y-2 transition ease-in-out duration-200"
            >
              전체보기
            </button>
          </li>
          <li>
            <button
              onClick={() => router.push("/community/product")}
              className="w-28 border-b-4 border-green-300 px-5 py-2 shadow-sm hover:-translate-y-2 transition ease-in-out duration-200"
            >
              제품
            </button>
          </li>
          <li>
            <button
              onClick={() => router.push("/community/restaurant")}
              className="w-28 border-b-4 border-green-300 px-5 py-2 shadow-sm hover:-translate-y-2 transition ease-in-out duration-200"
            >
              식당
            </button>
          </li>
          <li>
            <button
              onClick={() => router.push("/community/recipe")}
              className="w-28 border-b-4 border-green-300 px-5 py-2 shadow-sm hover:-translate-y-2 transition ease-in-out duration-200"
            >
              레시피
            </button>
          </li>
          <li>
            <button
              onClick={() => router.push("/community/ohjiwan")}
              className="w-28 border-b-4 border-green-300 px-5 py-2 shadow-sm hover:-translate-y-2 transition ease-in-out duration-200"
            >
              오지완
            </button>
          </li>
          {
            currentUser ? 
              <li>
                <button
                  onClick={() => router.push("/community/write")}
                  className="w-28 border-b-4 border-blue-300 px-5 py-2 shadow-sm hover:-translate-y-2 transition ease-in-out duration-200"
                >
                  글쓰기
                </button>
              </li>
            :
            null
          }
        </ul>
      </nav>
    </>
  );
};

export default NavBar;
