import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    clerkId: { type: String, required: true, unique: true }, // 👈 Add this

    _id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    imageUrl: { type: String, required: true },
    cartItems: { type: Object, default: {} },

}, { minimize: false });

const User = mongoose.models.user || mongoose.model("user", userSchema);
export default User;