import axios, { AxiosRequestConfig } from "axios";

export const authHttpClient = axios.create({
  baseURL: " http://localhost:3000/api/auth/",
  timeout: 1000,
  headers: {},
});

export const httpClient = axios.create({
  baseURL: " http://localhost:3000/api/",
  timeout: 1000,
  headers: {},
});
authHttpClient.interceptors.request.use((config) => {
  config.headers["authorization"] = `JWT ${window.localStorage.getItem(
    "token"
  )}`;

  return config;
});
export function getCurrentUser() {
  return authHttpClient.get("profile");
}
export function login(payload: {}) {
  return httpClient.post("login", payload);
}
