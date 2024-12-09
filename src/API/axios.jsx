import axios from "axios";
export const axiosInstance = axios.create({
  // baseURL:"http://localhost:7777"
  baseURL: "https://amazon-clone-backend-1-iqr1.onrender.com",
});