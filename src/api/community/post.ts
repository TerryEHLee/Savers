import supabase from "@/libs/supabase";
import { Database } from "@/types/supabase";
import { ToTalDataType } from "@/types/types";

type PostType = Database["public"]["Tables"]["community"]["Row"];
type NewPostType = Database["public"]["Tables"]["community"]["Insert"];
type EditPostType = Database["public"]["Tables"]["community"]["Update"];

// 게시글 등록
export const createPost = async (newPost: NewPostType) => {
  const { error } = await supabase.from("community").insert(newPost);
  if (error) return error;
 };

// 게시글 수정
export const updatePost = async (editPost: EditPostType) => {
  const { data, error } = await supabase.from("community").update(editPost).eq("post_uid", editPost.post_uid);
  if (error) return error;
  return data;
 };

// 게시글 삭제
export const deletePost = async (post_uid: string | string[]): Promise<void> => {
  await supabase.from("community").delete().eq("post_uid", post_uid);
};
 
// 댓글 개수 조회
export const getCommentsNum = async (postUid: string) => {
  const { count: comments } = await supabase
    .from("community_comment")
    .select("*", { count: "exact" })
    .eq("post_uid", postUid);
  
  const { count: replies } = await supabase
    .from("community_reply")
    .select("*", { count: "exact" })
    .eq("post_uid", postUid)
  return (comments || 0) + (replies || 0);
};

// 게시글 조회
export const POSTS_NUMBER = 10;
export const getPosts = async (pathname: string, pageParam: number = 1): Promise<ToTalDataType> => {
  let data: any = [];
  let count = null;
    
    if (pathname === "/community/product") {
      const productPosts = await supabase
        .from("community")
        .select("*")
        .eq("category", "제품")
        .order("created_date", { ascending: false })
        .range(pageParam * 10 - 10, pageParam * 10 -1);
      
      data = productPosts.data;

      const { count: productCount } = await supabase.from("community").select("count", { count: "exact" }).eq("category", "제품");
      count = productCount;

    } else if (pathname === "/community/restaurant") {
      const restaurantPosts = await supabase
        .from("community")
        .select("*")
        .eq("category", "식당")
        .order("created_date", { ascending: false })
        .range(pageParam * 10 - 10, pageParam * 10 -1);
      
      data = restaurantPosts.data;

      const { count: restaurantCount } = await supabase.from("community").select("count", { count: "exact" }).eq("category", "식당");
      count = restaurantCount;
      
    } else if (pathname === "/community/recipe") {
      const recipePosts = await supabase
        .from("community")
        .select("*")
        .eq("category", "레시피")
        .order("created_date", { ascending: false })
        .range(pageParam * 10 - 10, pageParam * 10 -1);
      
      data = recipePosts.data;

      const { count: recipeCount } = await supabase.from("community").select("count", { count: "exact" }).eq("category", "레시피");
      count = recipeCount;
      
    } else if (pathname === "/community/ohjiwan") {
      const ohjiwanPosts = await supabase
        .from("community")
        .select("*")
        .eq("category", "오지완")
        .order("created_date", { ascending: false })
        .range(pageParam * 10 - 10, pageParam * 10 -1);
      
      data = ohjiwanPosts.data;

      const { count: ohjiwanCount } = await supabase.from("community").select("count", { count: "exact" }).eq("category", "오지완");
      count = ohjiwanCount;
      
    } else {
      // 전체 데이터
      const allPosts = await supabase
        .from("community")
        .select("*")
        .order("created_date", { ascending: false })
        .range(pageParam * 10 - 10, pageParam * 10 - 1);
      
      data = allPosts.data;

      const { count: allCount } = await supabase.from("community").select("count", { count: "exact" });
      count = allCount;
    }
  
    const total_pages = count ? Math.floor(count / 10) + (count % 10 === 0 ? 0 : 1) : 1;

    return { posts: data, page: pageParam, total_pages, total_results: count };
};

// 게시글 상세내용 조회
export const getPostDetail = async (post_uid: string): Promise<PostType> => {
  try {
    const { data: post } = await supabase
      .from("community")
      .select("*")
      .eq("post_uid", post_uid)
      .single();
    return post;
  } catch (error) {
    throw error;
  }
};

// 1. 제품 카테고리 게시글 조회
const getProductPosts = async (): Promise<PostType[]> => {
  try {
    const { data } = await supabase
      .from("community")
      .select("*")
      .eq("category", "제품")
      .order("created_date", { ascending: false });
    return data || [];
  } catch (error) {
    throw error;
  }
};

// 2. 식당 카테고리 게시글 조회
const getRestaurantPosts = async (): Promise<PostType[]> => {
  try {
    const { data } = await supabase
      .from("community")
      .select("*")
      .eq("category", "식당")
      .order("created_date", { ascending: false });
    return data || [];
  } catch (error) {
    throw error;
  }
};

// 3. 레시피 카테고리 게시글 조회
const getRecipePosts = async (): Promise<PostType[]> => {
  try {
    const { data } = await supabase
      .from("community")
      .select("*")
      .eq("category", "레시피")
      .order("created_date", { ascending: false });
    return data || [];
  } catch (error) {
    throw error;
  }
};

// 4. 오지완 카테고리 게시글 조회
const getOhjiwanPosts = async (): Promise<PostType[]> => {
  try {
    const { data } = await supabase
      .from("community")
      .select("*")
      .eq("category", "오지완")
      .order("created_date", { ascending: false });
    return data || [];
  } catch (error) {
    throw error;
  }
};