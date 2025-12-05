import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECERT || "secret", {
    expiresIn: "7d",
  });
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log({ password: password });
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "user already exist" });
    }

    const hashedpassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name: name,
      email: email,
      password: hashedpassword,
    });
    console.log({
      name: name,
      email: email,
      password: hashedpassword,
    });
    const token = createToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
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
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Incoorect password" });
  }
  const token = createToken(user._id);
  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  console.log("logged in");
  res.json({
    message: "Login successful",
    user: {
      id: user._id,
      email: user.email,
    },
  });
};
export const logout = async (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged Out" });
};
