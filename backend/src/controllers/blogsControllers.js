import Blog from "../models/Blog.js";

export const createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newBlog = new Blog({ title, content });
    newBlog.save();
    res.status(200).json({ message: "new note created sucessfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const editBlog = async (req, res) => {
  try {
    const userId = req.user.id;
    const blogId = req.paramas.id;
    const blog = await Blog.findOneAndUpdate(
      blogId,
      userId,
      { title, content },
      { new: true, runValidators: true }
    );
    if (!blog) {
      return res.status(400).json({ message: error.message });
    }

    return res.status(200).json({
      message: "blogs updated successfully",
      blog: blog,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteBlog = async (req, res) => {
  const userId = req.user.id;
  const delBlog = req.paramas.id;
  try {
    const deleteBlog = await Blog.findOneAndDelete({ delBlog });
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
    const userId = req.user._id;
    const allblog = await Blog.find(userId).sort({ createdAt: -1 }).lean();

    return res.status(200).json({ message: "all blogs are obtained", allblog });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const ablog = async (req, res) => {
  const userId = req.user._id;
  const blogId = req.paramas.id;

  try {
    const ablog = await find({ userId, blogId });
    return res.status(200).json({ message: "a blog is obtain " }, ablog);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
