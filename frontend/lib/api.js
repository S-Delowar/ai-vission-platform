import axios from "axios";
import Cookies from "js-cookie";

export const API = axios.create({
    baseURL: "http://localhost:8000/api",
});

// Attach token automatically
API.interceptors.request.use((config) => {
    if (
        config.url.includes("/auth/login/") ||
        config.url.includes("/auth/register/")
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
    return API.post("/auth/login/", { email, password});
}

export const signupUser = (email, username, password) => { 
  return API.post("/auth/register/", { email, username, password });
}

// Protected: Image upload and detect objects
export const uploadAndDetect = (formData) => {
    return API.post("/upload/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

// Protected: Run YOLO detection
// export const runDetection = (imageId) =>
//     return API.post(`/detection/run/${imageId}/`);