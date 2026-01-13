// hooks/useLogin.js
import { ApiUrl } from "../api/ApiUrl";

/**
 * Get user from API and validate login
 * @param {string} email
 * @param {string} password
 * @returns {object} { isLoggedIn, user?, error? }
 */
export const loginRequest = async (email, password) => {
  const res = await fetch(`${ApiUrl}/users?email=${email}`);
  const data = await res.json();

  // user not found
  if (!data.length) {
    return { isLoggedIn: false, error: "User not found" };
  }

  const user = data[0];

  // check password
  if (password !== user.password) {
    return { isLoggedIn: false, error: "Invalid email or password" };
  }

  // check active status
  if (user.status !== "active") {
    return { isLoggedIn: false, error: "User is not active" };
  }

  return { isLoggedIn: true, user };
};
