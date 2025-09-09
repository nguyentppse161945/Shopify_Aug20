import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now }
});

const Category =
  mongoose.models.category || mongoose.model("category", categorySchema);

export default Category;
