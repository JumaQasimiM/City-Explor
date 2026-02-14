import { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { useCommentByPlaceId, useComments } from "../hooks/useComments";
import { ApiUrl } from "../api/ApiUrl";
import { FaComments } from "react-icons/fa6";
import { HiDotsVertical } from "react-icons/hi";

export const PlaceComments = ({ place_id }) => {
  const [newComment, setNewComment] = useState("");
  const [visibleCount, setVisibleCount] = useState(3);
  const [usersMap, setUsersMap] = useState({});
  const [deleteId, setDeleteId] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);

  const menuRef = useRef(null);

  const { data: placeComments = [], refetch } = useCommentByPlaceId(place_id);

  const { createPlaceComment, deletePlaceComment } = useComments();
  const { user } = useAuth();

  /* ---------------- Add Comment ---------------- */
  const handleAddComment = async () => {
    if (!newComment.trim() || !user) return;

    const payload = {
      user_id: user.id,
      place_id,
      body: newComment,
      created_at: new Date().toISOString(),
    };

    await createPlaceComment(payload);
    await refetch();
    setNewComment("");
  };

  /* ---------------- Delete Comment ---------------- */
  const handleDelete = async () => {
    await deletePlaceComment(deleteId);
    await refetch();
    setDeleteId(null);
  };

  /* ---------------- Close Dropdown ---------------- */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ---------------- Fetch Users ---------------- */
  useEffect(() => {
    const fetchUsers = async () => {
      const uniqueUserIds = [...new Set(placeComments.map((c) => c.user_id))];

      const results = await Promise.all(
        uniqueUserIds.map(async (id) => {
          const res = await fetch(`${ApiUrl}/users?id=${id}`);
          const data = await res.json();
          return [id, data[0] || { firstname: "Unknown" }];
        }),
      );

      setUsersMap((prev) => ({
        ...prev,
        ...Object.fromEntries(results),
      }));
    };

    if (placeComments.length) fetchUsers();
  }, [placeComments]);

  const sortedComments = [...placeComments].sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at),
  );

  const formatDate = (dateString) => new Date(dateString).toLocaleDateString();

  const toggleComments = () => {
    setVisibleCount(
      visibleCount < sortedComments.length ? sortedComments.length : 3,
    );
  };

  return (
    <section className="md:max-w-3xl md:mx-auto my-8 sm:my-12 px-3 sm:px-6">
      {/* Title */}
      <h2 className="text-xl md:text-xl font-bold mb-6 text-gray-500">
        Share Your Experience
      </h2>

      {/* Add Comment */}
      <div className="bg-white dark:bg-slate-800 shadow-lg rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Write your comment..."
            value={newComment}
            disabled={!user}
            onChange={(e) => setNewComment(e.target.value)}
            className="flex-1 border rounded-lg px-4 py-2
                       text-sm sm:text-base
                       focus:ring-2 focus:ring-indigo-500
                       dark:bg-slate-700 dark:text-white"
          />

          {user && (
            <button
              onClick={handleAddComment}
              className="bg-indigo-600 hover:bg-indigo-700
                         text-white px-4 py-2
                         text-sm sm:text-base
                         rounded-lg transition w-full sm:w-auto"
            >
              Comment
            </button>
          )}
        </div>
      </div>

      {/* No Comments */}
      {sortedComments.length === 0 ? (
        <div className="text-center bg-white dark:bg-slate-800 border border-dashed rounded-xl p-8 sm:p-10">
          <FaComments className="mx-auto text-3xl sm:text-4xl text-indigo-500 mb-4" />
          <p className="text-sm sm:text-base">
            {" "}
            No comments yet. Be the first!
          </p>
        </div>
      ) : (
        <div className="space-y-4 sm:space-y-5">
          {sortedComments.slice(0, visibleCount).map((comment) => (
            <div
              key={comment.id}
              className="bg-white dark:bg-slate-800
                         shadow-md hover:shadow-xl
                         transition rounded-xl
                         p-4 sm:p-5
                         flex gap-3 sm:gap-4 relative"
            >
              {/* Avatar */}
              <div
                className="w-9 h-9 sm:w-11 sm:h-11 rounded-full
                           bg-indigo-500
                           flex items-center justify-center
                           text-white font-bold text-sm sm:text-base
                           flex-shrink-0"
              >
                {usersMap[comment.user_id]?.firstname?.charAt(0) || "U"}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm sm:text-base truncate">
                  {usersMap[comment.user_id]?.firstname || "Unknown"}
                </p>

                <p
                  className="mt-2 text-gray-600 dark:text-gray-300
                              text-sm sm:text-base break-words"
                >
                  {comment.body}
                </p>

                <span className="text-xs text-gray-400 mt-3 block">
                  {formatDate(comment.created_at)}
                </span>
              </div>

              {/* Options */}
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
                      className="absolute right-0 top-10 w-28
                                 bg-white dark:bg-slate-800
                                 shadow-lg rounded-lg border
                                 border-gray-200 dark:border-slate-700
                                 py-2 z-50"
                    >
                      <button
                        onClick={() => {
                          setDeleteId(comment.id);
                          setActiveMenu(null);
                        }}
                        className="w-full text-left px-4 py-2 text-sm
                                   hover:bg-red-50 hover:text-red-600
                                   dark:hover:bg-red-900/30"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          {/* Load More */}
          {sortedComments.length > 3 && (
            <div className="text-center">
              <button
                onClick={toggleComments}
                className="bg-indigo-600 hover:bg-indigo-700
                           text-white px-5 py-2
                           text-sm sm:text-base
                           rounded-full transition"
              >
                {visibleCount < sortedComments.length
                  ? "Load more comments"
                  : "Show less"}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Confirm Delete Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div
            className="bg-white dark:bg-slate-800
                       rounded-xl p-5 sm:p-6
                       w-full max-w-sm shadow-xl"
          >
            <h3 className="text-base sm:text-lg font-semibold mb-4">
              Delete Comment?
            </h3>

            <p className="text-sm text-gray-500 mb-6">
              Are you sure you want to delete this comment?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 rounded-lg bg-gray-200 text-sm"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-lg bg-red-600
                           text-white hover:bg-red-700 text-sm"
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
