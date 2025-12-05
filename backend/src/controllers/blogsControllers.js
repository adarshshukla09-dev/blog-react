import Blog from "../models/Blog.js";

export const createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newBlog = new Blog({ title, content });
    newBlog.save();
    res.status(200).json({
      _id: newBlog.id,
      title: newBlog.title,
      content: newBlog.content,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const editBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    // const userId = req.user.id;
    const blogId = req.params.id;
    console.log(blogId);
    const blog = await Blog.findOneAndUpdate(
      {
        _id: blogId,
        // userId,
      },
      { title, content },
      { new: true, runValidators: true }
    );
    if (!blog) {
      return res.status(400).json({ message: error.message });
    }

    res.status(200).json({
      _id: blog.id,
      title: blog.title,
      content: blog.content,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteBlog = async (req, res) => {
  // const userId = req.user.id;
  const delBlog = req.params.id;
  try {
    const deleteBlog = await Blog.findOneAndDelete({ _id: delBlog });
    if (!deleteBlog) return res.status(400).json({ message: error.message });

    return res.status(200).json({
      message: "blogs deleted successfully",
      blog: deleteBlog,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
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
