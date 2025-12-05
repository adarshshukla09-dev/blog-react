import axios from "axios";

export const blogsapi = axios.create({
  baseURL: "http://localhost:5000/api/blogs",
  withCredentials: true, // crucial for cookies
});
