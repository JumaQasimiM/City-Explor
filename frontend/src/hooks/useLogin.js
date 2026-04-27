// hooks/useLogin.js
import { ApiUrl } from "../api/ApiUrl";

/**
 * Get user from API and validate login
 * @param {string} username
 * @param {string} password
 * @returns {object} { isLoggedIn, user?, error? }
 */
export const loginRequest = async (username, password) => {
  try {
    const res = await fetch(`${ApiUrl}/users/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    let data;
    try {
      data = await res.json();
    } catch {
      return { isLoggedIn: false, error: "Server error" };
    }

    if (!res.ok) {
      return {
        isLoggedIn: false,
        error: data.detail || data.message || "Login failed",
      };
    }

    // get user info
    const userRes = await fetch(`${ApiUrl}/users/me/`, {
      headers: {
        Authorization: `Bearer ${data.access}`,
      },
    });

    if (!userRes.ok) {
      return {
        isLoggedIn: false,
        error: "Failed to fetch user",
      };
    }

    const user = await userRes.json();

    return {
      isLoggedIn: true,
      user,
      access: data.access,
      refresh: data.refresh,
    };
  } catch {
    return {
      isLoggedIn: false,
      error: "Network error",
    };
  }
};
