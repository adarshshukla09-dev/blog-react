import mongoose, { Schema } from "mongoose";
import User from "./User.js";

const BlogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: User,
      reuired: true,
    },
    title: {
      type: String,
      trim: true,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    imageUrl: String,
    imagePublicId: { type: String, default: null }, // useful for future delete
  },
  { timestamps: true }
);
const Blog = mongoose.model("Blog", BlogSchema);
export default Blog;
