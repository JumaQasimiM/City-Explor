import { useState } from "react";
import { ApiUrl } from "../api/ApiUrl";
import { useFetch } from "./useFetch";
import { useAuth } from "../context/AuthContext";

// get all places
export const usePlaces = () => {
  const { data = [], error, loading, refetch } = useFetch(`${ApiUrl}/places/`);
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
  const { user } = useAuth();

  const deletePlace = async (place_id) => {
    setLoading(true);
    setError(null);

    try {
      if (!user?.access) {
        throw new Error("No token found");
      }

      const res = await fetch(`${ApiUrl}/places/${place_id}/`, {
        headers: {
          Authorization: `Bearer ${user?.access}`,
        },
        method: "DELETE",
      });

      let data = null;
      try {
        data = await res.json();
      } catch (_) {}

      if (!res.ok) {
        throw new Error(
          data?.detail || data?.message || "Failed to delete place",
        );
      }

      return true;
    } catch (error) {
      setError(error.message || "something went wrong");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { deletePlace, error, loading };
};
// get place by id
export const usePlaceById = (id) => {
  return useFetch(id ? `${ApiUrl}/places/${id}/` : null);
};

// Get the owner of a place (user)
export const usePlaceOwner = (user_id) => {
  return useFetch(user_id ? `${ApiUrl}/users/${user_id}/` : null);
};

// Get the city of a place
export const usePlaceCity = (city_id) => {
  return useFetch(city_id ? `${ApiUrl}/cities/${city_id}/` : null);
};
// Get the category of a place
export const usePlaceCategory = (cate_id) => {
  return useFetch(cate_id ? `${ApiUrl}/categories/${cate_id}/` : null);
};

// placeList
export const usePopularPlace = () => {
  const { data = [], error, loading } = useFetch(`${ApiUrl}/places/?limit=4`);

  return {
    popularPlace: data,
    loading,
    error,
    hasData: data.length > 0,
  };
};

// search by category

export const useSearchByCategory = (category_id) => {
  const {
    data: category,
    error,
    loading,
  } = useFetch(`${ApiUrl}/places?category = ${category_id}`);
};

// edit place
export const useEditPlace = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const updatePlace = async (id, payload) => {
    setLoading(true);
    setError(null);

    try {
      if (!user?.access) {
        throw new Error("User not authenticated");
      }

      const res = await fetch(`${ApiUrl}/places/${id}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.access}`,
        },
        body: JSON.stringify(payload),
      });

      let data = null;

      try {
        data = await res.json();
      } catch (_) {
        // empty body → ignore
      }

      if (!res.ok) {
        throw new Error(
          data?.detail || data?.message || "Failed to update place",
        );
      }

      return data;
    } catch (err) {
      setError(err.message || "Something went wrong");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updatePlace, error, loading };
};
