import { ApiUrl } from "../api/ApiUrl";
import { useFetch } from "./useFetch";

// get all places
export const usePlaces = () => useFetch(`${ApiUrl}/places`);

// get place by id
export const usePlaceById = (id) => {
  id
    ? useFetch(`${ApiUrl}/places/${id}`)
    : { data: [], loading: false, error: null };
};

export const usePlaceOwner = (user_id) => {
  const { data, error, loading } = useFetch(
    user_id ? `${ApiUrl}/users/${user_id}` : null
  );
  return { data, error, loading };
};

// // Get the owner of a place (user)
// export const usePlaceOwner = (user_id) => {
//   return useFetch(user_id ? `${ApiUrl}/users/${user_id}` : null);
// };

// // Get the city of a place
// export const usePlaceCity = (city_id) => {
//   return useFetch(city_id ? `${ApiUrl}/cities/${city_id}` : null);
// };
