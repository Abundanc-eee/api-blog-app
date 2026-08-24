"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { createPost } from "../../lib/api";

export default function NewPost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [userId, setUserId] = useState("1");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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

    try {
      setLoading(true);

      const newPost = await createPost({
        title: title.trim(),
        body,
        userId: Number(userId),
      });

      setSuccess(
        `Post created successfully! Post ID: ${newPost.id}`
      );

      setTitle("");
      setBody("");
      setUserId("1");
    } catch {
      setError(
        "Failed to create post. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <Link
        href="/"
        className="mb-8 inline-block text-blue-600 hover:text-blue-800"
      >
        ← Back to posts
      </Link>

      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="mb-8 text-3xl font-bold text-slate-950">
          Create a New Post
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div>
            <label
              htmlFor="title"
              className="mb-2 block font-medium text-slate-700"
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
              placeholder="Enter post title"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div>
            <label
              htmlFor="body"
              className="mb-2 block font-medium text-slate-700"
            >
              Body
            </label>

            <textarea
              id="body"
              value={body}
              onChange={(event) =>
                setBody(event.target.value)
              }
              placeholder="Write your post here..."
              rows={8}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div>
            <label
              htmlFor="userId"
              className="mb-2 block font-medium text-slate-700"
            >
              User ID
            </label>

            <input
              id="userId"
              type="number"
              value={userId}
              onChange={(event) =>
                setUserId(event.target.value)
              }
              min={1}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
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
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Creating Post..."
              : "Create Post"}
          </button>
        </form>
      </div>
    </main>
  );
}