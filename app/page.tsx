'use client';

import { Post } from '@/types/post';
import PostList from './components/PostList';
import { getPosts } from './lib/api';
import { useState, useEffect } from 'react';


export default function MyBlog() {

  const [posts, setPosts] = useState <Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [userId, setUserId] = useState("");

  async function loadPosts (){
    try {
      setLoading (true);
      setError ("");
      const data = await getPosts();
      setPosts(data);
    } catch {
      setError("Failed to load posts");
    } finally {
      setLoading(false);
    }
  }

  useEffect (() => {
    let isMounted = true;
    
    async function fetchPosts() {
      try {
        setLoading(true);
        setError("");
        const data = await getPosts();
        if (isMounted) {
          setPosts(data);
        }
      } catch {
        if (isMounted) {
          setError("Failed to load posts");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    
    fetchPosts();
    
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className='flex items-center justify-center py-10 h-screen'>
        <p className='text-gray-600'>Loading posts...</p>
      </div>
    );
  }

  if(error) {
    return(
      <div className='flex items-center justify-center py-10 h-screen'>
        <p className='text-red-600'>{error}</p>

        <button
          onClick={loadPosts}
          className=' rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2'
        >
          Try Again
        </button>
      </div>
    );
  }



  if (posts.length === 0){
    return(
      <div className='py-10 text-center'>
        <p className='text-gray-600'>
          No posts found
        </p>
      </div>
    );
  }

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title
    .toLowerCase()
    .includes(search.toLowerCase());

    const matchesUser = 
      userId === "" || post.userId === Number(userId);
    return matchesSearch && matchesUser
  })

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <section className="mb-10 rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
        <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">Welcome to My Blog</h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
          Discover short posts with clean styling and easy reading.
        </p>
      </section>

      <div className='mb-6'>
        <input
          type="text"
          placeholder = "Search post by title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />
      </div>

      <select
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        className="rounded-lg border border-slate-300 bg-white px-4 py-3 mb-6"
      >
        <option value="">All Users</option>
        <option value="1">User 1</option>
        <option value="2">User 2</option>
        <option value="3">User 3</option>
        <option value="4">User 4</option>
        <option value="5">User 5</option>
        <option value="6">User 6</option>
        <option value="7">User 7</option>
        <option value="8">User 8</option>
        <option value="9">User 9</option>
        <option value="10">User 10</option>
      </select>

      <PostList posts={filteredPosts} />
    </main>
  );
}
