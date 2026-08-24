import Link from "next/link";
import { Post } from "@/types/post";

type PostCardProps = {
    post: Post;
}

export default function PostCard({ post }: PostCardProps) {
    return (
        <article className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <h2 className="text-2xl font-semibold text-slate-900">{post.title}</h2>
            <p className="mt-3 text-base leading-7 text-slate-600">{post.body}</p>
            <Link
                href={`/posts/${post.id}`}
                className="mt-5 inline-flex items-center text-sm font-semibold text-blue-600 transition hover:text-blue-700"
            >
                Read more
            </Link>
        </article>
    );
}