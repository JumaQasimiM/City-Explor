// Comments.jsx
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useCommentByBlogId, useComments } from "../hooks/useComments";
import { FaComments } from "react-icons/fa6";

export const BlogComments = ({ blog_id }) => {
  const [newComment, setNewComment] = useState("");
  const { data: blogComments, refetch: blogCommentsRefetch } =
    useCommentByBlogId(blog_id);
  const { createBlogComment, error, loading } = useComments();
  const { user } = useAuth();

  // create new commnet
  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    const payload = {
      user_id: user.id,
      blog_id: blog_id,
      body: newComment,
      created_at: new Date().toISOString(),
    };

    await createBlogComment(payload);
    await blogCommentsRefetch();
    setNewComment("");
  };
  // sort comments
  const sortedComments = [...blogComments].sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  // date changer  helper function
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  return (
    <section className="max-w-2xl my-6 py-5 px-5">
      {/* Title */}
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
        Tell us your opinion{" "}
        <small className="text-gray-400 mx-5">
          (create account to comment)
        </small>
      </h2>

      {/* Comment input */}
      <div className="bg-white dark:bg-slate-800 shadow rounded-lg p-4 mb-6">
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Write your comment..."
            value={newComment}
            disabled={!user}
            onChange={(e) => setNewComment(e.target.value)}
            className="flex-1 border border-gray-300 dark:border-slate-600 rounded-lg px-4 py-2
              focus:outline-none focus:ring-2 focus:ring-indigo-500
              dark:bg-slate-700 dark:text-white"
          />
          {user && (
            <button
              onClick={handleAddComment}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg
                font-semibold transition"
            >
              Comment
            </button>
          )}
        </div>
      </div>

      {/* Comments list */}
      {sortedComments.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center text-center 
                  bg-white dark:bg-slate-800 border border-dashed 
                  border-gray-300 dark:border-slate-600 
                  rounded-xl p-8"
        >
          {/* Icon */}
          <div
            className="w-14 h-14 flex items-center justify-center 
                    rounded-full bg-indigo-100 dark:bg-indigo-900 
                    text-indigo-600 dark:text-indigo-300 mb-4"
          >
            <FaComments />
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            No comments yet
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-sm">
            Be the first to share your thoughts and start the conversation.
          </p>

          {/* CTA */}
          {user ? (
            <button
              onClick={() => document.querySelector("input")?.focus()}
              className="mt-5 bg-indigo-600 hover:bg-indigo-700 
                   text-white px-5 py-2 rounded-lg text-sm font-medium 
                   transition cursor-pointer"
            >
              Write first comment
            </button>
          ) : (
            <p className="mt-4 text-sm text-gray-400 ">
              Login to write the first comment
            </p>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {sortedComments.map((comment) => (
            <div
              key={comment.id}
              className="bg-white dark:bg-slate-800 shadow rounded-lg p-4 flex gap-3"
            >
              {/* Avatar */}
              <div
                className="w-10 h-10 rounded-full bg-indigo-500 
                        flex items-center justify-center 
                        text-white font-bold"
              >
                {comment.user_id.charAt(0).toUpperCase()}
              </div>

              {/* Comment content */}
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                  {comment.user_id}
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                  {comment.body}
                </p>
                <span className="text-xs text-gray-400 mt-2 inline-block">
                  {formatDate(comment.created_at)}
                </span>
              </div>
            </div>
          ))}

          {/* Load more */}
          <button
            className="text-sm bg-indigo-700 hover:bg-indigo-800 
                       text-white rounded py-1 px-3 transition"
          >
            Load more comments
          </button>
        </div>
      )}
    </section>
  );
};
