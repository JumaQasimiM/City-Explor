import { useFetch } from "./useFetch";
import { ApiUrl } from "../api/ApiUrl";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

/**
 * custom Hook to fetch Categories from api
 *
 * src/hooks/useCategories.js
 *
 * usage:
 *
 * const {categories, loading, error, hasCategory} = useCategories();
 *
 * @returns {object} { categories, loading, error, hasCategory }
 *
 */

// get all categories
export const useCategories = () => {
  const {
    data = [],
    error,
    loading,
    refetch,
  } = useFetch(`${ApiUrl}/categories/`);
  return {
    categories: data,
    error,
    loading,
    hasCategory: data.length > 0,
    refetch,
  };
};

// get category by id
export const useCategoryById = (id) => {
  return useFetch(`${ApiUrl}/categories/${id}/`);
};

// create new category
export const useCreateCategory = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const createCategory = async (payload) => {
    if (!user?.access) throw new Error("Not authenticated");

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${ApiUrl}/categories/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.access}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Failed to create category");
      }

      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createCategory, loading, error };
};

// delete category

export const useDeleteCategory = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const deleteCategory = async (id) => {
    if (!user?.access) throw new Error("Not authenticated");

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${ApiUrl}/categories/${id}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.access}`,
        },
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.message || "Delete failed");
      }

      return true; // ✅ مهم
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { deleteCategory, loading, error };
};
// edite category
export const useEditCategory = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const updateCategory = async (id, payload) => {
    if (!user?.access) throw new Error("Not authenticated");

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${ApiUrl}/categories/${id}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.access}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data?.detail || data?.message || "Something went wrong",
        );
      }

      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateCategory, loading, error };
};
