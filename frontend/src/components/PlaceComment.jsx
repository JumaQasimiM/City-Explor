import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useComments, useCommentByPlaceId } from "../hooks/useComments";

import { FaComments } from "react-icons/fa6";
import { HiDotsVertical } from "react-icons/hi";

export const PlaceComments = ({ place_id }) => {
  const [newComment, setNewComment] = useState("");
  const [visible, setVisible] = useState(3);
  const [deleteId, setDeleteId] = useState(null);
  const [menu, setMenu] = useState(null);

  const { user } = useAuth();
  const { data: comments = [], refetch } = useCommentByPlaceId(place_id);
  const { createPlaceComment, deletePlaceComment } = useComments();

  /* ===== ADD ===== */
  const handleAdd = async () => {
    if (!newComment.trim()) return;

    await createPlaceComment({
      place: place_id,
      comment: newComment,
    });

    setNewComment("");
    refetch();
  };

  /* ===== DELETE ===== */
  const handleDelete = async () => {
    await deletePlaceComment(deleteId);
    setDeleteId(null);
    refetch();
  };

  const sorted = [...comments].reverse();

  return (
    <section className="max-w-3xl mx-auto my-10">
      <h2 className="text-xl font-bold mb-6 text-gray-600 font-quicksand">
        Share Your Experience (make an acsount)
      </h2>

      {/* ADD */}
      <div className="bg-white p-5 rounded mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            value={newComment}
            disabled={!user?.user}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write comment..."
            className="flex-1 border px-4 py-2 rounded"
          />

          {user && (
            <button
              onClick={handleAdd}
              className="bg-emerald-500 text-white px-4 py-2 rounded"
            >
              Comment
            </button>
          )}
        </div>
      </div>

      {/* EMPTY */}
      {sorted.length === 0 && (
        <div className="text-center p-10 bg-white rounded-xl">
          <FaComments className="mx-auto text-3xl mb-3 text-emerald-500" />
          No comments yet
        </div>
      )}

      {/* LIST */}
      <div className="space-y-4">
        {sorted.slice(0, visible).map((c) => (
          <div key={c.id} className="bg-white p-4 rounded shadow flex gap-3">
            <div className="w-10 h-10 bg-emerald-500 text-white flex items-center justify-center rounded-full">
              {c.user?.first_name?.charAt(0) || "U"}
            </div>

            <div className="flex-1">
              <p className="font-semibold">
                {c.user?.first_name || "Anonymous"}
              </p>
              <p className="text-gray-600">{c.comment}</p>
            </div>

            {user?.user?.id === c.user?.id && (
              <div className="relative">
                <HiDotsVertical
                  onClick={() => setMenu(menu === c.id ? null : c.id)}
                  className="cursor-pointer"
                />

                {menu === c.id && (
                  <div className="absolute right-0 bg-white shadow rounded">
                    <button
                      onClick={() => setDeleteId(c.id)}
                      className="px-4 py-2 text-sm hover:text-red-500"
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

      {/* LOAD MORE */}
      {sorted.length > 3 && (
        <div className="text-center mt-5">
          <button
            onClick={() =>
              setVisible(visible < sorted.length ? sorted.length : 3)
            }
            className="bg-indigo-600 text-white px-4 py-2 rounded-full"
          >
            {visible < sorted.length ? "Load More" : "Show Less"}
          </button>
        </div>
      )}

      {/* DELETE MODAL */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow">
            <p>Delete comment?</p>
            <div className="flex gap-3 mt-4">
              <button onClick={() => setDeleteId(null)}>Cancel</button>
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-3 py-1 rounded"
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
