import type { CreatePostResponse, Post, PostPayload } from "@/types/fetchPostsTypes";
import { apiRequest } from "../../axiosConfig";

export const createPost = (postData: PostPayload): Promise<CreatePostResponse> => {
    return apiRequest<CreatePostResponse>("/posts", "POST", postData);
};

export const fetchPosts = (page: number = 1, limit: number = 10): Promise<Post[]> => {
    return apiRequest<Post[]>(`posts?_page=${page}&_limit=${limit}`, "GET");
};

export const getPostById = (id: number): Promise<Post> => {
    return apiRequest<Post>(`/posts/${id}`, "GET");
};

export const updatePost = (id: number, data: PostPayload): Promise<void> => {
    return apiRequest<void>(`/posts/${id}`, "PUT", data);
};

export const deletePost = (id: number): Promise<void> => {
    return apiRequest<void>(`/posts/${id}`, "DELETE");
};

export const fetchPostByUserId = (userId: number | string, page: number = 1, limit: number = 10): Promise<Post[]> => {
    return apiRequest<Post[]>(`posts?userId=${userId}&_page=${page}&_limit=${limit}`, "GET");
};
