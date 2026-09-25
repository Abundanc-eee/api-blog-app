"use client";

import { useEffect, useState } from "react";
import { Post } from "@/types/post";
import { getPosts } from "@/app/lib/api";
import PostList from "@/app/components/PostList";

export default function PostsPage() {
const [posts, setPosts] = useState<Post[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

useEffect(() => {
async function loadPosts() {
    try {
        const data = await getPosts();
    setPosts(data);
    } catch {
    setError("Failed to load posts");
    } finally {
    setLoading(false);
    }
}

    loadPosts();

    }, []);

    if (loading) {
        return ( <div className="flex h-screen items-center justify-center"> <p className="text-gray-600">Loading posts...</p> </div>
     );
    }

    if (error) {
        return ( <div className="flex h-screen items-center justify-center"> <p className="text-red-600">{error}</p> </div>
        );
    }

return ( <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6"> 
    <h1 className="mb-8 text-4xl font-bold text-slate-950">
        All Posts 
    </h1>

  {posts.length === 0 ? (
    <p className="text-gray-600">No posts found</p>
  ) : (
    <PostList posts={posts} />
  )}
</main>
);
}
