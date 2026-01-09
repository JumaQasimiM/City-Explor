import { useFetch } from "./useFetch";
import { ApiUrl } from "../api/ApiUrl";

/**
 * custom Hook to fetch users from api
 *
 * src/hooks/useUsers,js
 *
 * usage:
 *
 * const {users, loading, error, hasUsers} = useUsers();
 *
 * @returns {object} { users, loading, error, hasUsers }
 *
 */

export const useUsers = () => {
  const { data = [], loading, error } = useFetch(`${ApiUrl}/users`);

  return {
    users: data,
    loading,
    error,
    hasUsers: data.length > 0, // helper boolean to easily check if users exist
  };
};

// get user by id
export const useGetUserById = (user_id) => {
  const { data = [], error, loading } = useFetch(`${ApiUrl}/users/${user_id}`);
  return {
    user: data,
    loading,
    error,
  };
};
