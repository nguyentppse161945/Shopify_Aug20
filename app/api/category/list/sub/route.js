//get category here
import Category from "@/models/Category";
import { NextResponse } from "next/server";
import connectDB from "@/config/db";

export async function GET(request) {
    try {


        await connectDB();
        const categories = await Category.find({});
        return NextResponse.json({ success: true, categories });
    }
    catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
} 