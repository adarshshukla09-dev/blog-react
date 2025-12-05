import cookieParser from "cookie-parser";
import express from "express";
import blogRouter from "./routes/blog.route.js";
import userBlog from "./routes/user.routes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app = express();

// connect database
connectDB();

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser()); // ✅ FIXED
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
// routes
app.get("/", (req, res) => {
  res.send("Notes App Backend API is running...");
});

app.use("/api/blogs", blogRouter);
app.use("/api/user", userBlog);

// server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  console.log(`Access the API at http://localhost:${PORT}`);
});
