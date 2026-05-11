import { useFetch } from "./useFetch";
import { ApiUrl } from "../api/ApiUrl";
import { useReducer, useState } from "react";
import { useAuth } from "../context/AuthContext";
/**
 * Custom hook to fetch cities from API
 *
 * src/hooks/useCities.js
 *
 * Usage:
 * const { cities, loading, error, hasCity, refetch } = useCities();
 *
 * @returns {object}
 */
export const useCities = () => {
  const { data, error, loading, refetch } = useFetch(`${ApiUrl}/cities/`);

  return {
    cities: data,
    loading,
    error,
    hasCity: data.length > 0,
    refetch,
  };
};

//  get city by id
/**
 * fetch city by id from api
 *
 * src/hooks/useCitirs.js
 *
 * Usage:
 *
 * const {data} = useCityById(city_id)
 *
 *
 * @param {Number} {city_id}
 *
 * */
export const useCityById = (city_id) => {
  return useFetch(`${ApiUrl}/cities/${city_id}/`);
};
/**
 * Custom hook to delete a city
 *
 * Usage:
 * const { deleteCity, loading, error } = useDeleteCity();
 */
export const useDeleteCity = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const deleteCity = async (cityId) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${ApiUrl}/cities/${cityId}/`, {
        headers: { Authorization: `Bearer ${user.access}` },
        method: "DELETE",
      });
      let data = null;

      try {
        data = await res.json();
      } catch (_) {
        // empty body → ignore
      }

      if (!res.ok) {
        throw new Error(
          data?.detail || data?.message || "Failed to update City",
        );
      }

      return true;
    } catch (err) {
      setError(err.message || "Something went wrong");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { deleteCity, loading, error };
};

// create
/**
 * custom hook to create new city
 *
 * usage:
 *
 * const {createCity, error, loading} = useCreateCity()
 *
 * @returns {object} {createCity, error, loading}
 */

export const useCreateCity = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const createCity = async (payload) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${ApiUrl}/cities/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.access}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.detail || data.message || "Failed to create city");
      }
      return data;
    } catch (error) {
      setError(error.message || "something went wrong");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { error, loading, createCity };
};

// update cits

export const useEditCity = () => {
  const { user } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const updateCity = async (city_id, payload) => {
    setLoading(true);
    try {
      const res = await fetch(`${ApiUrl}/cities/${city_id}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.access}`,
        },

        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to update category");
      }

      return data;
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { updateCity, error, loading };
};
