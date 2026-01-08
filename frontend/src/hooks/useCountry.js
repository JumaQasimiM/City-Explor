import { useFetch } from "./useFetch";
import { ApiUrl } from "../api/ApiUrl";

/**
 * custom Hook to fetch Countries from api
 *
 * src/hooks/useCountry.js
 *
 * usage:
 *
 * const {countries, loading, error, hasUsers} = useCountries();
 *
 * @returns {object} { countries, loading, error, hasCountry }
 *
 */

// get all countra
export const useCountries = () => {
  const { data = [], error, laoding } = useFetch(`${ApiUrl}/countries`);
  return {
    countries: data,
    error,
    laoding,
    hasCountry: data.lenght > 0,
  };
};
