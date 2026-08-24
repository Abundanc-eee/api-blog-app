import type { Comment } from "@/types/comment";

type CommentItemProps = {
    comment: Comment;
};

export default function CommentItem({ comment }: CommentItemProps) {
    return (
        <article className="rounded-xl border border-slate-200 bg-white p-5">
            <h3 className="font-semibold text-slate-900">
                {comment.name}
            </h3>

            <p className="mt-2 text-sm text-slate-700">
                {comment.body}
            </p>

            <p className="text-xs text-slate-500">
                {comment.email}
            </p>
        </article>
    );
}