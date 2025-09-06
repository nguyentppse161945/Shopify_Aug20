import connectDB from '@/config/db';
import User from '@/models/User';
import { getAuth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server';

export async function POST(request) {

    try {
        const { userId } = getAuth(request)
        const { cartData } = await request.json()

        await connectDB();
        const user = await User.findById(userId);
        user.cartItems = cartData;
        console.log("🛒 Updating cartData:", cartData);
        //the save below is not reach or working
        if (!user) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
        }
        console.log("UserId:", userId);
        const savedUser =  await user.save();
        if (!savedUser) {
            console.error("❌ Failed to save cartData for user:", userId);
            return NextResponse.json(
                { success: false, message: "Failed to save cart data" },
                { status: 500 }
            );
        }
        console.log("✅ Cart updated successfully for user:", user._id);
        return NextResponse.json({ success: true });

    }
    catch (error) {
        return NextResponse.json({ success: false, message: error.message })
    }
}
