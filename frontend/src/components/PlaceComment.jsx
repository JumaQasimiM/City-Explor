import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useCommentByPlaceId, useComments } from "../hooks/useComments";
import { ApiUrl } from "../api/ApiUrl";
import { FaComments } from "react-icons/fa6";
export const PlaceComments = ({ place_id }) => {
  const [newComment, setNewComment] = useState("");
  const [visibleCount, setVisibleCount] = useState(3);
  const [usersMap, setUsersMap] = useState({});

  const { data: placeComments = [], refetch: placeCommentsRefetch } =
    useCommentByPlaceId(place_id);

  const { createPlaceComment } = useComments();
  const { user } = useAuth();

  /* -------------------- Add Comment -------------------- */
  const handleAddComment = async () => {
    if (!newComment.trim() || !user) return;

    const payload = {
      user_id: user.id,
      place_id,
      body: newComment,
      created_at: new Date().toISOString(),
    };

    await createPlaceComment(payload);
    await placeCommentsRefetch();
    setNewComment("");
  };

  /* -------------------- Fetch Users -------------------- */
  useEffect(() => {
    const fetchUsers = async () => {
      const uniqueUserIds = [...new Set(placeComments.map((c) => c.user_id))];

      const results = await Promise.all(
        uniqueUserIds.map(async (id) => {
          const res = await fetch(`${ApiUrl}/users?id=${id}`);
          const data = await res.json();
          return [id, data[0] || { firstname: "Unknown" }];
        })
      );

      setUsersMap(Object.fromEntries(results));
    };

    if (placeComments.length) fetchUsers();
  }, [placeComments]);

  /* -------------------- Sort Comments -------------------- */
  const sortedComments = [...placeComments].sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  /* -------------------- Helpers -------------------- */
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${String(date.getDate()).padStart(2, "0")}.${String(
      date.getMonth() + 1
    ).padStart(2, "0")}.${date.getFullYear()}`;
  };

  const toggleComments = () => {
    setVisibleCount(
      visibleCount < sortedComments.length ? sortedComments.length : 3
    );
  };

  /* -------------------- Render -------------------- */
  return (
    <section className="max-w-2xl my-6 py-5 px-5">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
        Tell us your opinion{" "}
        <small className="text-gray-400 mx-3">
          (create account to comment)
        </small>
      </h2>

      {/* Comment Input */}
      <div className="bg-white dark:bg-slate-800 shadow rounded-lg p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-3">
          <input
            type="text"
            placeholder="Write your comment..."
            value={newComment}
            disabled={!user}
            onChange={(e) => setNewComment(e.target.value)}
            className="flex-1 border border-gray-300 dark:border-slate-600
                       rounded-lg px-4 py-2 focus:outline-none
                       focus:ring-2 focus:ring-indigo-500
                       dark:bg-slate-700 dark:text-white"
          />
          {user && (
            <button
              onClick={handleAddComment}
              className="bg-indigo-600 hover:bg-indigo-700
                         text-white px-4 py-2 rounded-lg
                         font-semibold transition"
            >
              Comment
            </button>
          )}
        </div>
      </div>

      {/* Comments */}
      {sortedComments.length === 0 ? (
        /* -------- First Comment Design -------- */
        <div
          className="flex flex-col items-center justify-center text-center
                     bg-white dark:bg-slate-800 border border-dashed
                     border-gray-300 dark:border-slate-600
                     rounded-xl p-8"
        >
          <div
            className="w-14 h-14 flex items-center justify-center
                       rounded-full bg-indigo-100 dark:bg-indigo-900
                       text-indigo-600 dark:text-indigo-300 mb-4"
          >
            <FaComments />
          </div>

          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            No comments yet
          </h3>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-sm">
            Be the first one to share your experience about this place.
          </p>

          {user ? (
            <button
              onClick={() => document.querySelector("input")?.focus()}
              className="mt-5 bg-indigo-600 hover:bg-indigo-700
                         text-white px-5 py-2 rounded-lg
                         text-sm font-medium transition"
            >
              Write first comment
            </button>
          ) : (
            <p className="mt-4 text-sm text-gray-400">
              Login to write the first comment
            </p>
          )}
        </div>
      ) : (
        /* -------- Comments List -------- */
        <div className="space-y-4">
          {sortedComments.slice(0, visibleCount).map((comment) => (
            <div
              key={comment.id}
              className="bg-white dark:bg-slate-800
                         shadow rounded-lg p-4 flex gap-3"
            >
              {/* Avatar */}
              <div
                className="w-10 h-10 rounded-full bg-indigo-500
                           flex items-center justify-center
                           text-white font-bold"
              >
                {usersMap[comment.user_id]?.firstname?.charAt(0) || "U"}
              </div>

              {/* Content */}
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                  {usersMap[comment.user_id]?.firstname || "Unknown"}
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

          {sortedComments.length > 3 && (
            <button
              onClick={toggleComments}
              className="text-sm bg-indigo-700 hover:bg-indigo-800
                         text-white rounded py-1 px-3 transition"
            >
              {visibleCount < sortedComments.length
                ? "Load more comments"
                : "Show less"}
            </button>
          )}
        </div>
      )}
    </section>
  );
};
