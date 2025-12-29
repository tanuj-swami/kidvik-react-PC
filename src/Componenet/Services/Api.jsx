import axios from "axios";
import { BASE_URL } from "../../Helper/Base_Url";


export const getAuthToken = () => {
  return (
    localStorage.getItem("partner_access") ||
    localStorage.getItem("accessToken")
  );
};
const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
