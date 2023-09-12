"use client";

import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchFavoriteRestaurants } from "@/api/profile/fetchFavoriteData";
import NoListToShown from "@/components/profile/NoListShown";
import LoadingBookmarkedRestaurants from "@/components/profile/ui/LoadingBookmarkedRestaurants";
import { likeRestaurantType } from "@/types/types";

const FavoriteRestaurantsComp = ({ id }: { id : string }) => {
  const loadBoundaryValue = 12;
  const [userLikedRestaurants, setUserLikedRestaurants] = useState<likeRestaurantType[]>([]);
  const [loadCount, setLoadCount] = useState<number>(loadBoundaryValue);
  const [loadMoreBtn, setLoadMoreBtn] = useState<string>("");
  const searchId = id;

  const {
    data: favoriteRestaurantsData,
    isFetching: favoriteRestaurantsFetching,
  } = useQuery(["fetchFavoriteProducts", searchId, loadCount], () =>
    fetchFavoriteRestaurants(searchId, loadCount),
  );

  useEffect(() => {
    if (!favoriteRestaurantsData) return;
    const count = favoriteRestaurantsData.count;
    const userLikedRestaurants = favoriteRestaurantsData.favoriteRestaurants;
    setUserLikedRestaurants(userLikedRestaurants);
    if (count && count <= loadBoundaryValue) {
      setLoadMoreBtn("");
      return;
    } else if (count! > loadCount) {
      setLoadMoreBtn("더보기");
      return;
    } else if (count! <= loadCount) {
      if (count! + loadBoundaryValue > loadCount) {
        setLoadMoreBtn("접기");
      } else {
        setLoadCount(loadBoundaryValue);
        setLoadMoreBtn("더보기");
      }
      return;
    }
  }, [favoriteRestaurantsData, loadCount]);

  const handleLoadMore = async () => {
    setLoadCount((prevLoadCount) => prevLoadCount + loadBoundaryValue);
  };

  if (favoriteRestaurantsFetching) {
    return <LoadingBookmarkedRestaurants />;
  }
  if (userLikedRestaurants && userLikedRestaurants.length < 1) {
    return <NoListToShown listProp={"noBookmarkedRestaurant"} />
  }

  const shareHandler = async (url: string) => {
    navigator.clipboard.writeText(url).then(() => {
      alert("링크가 복사되었습니다.");
    });
  };
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap justify-between self-stretch bg-white mx-auto gap-2">
        {userLikedRestaurants?.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-center w-full lg:w-[49%] h-1/2"
          >
            <div className="w-full p-4 border border-gray-200 rounded-lg bg-white flex items-center">
              <div
                className="p-3 rounded-full mr-4"
                style={{ background: "#F9FAFB" }}
              >
                {item.restaurant_category!.includes("카페") ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                  >
                    <path
                      d="M9.81934 3.5C9.13022 3.5 8.57194 4.05828 8.57194 4.74741V7.10733C8.57194 7.79645 9.13022 8.35473 9.81934 8.35473C10.5085 8.35473 11.0667 7.79645 11.0667 7.10733V4.74741C11.0667 4.05828 10.5085 3.5 9.81934 3.5Z"
                      fill="#D0D5DD"
                    />
                    <path
                      d="M14.3061 3.5C13.617 3.5 13.0587 4.05828 13.0587 4.74741V7.10733C13.0587 7.79645 13.617 8.35473 14.3061 8.35473C14.9952 8.35473 15.5535 7.79645 15.5535 7.10733V4.74741C15.5535 4.05828 14.9952 3.5 14.3061 3.5Z"
                      fill="#D0D5DD"
                    />
                    <path
                      d="M18.7916 3.5C18.1024 3.5 17.5441 4.05828 17.5441 4.74741V7.10733C17.5441 7.79645 18.1024 8.35473 18.7916 8.35473C19.4807 8.35473 20.039 7.79645 20.039 7.10733V4.74741C20.039 4.05828 19.4807 3.5 18.7916 3.5Z"
                      fill="#D0D5DD"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M6.82892 10.3052C5.72783 10.3026 4.8335 11.1986 4.8335 12.2989V24.2618C4.8335 26.5995 6.73396 28.5 9.07164 28.5H19.5387C21.8764 28.5 23.7768 26.5995 23.7768 24.2618V24.0144H24.7873C27.5369 24.0144 29.7729 21.7784 29.7729 19.0289C29.7729 16.2793 27.5369 14.0433 24.7873 14.0433H23.7768V12.3C23.7768 11.1985 22.8814 10.3052 21.7809 10.3052H6.82892ZM7.32831 24.2618V12.7989H21.282V24.2618C21.282 25.2224 20.4992 26.0052 19.5387 26.0052H9.07164C8.11109 26.0052 7.32831 25.2224 7.32831 24.2618ZM23.7768 21.5185V16.537H24.7873C26.1598 16.537 27.2781 17.6553 27.2781 19.0278C27.2781 20.4002 26.1598 21.5185 24.7873 21.5185H23.7768Z"
                      fill="#D0D5DD"
                    />
                  </svg>
                ) : item.restaurant_category!.includes("베이커리") ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M25.8875 6.51096C26.8714 7.49611 27.3572 8.64193 27.3323 9.89859C27.3111 11.0955 26.8278 12.2575 26.164 13.341C25.2796 14.7882 23.9283 16.3152 22.4174 17.8807L21.5804 18.7388L20.721 19.6031L19.1392 21.1824L18.2175 22.0916C16.5336 23.7318 14.892 25.2139 13.3413 26.1629C12.2577 26.8268 11.0957 27.3088 9.89872 27.3324C8.64199 27.3573 7.49611 26.8716 6.5109 25.8865C5.03247 24.4081 4.3985 21.7204 4.77091 18.8559C5.13585 16.0461 6.47852 12.874 9.21119 9.98826L9.61349 9.57477C12.599 6.59814 15.9245 5.15217 18.8553 4.77107C21.7212 4.39868 24.409 5.03261 25.8875 6.51096ZM24.1263 8.27328C23.4026 7.54967 21.6253 6.92321 19.1766 7.2408C18.641 7.31054 18.0818 7.42512 17.5076 7.59077C17.8314 7.9644 18.2549 8.23218 18.7955 8.41277C18.9526 8.4629 19.0982 8.54374 19.2239 8.65061C19.3495 8.75748 19.4527 8.88824 19.5274 9.0353C19.6021 9.18236 19.6468 9.3428 19.659 9.50729C19.6712 9.67178 19.6506 9.83706 19.5984 9.99352C19.5462 10.15 19.4634 10.2945 19.3549 10.4187C19.2463 10.5429 19.1142 10.6444 18.9662 10.7171C18.8181 10.7898 18.6571 10.8325 18.4925 10.8425C18.3278 10.8525 18.1628 10.8297 18.0071 10.7754C16.7491 10.3569 15.7801 9.60217 15.1324 8.54727C13.9999 9.14371 12.9478 9.88152 12.0012 10.743C12.1992 11.0382 12.4645 11.3657 12.7858 11.6871C13.3139 12.2139 13.8545 12.5913 14.2506 12.7619L14.3913 12.8167C14.7048 12.9211 14.964 13.1457 15.1118 13.4412C15.2597 13.7366 15.2841 14.0787 15.1797 14.3922C15.0753 14.7056 14.8507 14.9648 14.5552 15.1127C14.2597 15.2605 13.9176 15.2849 13.6041 15.1805C12.6849 14.8742 11.7533 14.1755 11.0259 13.4481C10.7495 13.1724 10.4908 12.8796 10.2512 12.5713C9.45865 13.5275 8.79146 14.5809 8.26584 15.7061C8.60338 16.4584 9.15763 16.9441 9.98839 17.2206C10.2976 17.3284 10.552 17.5536 10.6964 17.8474C10.8408 18.1413 10.8637 18.4803 10.76 18.7909C10.6564 19.1015 10.4345 19.3588 10.1426 19.5071C9.85059 19.6554 9.51196 19.6827 9.19998 19.5832C8.51921 19.3634 7.88795 19.0126 7.34166 18.5507C7.30181 18.7625 7.26693 18.9717 7.24202 19.1772C6.92317 21.6258 7.54967 23.403 8.27331 24.1266C8.82882 24.6821 9.33948 24.8527 9.85139 24.8428C10.4218 24.8316 11.138 24.5924 12.041 24.0394C13.2267 23.3146 14.5171 22.19 15.9432 20.8262L16.7341 20.0577L17.9734 18.8285L19.6574 17.1409L20.447 16.3363C21.9828 14.7546 23.2482 13.3348 24.0391 12.042C24.5921 11.1391 24.8313 10.4229 24.8425 9.85251C24.8524 9.34187 24.6818 8.82999 24.1263 8.27328Z"
                      fill="#D0D5DD"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="33"
                    viewBox="0 0 32 33"
                    fill="none"
                  >
                    <path
                      d="M6.71694 16.6498C6.77483 16.6933 6.8234 16.748 6.85977 16.8106C6.89614 16.8732 6.91956 16.9425 6.92865 17.0144C6.46994 19.2138 5.3173 25.7062 7.28149 27.6822C8.02099 28.2587 8.94467 28.5471 9.88082 28.4937C10.817 28.5471 11.7406 28.2587 12.4801 27.6822C14.4443 25.7062 13.2917 19.2138 12.833 17.0144C12.8421 16.9425 12.8655 16.8732 12.9019 16.8106C12.9382 16.748 12.9868 16.6933 13.0447 16.6498L14.4326 15.5324C14.8525 15.1977 15.1905 14.7716 15.4208 14.2865C15.6512 13.8014 15.7677 13.2701 15.7616 12.7331V5.67616C15.7616 5.36423 15.6377 5.06506 15.4171 4.84449C15.1966 4.62392 14.8974 4.5 14.5855 4.5C14.2735 4.5 13.9744 4.62392 13.7538 4.84449C13.5332 5.06506 13.4093 5.36423 13.4093 5.67616V12.7331C13.4085 12.9098 13.3679 13.084 13.2905 13.2428C13.2131 13.4017 13.101 13.541 12.9624 13.6505L11.5745 14.7679C11.2209 15.0478 10.937 15.406 10.7452 15.8141C10.5534 16.2223 10.4588 16.6694 10.4689 17.1202C10.4631 17.2025 10.4631 17.285 10.4689 17.3672C11.3157 21.3074 11.4686 25.3534 10.8335 25.9885C10.2131 26.182 9.54851 26.182 8.92812 25.9885C8.24595 25.3181 8.39885 21.2838 9.24569 17.3319C9.2515 17.2497 9.2515 17.1672 9.24569 17.0849C9.2558 16.6341 9.16122 16.187 8.96939 15.7788C8.77755 15.3707 8.49369 15.0126 8.14009 14.7326L6.79927 13.6976C6.65429 13.5832 6.53827 13.4363 6.46063 13.2687C6.38298 13.1012 6.34588 12.9177 6.35233 12.7331V5.67616C6.35233 5.36423 6.22841 5.06506 6.00784 4.84449C5.78726 4.62392 5.4881 4.5 5.17616 4.5C4.86423 4.5 4.56506 4.62392 4.34449 4.84449C4.12392 5.06506 4 5.36423 4 5.67616V12.7331C4.00104 13.2622 4.12102 13.7842 4.35108 14.2606C4.58114 14.737 4.91538 15.1556 5.32906 15.4854L6.71694 16.6498Z"
                      fill="#D0D5DD"
                    />
                    <path
                      d="M8.70467 5.67616V11.557C8.70467 11.8689 8.82859 12.1681 9.04916 12.3887C9.26974 12.6092 9.5689 12.7331 9.88083 12.7331C10.1928 12.7331 10.4919 12.6092 10.7125 12.3887C10.9331 12.1681 11.057 11.8689 11.057 11.557V5.67616C11.057 5.36423 10.9331 5.06506 10.7125 4.84449C10.4919 4.62392 10.1928 4.5 9.88083 4.5C9.5689 4.5 9.26974 4.62392 9.04916 4.84449C8.82859 5.06506 8.70467 5.36423 8.70467 5.67616Z"
                      fill="#D0D5DD"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M16.9377 12.7331C16.9377 9.13408 19.5018 4.5 22.2305 4.5C24.9592 4.5 27.5232 9.13408 27.5232 12.7331C27.5996 13.672 27.4394 14.615 27.0572 15.4759C26.675 16.3368 26.0831 17.0882 25.3355 17.6613C26.2882 22.9775 26.1353 26.3766 24.8298 27.6822C24.0903 28.2587 23.1666 28.5471 22.2305 28.4937C21.2943 28.5471 20.3706 28.2587 19.6311 27.6822C18.3256 26.3766 18.1727 23.0128 19.1489 17.673C18.3945 17.1022 17.7963 16.3502 17.4098 15.4867C17.0232 14.6232 16.8609 13.6761 16.9377 12.7331ZM23.1607 16.7767C23.3338 16.3596 23.6233 16.0011 23.9947 15.7441C24.4112 15.3681 24.7344 14.9003 24.9385 14.3776C25.1427 13.8549 25.2222 13.2919 25.1709 12.7331C25.1709 9.7104 23.0302 6.85233 22.2305 6.85233C21.4307 6.85233 19.29 9.7104 19.29 12.7331C19.25 13.2899 19.3397 13.8484 19.5519 14.3648C19.7642 14.8811 20.0932 15.3411 20.5133 15.7088C20.8846 15.9658 21.1741 16.3243 21.3473 16.7415C21.5204 17.1586 21.5697 17.6167 21.4895 18.0612C20.5721 23.0363 20.9014 25.5533 21.3248 25.9767C21.9452 26.1703 22.6098 26.1703 23.2302 25.9767C23.6066 25.5886 23.9359 23.0716 23.0185 18.0964C22.9382 17.652 22.9876 17.1939 23.1607 16.7767Z"
                      fill="#D0D5DD"
                    />
                  </svg>
                )}
              </div>
              <div style={{ display: "inline-block" }}>
                <p className="font-bold text-[16px]">
                  {item.restaurant_name!.length > 12
                    ? `${item.restaurant_name!.slice(0, 10) + `...`}`
                    : item.restaurant_name}
                </p>
                <span className="text-sm text-gray-400">
                  {item.restaurant_address!.length > 15
                    ? `${item.restaurant_address!.slice(0, 15) + `...`}`
                    : item.restaurant_address!}
                </span>
                <p className="text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="inline-block mr-0.5 "
                  >
                    <path
                      d="M11.125 1.75C9.86938 1.75 8.755 2.24563 8 3.0975C7.245 2.24563 6.13062 1.75 4.875 1.75C3.78139 1.75132 2.73295 2.18635 1.95965 2.95965C1.18635 3.73295 0.751323 4.78139 0.75 5.875C0.75 10.3962 7.36312 14.0088 7.64437 14.1606C7.75367 14.2195 7.87586 14.2503 8 14.2503C8.12414 14.2503 8.24633 14.2195 8.35563 14.1606C8.63688 14.0088 15.25 10.3962 15.25 5.875C15.2487 4.78139 14.8137 3.73295 14.0404 2.95965C13.2671 2.18635 12.2186 1.75132 11.125 1.75ZM10.7819 10.6475C9.91142 11.3861 8.98091 12.0509 8 12.635C7.01909 12.0509 6.08858 11.3861 5.21812 10.6475C3.86375 9.48563 2.25 7.71375 2.25 5.875C2.25 5.17881 2.52656 4.51113 3.01884 4.01884C3.51113 3.52656 4.17881 3.25 4.875 3.25C5.9875 3.25 6.91875 3.8375 7.30562 4.78375C7.36193 4.92169 7.45805 5.03974 7.58172 5.12283C7.70539 5.20592 7.85101 5.2503 8 5.2503C8.14899 5.2503 8.29461 5.20592 8.41828 5.12283C8.54195 5.03974 8.63807 4.92169 8.69438 4.78375C9.08125 3.8375 10.0125 3.25 11.125 3.25C11.8212 3.25 12.4889 3.52656 12.9812 4.01884C13.4734 4.51113 13.75 5.17881 13.75 5.875C13.75 7.71375 12.1362 9.48563 10.7819 10.6475Z"
                      fill="#98A2B3"
                    />
                  </svg>
                  {/* <span style={{ color: "#98A2B3" }}>
                      {item.bookmarkCount}
                    </span> */}
                </p>
                <p className="mt-[6px]">
                  <span className="pt-[4px] pr-2 pl-[6px] pb-2 border border-gray-300 rounded-full  cursor-pointer ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="inline-block"
                      onClick={() => shareHandler(item?.restaurant_map!)}
                    >
                      <path
                        d="M12 14.6666C11.4444 14.6666 10.9722 14.4722 10.5833 14.0833C10.1944 13.6944 10 13.2222 10 12.6666C10 12.5889 10.0056 12.5082 10.0167 12.4246C10.0278 12.3411 10.0444 12.2662 10.0667 12.2L5.36667 9.46665C5.17778 9.63331 4.96667 9.76398 4.73333 9.85865C4.5 9.95331 4.25556 10.0004 4 9.99998C3.44444 9.99998 2.97222 9.80554 2.58333 9.41665C2.19444 9.02776 2 8.55554 2 7.99998C2 7.44442 2.19444 6.9722 2.58333 6.58331C2.97222 6.19442 3.44444 5.99998 4 5.99998C4.25556 5.99998 4.5 6.04731 4.73333 6.14198C4.96667 6.23665 5.17778 6.36709 5.36667 6.53331L10.0667 3.79998C10.0444 3.73331 10.0278 3.65842 10.0167 3.57531C10.0056 3.4922 10 3.41154 10 3.33331C10 2.77776 10.1944 2.30554 10.5833 1.91665C10.9722 1.52776 11.4444 1.33331 12 1.33331C12.5556 1.33331 13.0278 1.52776 13.4167 1.91665C13.8056 2.30554 14 2.77776 14 3.33331C14 3.88887 13.8056 4.36109 13.4167 4.74998C13.0278 5.13887 12.5556 5.33331 12 5.33331C11.7444 5.33331 11.5 5.2862 11.2667 5.19198C11.0333 5.09776 10.8222 4.96709 10.6333 4.79998L5.93333 7.53331C5.95556 7.59998 5.97222 7.67509 5.98333 7.75865C5.99444 7.8422 6 7.92265 6 7.99998C6 8.07776 5.99444 8.15842 5.98333 8.24198C5.97222 8.32554 5.95556 8.40042 5.93333 8.46665L10.6333 11.2C10.8222 11.0333 11.0333 10.9029 11.2667 10.8086C11.5 10.7144 11.7444 10.6671 12 10.6666C12.5556 10.6666 13.0278 10.8611 13.4167 11.25C13.8056 11.6389 14 12.1111 14 12.6666C14 13.2222 13.8056 13.6944 13.4167 14.0833C13.0278 14.4722 12.5556 14.6666 12 14.6666ZM12 3.99998C12.1889 3.99998 12.3473 3.93598 12.4753 3.80798C12.6033 3.67998 12.6671 3.52176 12.6667 3.33331C12.6667 3.14442 12.6027 2.98598 12.4747 2.85798C12.3467 2.72998 12.1884 2.6662 12 2.66665C11.8111 2.66665 11.6527 2.73065 11.5247 2.85865C11.3967 2.98665 11.3329 3.14487 11.3333 3.33331C11.3333 3.5222 11.3973 3.68065 11.5253 3.80865C11.6533 3.93665 11.8116 4.00042 12 3.99998ZM4 8.66665C4.18889 8.66665 4.34733 8.60265 4.47533 8.47465C4.60333 8.34665 4.66711 8.18842 4.66667 7.99998C4.66667 7.81109 4.60267 7.65265 4.47467 7.52465C4.34667 7.39665 4.18844 7.33287 4 7.33331C3.81111 7.33331 3.65267 7.39731 3.52467 7.52531C3.39667 7.65331 3.33289 7.81154 3.33333 7.99998C3.33333 8.18887 3.39733 8.34731 3.52533 8.47531C3.65333 8.60331 3.81156 8.66709 4 8.66665ZM12 13.3333C12.1889 13.3333 12.3473 13.2693 12.4753 13.1413C12.6033 13.0133 12.6671 12.8551 12.6667 12.6666C12.6667 12.4778 12.6027 12.3193 12.4747 12.1913C12.3467 12.0633 12.1884 11.9995 12 12C11.8111 12 11.6527 12.064 11.5247 12.192C11.3967 12.32 11.3329 12.4782 11.3333 12.6666C11.3333 12.8555 11.3973 13.014 11.5253 13.142C11.6533 13.27 11.8116 13.3338 12 13.3333Z"
                        fill="#98A2B3"
                      />
                    </svg>
                  </span>
                  <span
                    className="bg-gray-50 ml-2 text-[14px] text-gray-500 rounded-2xl cursor-pointer"
                    style={{ padding: "8px 10px" }}
                    onClick={() => window.open(`${item?.restaurant_map}`)}
                  >
                    상세보기
                  </span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        {loadMoreBtn ? (
          <button
            className="py-4 px-5 justify-center items-center gap-[10px] rounded-2xl bg-gray-50"
            onClick={handleLoadMore}
          >
            {loadMoreBtn}
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default FavoriteRestaurantsComp;