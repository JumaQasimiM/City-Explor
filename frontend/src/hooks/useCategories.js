import { useFetch } from "./useFetch";
import { ApiUrl } from "../api/ApiUrl";
import { useState } from "react";

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

  const createCategory = async (payload) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${ApiUrl}/categories/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to create category");
      }

      const data = await res.json();
      return data;
    } catch (err) {
      const message = err.message || "Something went wrong";
      setError(message);
      throw new Error(message);
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

  const deleteCategory = async (category_id) => {
    setLoading(true);
    try {
      const res = await fetch(`${ApiUrl}/categories/${category_id}/`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to create category");
      }
      await res.json();
      return true;
    } catch (error) {
      setError(error.message);
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { deleteCategory, error, loading };
};
// edite category
export const useEditCategory = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const updateCategory = async (category_id, payload) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${ApiUrl}/categories/${category_id}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to update category");
      }

      const data = await res.json();
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateCategory, error, loading };
};
