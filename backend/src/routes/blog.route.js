import {
  ablog,
  allblogs,
  editBlog,
  createBlog,
  deleteBlog,
  uploadImage,
} from "../controllers/blogsControllers.js";
import { protect } from "../middleware/auth.middleware.js";
import express from "express";

const router = express.Router();

router.get("/", allblogs);
router.get("/:id", ablog);
router.post("/create", upload.single("image"), createBlog);
router.put("/edit/:id", upload.single("image"), editBlog);
router.delete("/:id", deleteBlog);
router.post("/upload", upload.single("image"), uploadImage);
export default router;
