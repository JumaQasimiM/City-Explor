import { useState } from "react";
import { ApiUrl } from "../api/ApiUrl";
import { useFetch } from "./useFetch";

// get all places
export const usePlaces = () => {
  const { data = [], error, loading, refetch } = useFetch(`${ApiUrl}/places`);
  return {
    places: data,
    error,
    loading,
    hasPlace: data.length > 0,
    refetch,
  };
};

// delete place
export const useDeletePlace = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const deletePlace = async (place_id) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${ApiUrl}/places/${place_id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete place");
      }
      return true;
    } catch (error) {
      setError(error.message || "something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return { deletePlace, error, loading };
};
// get place by id
export const usePlaceById = (id) => {
  return useFetch(id ? `${ApiUrl}/places/${id}` : null);
};

// Get the owner of a place (user)
export const usePlaceOwner = (user_id) => {
  return useFetch(user_id ? `${ApiUrl}/users/${user_id}` : null);
};

// Get the city of a place
export const usePlaceCity = (city_id) => {
  return useFetch(city_id ? `${ApiUrl}/cities/${city_id}` : null);
};
// Get the category of a place
export const usePlaceCategory = (cate_id) => {
  return useFetch(cate_id ? `${ApiUrl}/categories/${cate_id}` : null);
};
