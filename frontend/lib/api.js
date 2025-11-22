import axios from "axios";
import Cookies from "js-cookie";

export const API = axios.create({
  baseURL: "http://localhost:8000/api",
});

export const refreshToken = () => {
  const refresh = Cookies.get("refresh");
  return API.post("/auth/refresh/", { refresh });
};

// Attach token automatically to request
API.interceptors.request.use((config) => {
  if (
    config.url.includes("/auth/signin/") ||
    config.url.includes("/auth/signup/")
  ) {
    return config; // do NOT attach token
  }
  const token = Cookies.get("access");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// get new access token
API.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // If access token expired
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // call backend refresh API
        const res = await refreshToken();
        const newAccess = res.data.access;

        // save new access token in cookies
        Cookies.set("access", newAccess);

        // attach new token to axios
        API.defaults.headers.Authorization = `Bearer ${newAccess}`;
        originalRequest.headers.Authorization = `Bearer ${newAccess}`;

        // retry the failed request
        return API(originalRequest);
      } catch (err) {
        // refresh failed → logout user
        Cookies.remove("access");
        Cookies.remove("refresh");
        Cookies.remove("username");
        Cookies.remove("email");

        window.location.href = "/signin";
      }
    }

    return Promise.reject(error);
  }
);

// Auth
export const loginUser = (email, password) => {
  return API.post("/auth/signin/", { email, password });
};

export const signupUser = (email, username, password) => {
  return API.post("/auth/signup/", { email, username, password });
};

// Protected: Image upload and detect objects
export const uploadAndDetect = (formData) => {
  return API.post("/detect/upload/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// ask gemini
export const askGemini = (image_id, question) => {
  return API.post("/qa/", { image_id, question });
};
