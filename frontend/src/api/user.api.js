import axios from "axios";

export const userapi = axios.create({
  baseURL: "http://localhost:5000/api/user",
  withCredentials: true, // crucial for cookies
});
