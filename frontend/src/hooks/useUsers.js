import { useFetch } from "./useFetch";
import { ApiUrl } from "../api/ApiUrl";
import { useState } from "react";
import emailjs from "@emailjs/browser";
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
  const { data = [], loading, error, refetch } = useFetch(`${ApiUrl}/users`);

  return {
    users: data,
    loading,
    error,
    hasUsers: data.length > 0, // helper boolean to easily check if users exist
    refetch,
  };
};
// save to database - POST
export const useCreateUser = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const createUser = async (payload) => {
    setLoading(true);
    try {
      const res = await fetch(`${ApiUrl}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        throw new Error("Failed to create user");
      }
      return true;
    } catch (error) {
      setError(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return { createUser, error, loading };
};
// delete user - DELETE

export const useDeleteUser = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const deleteUser = async (user_id) => {
    setLoading(true);
    try {
      const res = await fetch(`${ApiUrl}/users/${user_id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete user");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { deleteUser, error, loading };
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

// handle user status -pending, active, delete

export const useActiveUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const activeUser = async (user_id) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      //  update user status
      const res = await fetch(`${ApiUrl}/users/${user_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "active" }),
      });

      if (!res.ok) {
        throw new Error("Failed to activate user");
      }

      // get updated user data
      const updatedUser = await res.json();
      // to send confirmation email

      const template_parms = {
        name: updatedUser.lastname,
        email: updatedUser.email,
        login_link: "https://onlinemarkt.netlify.app/login", // this is template
      };
      // send email
      await emailjs.send(
        "service_i9nieml", // service id
        "template_4o61op6", // template id
        template_parms,
        "5PHdd8XfmakRljKox"
      );
      setSuccess("User activated & email sent successfully");
      return updatedUser;
    } catch (err) {
      setError(err.message || "Something went wrong");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { activeUser, loading, error, success };
};

// check repeat email
export const useCheckRepeatEmail = (email) => {
  const [error, setError] = useState(null);
  const { data, loading } = useFetch(
    email ? `http://localhost:3000/users?email=${email}` : null
  );

  const checkEmail = async () => {
    if (loading) return false;

    if (Array.isArray(data) && data.length > 0) {
      setError("This email already exists");
      return false;
    }

    setError(null);
    return true;
  };
  return { checkEmail, error, loading };
};
