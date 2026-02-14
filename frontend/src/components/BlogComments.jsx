// BlogComments.jsx
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useCommentByBlogId, useComments } from "../hooks/useComments";
import { FaComments } from "react-icons/fa6";
import { HiDotsVertical } from "react-icons/hi";

export const BlogComments = ({ blog_id }) => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [deleteModal, setDeleteModal] = useState(null);

  const menuRef = useRef();

  const { data: blogComments = [], refetch } = useCommentByBlogId(blog_id);

  const { createBlogComment, deleteBlogComment } = useComments();
  const { user } = useAuth();

  // ---------------------------
  // Close dropdown on outside click
  // ---------------------------
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ---------------------------
  // Add Comment
  // ---------------------------
  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    const payload = {
      user_id: user.id,
      blog_id,
      body: newComment,
      created_at: new Date().toISOString(),
    };

    await createBlogComment(payload);
    await refetch();
    setNewComment("");
  };

  // ---------------------------
  // Delete Comment
  // ---------------------------
  const handleDelete = async () => {
    await deleteBlogComment(deleteModal);
    await refetch();
    setDeleteModal(null);
  };

  // ---------------------------
  // Sort Comments (Newest First)
  // ---------------------------
  const sortedComments = [...blogComments].sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at),
  );

  // ---------------------------
  // Date Formatter
  // ---------------------------
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <section className="md:max-w-2xl md:mx-auto my-10 px-4">
      {/* Title */}
      <h2 className="text-xl text-gray-500 md:text-2xl font-bold mb-6 ">
        Share Your Experience
      </h2>

      {/* Add Comment */}
      <div className="bg-white dark:bg-slate-800 shadow rounded-xl p-4 mb-8">
        <div className="flex flex-col md:flex-row  gap-3">
          <input
            type="text"
            placeholder="Write your comment..."
            value={newComment}
            disabled={!user}
            onChange={(e) => setNewComment(e.target.value)}
            className="flex-1 border border-gray-300 dark:border-slate-600
                       rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500
                       dark:bg-slate-700 dark:text-white"
          />
          {user && (
            <button
              onClick={handleAddComment}
              className="bg-indigo-600 hover:bg-indigo-700
                         text-white px-4 py-2 rounded-lg transition"
            >
              Comment
            </button>
          )}
        </div>
      </div>

      {/* No Comments */}
      {sortedComments.length === 0 ? (
        <div
          className="text-center bg-white dark:bg-slate-800
                        rounded-xl p-8 shadow"
        >
          <FaComments className="mx-auto text-4xl text-indigo-500 mb-4" />
          <p className="text-gray-500 dark:text-gray-400">
            No comments yet. Be the first!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedComments.map((comment) => (
            <div
              key={comment.id}
              className="bg-white dark:bg-slate-800 shadow
                         rounded-xl p-4 flex gap-4 relative"
            >
              {/* Avatar */}
              <div
                className="w-10 h-10 rounded-full bg-indigo-600
                              flex items-center justify-center
                              text-white font-bold"
              >
                {comment.user_id.charAt(0).toUpperCase()}
              </div>

              {/* Content */}
              <div className="flex-1">
                <p className="font-semibold text-gray-800 dark:text-white">
                  {comment.user_id}
                </p>
                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  {comment.body}
                </p>
                <span className="text-xs text-gray-400 mt-2 block">
                  {formatDate(comment.created_at)}
                </span>
              </div>

              {/* Options (Only Owner) */}
              {user?.id === comment.user_id && (
                <div className="relative" ref={menuRef}>
                  <HiDotsVertical
                    size={30}
                    onClick={() =>
                      setActiveMenu(
                        activeMenu === comment.id ? null : comment.id,
                      )
                    }
                    className="cursor-pointer p-2 rounded-full
                               text-gray-400 hover:bg-gray-100
                               dark:hover:bg-slate-700 transition"
                  />

                  {activeMenu === comment.id && (
                    <div
                      className="absolute right-0 top-10 w-32
                                    bg-white dark:bg-slate-800
                                    shadow-xl rounded-lg border
                                    border-gray-200 dark:border-slate-700
                                    py-2 z-50"
                    >
                      <button
                        onClick={() => {
                          setDeleteModal(comment.id);
                          setActiveMenu(null);
                        }}
                        className="w-full text-left px-4 py-2 text-sm
                                   hover:bg-red-50 hover:text-red-600 cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Confirm Delete Modal */}
      {deleteModal && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center
                        justify-center z-50"
        >
          <div
            className="bg-white dark:bg-slate-800
                          rounded-xl p-6 w-80 shadow-xl"
          >
            <h3 className="text-lg font-semibold mb-4">Delete Comment?</h3>
            <p className="text-sm text-gray-500 mb-6">
              Are you sure you want to delete this comment?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteModal(null)}
                className="px-4 py-2 rounded-lg bg-gray-200
                           hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-lg bg-red-600
                           text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
