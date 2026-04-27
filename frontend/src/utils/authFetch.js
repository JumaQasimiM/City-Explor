const STORAGE_KEY = "auth";

export const authFetch = async (url, options = {}) => {
  const auth = JSON.parse(localStorage.getItem(STORAGE_KEY));

  return fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${auth?.access}`,
    },
  });
};
