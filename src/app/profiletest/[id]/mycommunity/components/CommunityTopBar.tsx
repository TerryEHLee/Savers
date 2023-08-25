"use client"
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

const CommunityTopBar = () => {
	// const params = useParams();
  // const router = useRouter()
	// console.log({params})
	// const searchId = params.id;
  // console.log("searchId=>",searchId)

	const params = useParams().id as string
	const decodedParams = decodeURIComponent(params)
	console.log("decodedParams--->",decodedParams)
  const router = useRouter()
	console.log("router--->",router)
	// searchId값을 그냥 params로 할당하느냐 decodedParams로 할당하느냐에 따라 결과가 달라짐. 아, eq 컬럼은 바꿔줘야 함.
	// const searchId = params as string
	const searchId = decodedParams as string
	return (
		<>
		<button className="bg-blue-500"
		onClick={() => router.push(`/profiletest/${searchId}/mycommunity/myposts`)}
	>
		내가 쓴 글
	</button>
	<button className="bg-blue-500"
		onClick={() => router.push(`/profiletest/${searchId}/mycommunity/mycomments`)}
	>
		내가 쓴 댓글
	</button>
	</>
	)
}
export default CommunityTopBar