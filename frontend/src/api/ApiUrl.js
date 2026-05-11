// let ApiUrl = "";
// export const BASE_URL = "http://localhost:8000";
// if (import.meta.env.MODE === "development") {
//   // json-server in Entwicklung
//   // ApiUrl = "http://localhost:3000";http://localhost:8000/api/
//   ApiUrl = "http://localhost:8000/api";
// } else {
//   // Produktiv-Backend
//   ApiUrl = "https://city-api-icko.onrender.com";
// }

// export { ApiUrl };

// const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

// export const ApiUrl = BASE_URL;
// // import.meta.env.MODE === "development"
// //   ? "http://localhost:8000/api"
// //   : BASE_URL;

const isDev = import.meta.env.DEV;

export const ApiUrl = isDev
  ? "http://localhost:8000/api"
  : import.meta.env.VITE_API_URL;
