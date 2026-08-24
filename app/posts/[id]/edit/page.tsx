"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { getPost, updatePost } from "../../../lib/api";
import type { Post } from "@/types/post";

type EditPostProps = {
  params: Promise<{
    id: string;
  }>;
};

export default function EditPost({ params }: EditPostProps) {
  const [postId, setPostId] = useState<number | null>(null);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [userId, setUserId] = useState("1");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    async function loadPost() {
      try {
        setLoading(true);
        setError("");

        const { id } = await params;
        const idNumber = Number(id);

        if (Number.isNaN(idNumber)) {
          setError("Invalid post ID");
          return;
        }

        setPostId(idNumber);

        const data: Post = await getPost(idNumber);

        setTitle(data.title);
        setBody(data.body);
        setUserId(String(data.userId));
      } catch {
        setError("Failed to load post");
      } finally {
        setLoading(false);
      }
    }

    loadPost();
  }, [params]);

 async function handleSubmit(
  event: FormEvent<HTMLFormElement>
) {
  event.preventDefault();

  setError("");
  setSuccess("");

  if (!title.trim()) {
    setError("Title is required!");
    return;
  }

  if (postId === null || Number.isNaN(postId)) {
    setError("Invalid post ID. Please enter a valid ID number.");
    return;
  }

  const userIdNumber = Number(userId);

  if (
    !userId.trim() ||
    Number.isNaN(userIdNumber) ||
    userIdNumber < 1
  ) {
    setError("Invalid User ID. Please enter a valid ID number.");
    return;
  }

  try {
    setSaving(true);

    const updatedPost = await updatePost(postId, {
      title: title.trim(),
      body,
      userId: userIdNumber,
    });

    setTitle(updatedPost.title);
    setBody(updatedPost.body);
    setUserId(String(updatedPost.userId));

    setSuccess("Post updated successfully!");
  } catch (error) {
    if (error instanceof Error) {
      setError(error.message);
    } else {
      setError("Failed to update post. Please try again.");
    }
  } finally {
    setSaving(false);
  }
}

  if (loading) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-10">
        <p className="text-gray-600">
          Loading post...
        </p>
      </main>
    );
  }

  if (error && postId === null) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-10">
        <p className="mb-6 text-red-600">
          {error}
        </p>

        <Link
          href="/"
          className="text-blue-600 hover:text-blue-800"
        >
          ← Back to posts
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <Link
        href={postId ? `/posts/${postId}` : "/"}
        className="mb-8 inline-block text-blue-600 hover:text-blue-800"
      >
        ← Cancel
      </Link>

      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="mb-8 text-3xl font-bold text-slate-950">
          Edit Post
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div>
            <label
              htmlFor="title"
              className="mb-2 block font-medium"
            >
              Title
            </label>

            <input
              id="title"
              type="text"
              value={title}
              onChange={(event) =>
                setTitle(event.target.value)
              }
              className="w-full rounded-lg border border-slate-300 px-4 py-3"
            />
          </div>

          <div>
            <label
              htmlFor="body"
              className="mb-2 block font-medium"
            >
              Body
            </label>

            <textarea
              id="body"
              value={body}
              onChange={(event) =>
                setBody(event.target.value)
              }
              rows={8}
              className="w-full rounded-lg border border-slate-300 px-4 py-3"
            />
          </div>

          <div>
            <label
              htmlFor="userId"
              className="mb-2 block font-medium"
            >
              User ID
            </label>

            <input
              id="userId"
              type="number"
              min={1}
              value={userId}
              onChange={(event) =>
                setUserId(event.target.value)
              }
              className="w-full rounded-lg border border-slate-300 px-4 py-3"
            />
          </div>

          {error && (
            <p className="rounded-lg bg-red-50 p-3 text-red-600">
              {error}
            </p>
          )}

          {success && (
            <p className="rounded-lg bg-green-50 p-3 text-green-600">
              {success}
            </p>
          )}

          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </main>
  );
}