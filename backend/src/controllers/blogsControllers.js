import Blog from "../models/Blog.js";
import upload from "./middleware/Upload.js";
import cloudinary from "./config/cloudinary.js";
export const createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;

    let imageUrl = null;

    // upload image if available
    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "blogs" }, (err, uploaded) => {
            if (err) reject(err);
            else resolve(uploaded);
          })
          .end(req.file.buffer);
      });

      imageUrl = result.secure_url;
    }

    // create blog
    const newBlog = new Blog({
      title,
      content,
      imageUrl,
    });

    await newBlog.save(); // <-- important!

    res.status(200).json({
      _id: newBlog.id,
      title: newBlog.title,
      content: newBlog.content,
      imageUrl: newBlog.imageUrl, // <-- include this
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
import Blog from "../models/Blog.js";
import cloudinary from "../config/cloudinary.js";

export const editBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const { title, content } = req.body;

    // Find existing blog
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    let imageUrl = blog.imageUrl;
    let imagePublicId = blog.imagePublicId;

    // If new image provided
    if (req.file) {
      // 1️⃣ Delete old Cloudinary image
      if (blog.imagePublicId) {
        await cloudinary.uploader.destroy(blog.imagePublicId);
      }

      // 2️⃣ Upload new image
      const uploaded = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "blogs" }, (err, result) => {
            if (err) reject(err);
            else resolve(result);
          })
          .end(req.file.buffer);
      });

      imageUrl = uploaded.secure_url;
      imagePublicId = uploaded.public_id;
    }

    // 3️⃣ Update database
    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.imageUrl = imageUrl;
    blog.imagePublicId = imagePublicId;

    await blog.save();

    res.status(200).json({
      message: "Blog updated successfully",
      blog,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.id;

    // Find blog
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // 1️⃣ Delete image from Cloudinary
    if (blog.imagePublicId) {
      await cloudinary.uploader.destroy(blog.imagePublicId);
    }

    // 2️⃣ Delete blog from database
    await Blog.findByIdAndDelete(blogId);

    res.status(200).json({
      message: "Blog and image deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const allblogs = async (req, res) => {
  try {
    // const userId = req.user.id;
    const allblog = await Blog.find().sort({ createdAt: -1 }).lean();

    return res.status(200).json({ message: "all blogs are obtained", allblog });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const ablog = async (req, res) => {
  try {
    const blogId = req.params.id;

    const blog = await Blog.findOne({ _id: blogId });

    if (!blog) return res.status(400).json({ message: "Blog not found" });

    return res.status(200).json(blog);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "my-images" }, (error, uploaded) => {
          if (error) reject(error);
          else resolve(uploaded);
        })
        .end(req.file.buffer);
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
