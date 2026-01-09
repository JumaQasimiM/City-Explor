import { useFetch } from "./useFetch";
import { ApiUrl } from "../api/ApiUrl";

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
  const { data = [], error, loading } = useFetch(`${ApiUrl}/categories`);
  return {
    categories: data,
    error,
    loading,
    hasCategory: data.lenght > 0,
  };
};
