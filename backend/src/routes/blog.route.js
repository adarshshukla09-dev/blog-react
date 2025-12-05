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

router.get("/", allblogs);
router.get("/:id", ablog);
router.post("/create", createBlog);
router.put("/:id", editBlog);
router.delete("/:id", deleteBlog);

export default router;
