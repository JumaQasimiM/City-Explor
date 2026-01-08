import { useFetch } from "./useFetch";
import { ApiUrl } from "../api/ApiUrl";

/**
 * custom Hook to fetch Cities from api
 *
 * src/hooks/useCities.js
 *
 * usage:
 *
 * const {cities, loading, error, hasUsers} = useCities();
 *
 * @returns {object} { cities, loading, error, hasCity }
 *
 */

// get all cities
export const useCities = () => {
  const { data = [], error, loading } = useFetch(`${ApiUrl}/cities`);
  return {
    cities: data,
    error,
    loading,
    hasCity: data.lenght > 0,
  };
};
