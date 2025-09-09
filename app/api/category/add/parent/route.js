import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import authSeller from "@/lib/authSeller";
import ParentCategory from "@/models/ParentCategory";

export async function POST(request) {
  try {
    const { userId } = getAuth(request);
    const isSeller = await authSeller(userId);
    if (!isSeller) {
      return NextResponse.json(
        { success: false, message: "You are not authorized to perform this action" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { name } = body;

    if (!name || name.trim() === "") {
      return NextResponse.json(
        { success: false, message: "Parent category name is required" },
        { status: 400 }
      );
    }

    await connectDB();

    // check duplicate
    const exists = await ParentCategory.findOne({ name: name.trim() });
    if (exists) {
      return NextResponse.json(
        { success: false, message: "Parent category already exists" },
        { status: 400 }
      );
    }

    const newParentCategory = await ParentCategory.create({
      name: name.trim(),
    });

    return NextResponse.json(
      { success: true, message: "Parent category created successfully", category: newParentCategory },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
