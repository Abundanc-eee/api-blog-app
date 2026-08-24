"use client";

import { getPost, getComments, deletePost } from "../../lib/api";
import type { Post } from "@/types/post";
import type { Comment } from "@/types/comment";
import { useState, useEffect } from "react";
import Link from "next/link";
import CommentList from "@/app/components/CommentList";

type PostPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default function PostPage({ params }: PostPageProps) {
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);

  const [loading, setLoading] = useState(true);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const [error, setError] = useState("");
  const [commentsError, setCommentsError] = useState("");



  useEffect(() => {
    async function loadPostAndComments() {
      try {
        setLoading(true);
        setError("");

        const { id } = await params;
        const postId = Number(id);

        if (Number.isNaN(postId)) {
          setError("Post not found");
          return;
        }

        const data = await getPost(postId);

        setPost(data);

        try {
          setCommentsLoading(true);
          setCommentsError("");

          const commentsData = await getComments(postId);
          setComments(commentsData);
        } catch {
          setCommentsError("Failed to load comments");
        } finally {
          setCommentsLoading(false);
        }
      } catch {
        setError("Failed to load post");
      } finally {
        setLoading(false);
      }
    }

    loadPostAndComments();
  }, [params]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center py-10">
        <p className="text-gray-600">Loading post...</p>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
        <h1 className="mb-3 text-3xl font-bold text-slate-900">
          Post not found
        </h1>

        <p className="mb-6 text-gray-600">
          Sorry, the post you are looking for does not exist.
        </p>

        <Link
          href="/"
          className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          ← Back to posts
        </Link>
      </div>
    );
  }

  async function handleDelete() {
    try {
        setDeleting(true);
        setError("");

        const { id } = await params;
        const postId = Number(id);

        await deletePost(postId);

        window.location.href = "/";
    } catch {
        setError("Failed to delete post");
        setDeleting(false);
    }
}

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <Link
        href="/"
        className="mb-8 inline-block text-blue-600 hover:text-blue-800"
      >
        ← Back to posts
      </Link>

      {/* Post */}
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <h1 className="mb-6 text-4xl font-bold capitalize text-slate-950">
            {post.title}
            </h1>

            <p className="mb-6 text-lg leading-8 text-slate-700">
            {post.body}
            </p>

            <p className="text-sm text-slate-500">
            Posted by user {post.userId}
            </p>

            <Link href={`/posts/${post.id}/edit`}
            className="rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700 mx-4">
                Edit Post
            </Link>

            {showDelete && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-lg">
                <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
                    <h2 className="mb-3 text-2xl font-bold text-slate-900">
                        Delete Post?
                    </h2>

                    <p className="mb-6 text-slate-600">
                        Are you sure you want to delete this post? This action cannot be undone.
                    </p>

                    <div className="flex justify-end gap-3">
                        <button
                        onClick={() => setShowDelete(false)}
                        disabled={deleting}
                        className="rounded-lg border border-slate-300 px-5 py-2.5 text-slate-700 hover:bg-slate-100"
                        >
                        Cancel
                        </button>

                        <button
                        onClick={handleDelete}
                        disabled={deleting}
                        className="rounded-lg bg-red-600 px-5 py-2.5 text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                        {deleting ? "Deleting..." : "Delete"}
                        </button>
                    </div>
                </div>
            </div>
         )}

         <button
         onClick={() => setShowDelete(true)}
         disabled={deleting}
         className="rounded-lg bg-red-600 px-5 py-3 text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50">
            Delete Post
         </button>

      </div>

        {error && (
            <p className="mt-4 rounded-lg bg-red-50 p-3 text-red-600">
                {error}
            </p>
        )}  

      {/* Comments */}
      <div className="mt-12">
        <h2 className="mb-6 text-2xl font-bold">
          Comments
        </h2>

        {commentsLoading && (
          <p className="text-gray-600">
            Loading Comments...
          </p>
        )}

        {commentsError && (
          <p className="text-red-700">
            {commentsError}
          </p>
        )}

        {!commentsLoading &&
          !commentsError &&
          comments.length === 0 && (
            <p className="text-gray-600">
              No comments yet!
            </p>
          )}

        {!commentsLoading &&
          !commentsError &&
          comments.length > 0 && (
            <CommentList comments={comments} />
          )}
      </div>
    </main>
  );
}