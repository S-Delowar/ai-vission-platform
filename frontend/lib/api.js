import axios from "axios";
import Cookies from "js-cookie";

export const API = axios.create({
    baseURL: "http://localhost:8000/api",
});

// Attach token automatically
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

// Auth
export const loginUser = (email, password) => {
    return API.post("/auth/signin/", { email, password});
}

export const signupUser = (email, username, password) => { 
  return API.post("/auth/signup/", { email, username, password });
}

// Protected: Image upload and detect objects
export const uploadAndDetect = (formData) => {
    return API.post("/detect/upload/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

// ask gemini
export const askGemini = (image_id, question) => { 
  return API.post("/qa/", { image_id, question });
}
