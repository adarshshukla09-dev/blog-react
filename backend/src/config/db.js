import mongoose from "mongoose";

export const connectDB = () => {
  async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/bl2ogs");
  }

  main()
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB Error:", err));
};
