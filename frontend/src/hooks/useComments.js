import { useFetch } from "./useFetch";
import { ApiUrl } from "../api/ApiUrl";
import { useState } from "react";

export const useComments = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // get all comments
  const { data: blogscomments } = useFetch(`${ApiUrl}/blogscomments`);
  const { data: placecomments } = useFetch(`${ApiUrl}/placecomments`);

  //   blog comment
  const createBlogComment = async (payload) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${ApiUrl}/blogscomments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to create comment");
      }

      return await res.json();
    } catch (err) {
      setError(err.message || "Something went wrong");
      return null;
    } finally {
      setLoading(false);
    }
  };
  // place comment
  const createPlaceComment = async (payload) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${ApiUrl}/placecomments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to create comment");
      }

      return await res.json();
    } catch (err) {
      setError(err.message || "Something went wrong");
      return null;
    } finally {
      setLoading(false);
    }
  };
  return {
    createBlogComment,
    createPlaceComment,
    error,
    loading,
  };
};

export const useCommentuser = (user_id) => {
  return useFetch(user_id ? `${ApiUrl}/users/${user_id}` : null);
};

// get comment by blog id
export const useCommentByBlogId = (blog_id) => {
  return useFetch(`${ApiUrl}/blogscomments?blog_id=${blog_id}`);
};

// get comment by place id
export const useCommentByPlaceId = (place_id) => {
  return useFetch(`${ApiUrl}/placecomments?place_id=${place_id}`);
};
