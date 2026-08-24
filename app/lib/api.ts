import type { Post } from "@/types/post";
import type { Comment } from "@/types/comment"
const API_BASE_URL = "https://jsonplaceholder.typicode.com";

export async function getPosts(): Promise <Post[]> {
    const response = await fetch(`${API_BASE_URL}/posts`)
    if(!response.ok) {
        throw new Error("Failed to fetch posts");
    }
    return response.json();
}

export async function getPost(id: number): Promise <Post> {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`)
    if(!response.ok) {
        throw new Error("Failed to fetch post");
    }
    return response.json();
}

export async function getComments(postId: number): Promise <Comment[]> {
    const response = await fetch (`${API_BASE_URL}/posts/${postId}/comments`)
    if(!response.ok) {
        throw new Error("Failed to fetch comments");
    }
    return response.json();
}

// Posting
export type NewPost = {
    title: string;
    body: string;
    userId: number;
}

export async function createPost (
    post: NewPost
): Promise<Post> {
    const response = await fetch (`${API_BASE_URL}/posts`, {
        method: "POST",
        headers: {"Content-Type": "application/json",
    },
    body: JSON.stringify(post),
});
if (!response.ok){
    throw new Error("Failed to create post")
}
return response.json()
}

export async function updatePost (
    id: number,
    post: NewPost
): Promise<Post> {
    const response = await fetch (`${API_BASE_URL}/posts/${id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json",
    },
    body: JSON.stringify(post),
});
if (!response.ok){
    throw new Error("Failed to update post")
}
return response.json()
}

export async function deletePost(id: number): Promise<void> {
    const response = await fetch(
        `${API_BASE_URL}/posts/${id}`,
        {
            method: "DELETE",
        }
    );

    if (!response.ok) {
        throw new Error("Failed to delete post");
    }
}