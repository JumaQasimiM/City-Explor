const isDev = import.meta.env.DEV;

export const ApiUrl = isDev
  ? "http://localhost:8000/api"
  : import.meta.env.VITE_API_URL;
