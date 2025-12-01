import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const createToken = (id) => {
  jwt.sign({ id }, process.env.JWT_SECERT || "scecret", { expiresIn: "7d" });
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existing = await User.find({ email });
    if (existing)
      return register.status(400).json({ message: "user already exist" });

    const hashedpassword = bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedpassword });

    const token = createToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      samesite: "lax",
      maxage: 7 * 24 * 60 * 60 * 1000,
    });
    res.json(
      { message: "user registered " },
      {
        _id: user._id,
        name: user.name,
        email: user.email,
      }
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "user not present " });
  }
  const isMatch = bcrypt.compare(password, user.password);
  if (isMatch) {
    return res.status(400).json({ message: "Incoorect password" });
  }
  const token = createToken(user._id);
  res.cookie("token", token, { id: user._id, email: user.email });
};
export const logout = async (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged Out" });
};
