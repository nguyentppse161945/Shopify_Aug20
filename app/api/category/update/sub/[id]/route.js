// update category api 
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import authSeller from "@/lib/authSeller";
import Category from "@/models/Category";

export async function PUT(request, { params }) {
  try {
    const { userId } = getAuth(request);
    const isSeller = await authSeller(userId);
    if (!isSeller) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 403 }
      );
    }
    const { id } = await params;

    const { name } = await request.json();
    if (!name?.trim()) {
      return NextResponse.json(
        { success: false, message: "Category name is required" },
        { status: 400 }
      );
    }

    await connectDB();

    const exists = await Category.findOne({
      name: name.trim(),
      _id: { $ne: id }
    });
    if (exists) {
      return NextResponse.json(
        { success: false, message: "Another category with this name already exists" },
        { status: 400 }
      );
    }
    // extract category id from URL params

    const category = await Category.findByIdAndUpdate(
      id,
      { name: name.trim() },
      { new: true } // return updated doc
    );

    if (!category) {
      return NextResponse.json(
        { success: false, message: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Category updated successfully", category },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
