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
export function login(payload: { email: string; password: string }) {
  return httpClient.post("login", payload);
}
export function register(payload: {
  username: string;
  password: string;
  email: string;
  first_name: string;
  last_name: string;
}) {
  return httpClient.post("register", payload);
}
export function updateProfile(userId: string, payload: {}) {
  return authHttpClient.patch("users/" + userId, payload);
}
export function getFoods() {
  return authHttpClient.get("foods");
}
export function orderFood(payload: {}) {
  return authHttpClient.post("orders", payload);
}
export function createNewFood(payload: FormData | {}) {
  return authHttpClient.post("foods", payload);
}
export function getOrders() {
  return authHttpClient.get("orders");
}
export function updateOrder(orderId: string, payload: {}) {
  return authHttpClient.patch(`orders/${orderId}`, payload);
}
export function deleteOrder(orderId: string) {
  return authHttpClient.delete(`orders/${orderId}`);
}
