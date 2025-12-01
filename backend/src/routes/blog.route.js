import {
  ablog,
  allblogs,
  editBlog,
  createBlog,
  deleteBlog,
} from "../controllers/blogsControllers.js";
import { protect } from "../middleware/auth.middleware.js";
import express from "express";
const router = express.Router();

router.get("/", protect, allblogs);
router.get("/:id", protect, ablog);
router.post("/create", protect, createBlog);
router.put("/:id", protect, editBlog);
router.delete("/:id", protect, deleteBlog);

export default router;
