let ApiUrl = "";
export const BASE_URL = "http://localhost:8000";
if (import.meta.env.MODE === "development") {
  // json-server in Entwicklung
  // ApiUrl = "http://localhost:3000";http://localhost:8000/api/
  ApiUrl = "http://localhost:8000/api";
} else {
  // Produktiv-Backend
  ApiUrl = "https://city-api-icko.onrender.com";
}

export { ApiUrl };
