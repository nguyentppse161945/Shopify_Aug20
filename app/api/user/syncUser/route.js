
// import connectDB from "@/config/db";
// import User from "@/models/User";
// import { currentUser } from "@clerk/nextjs/server";


// export async function GET() {
  
//   await connectDB();

//   const clerkUser = await currentUser(); // Clerk’s active user

//   if (!clerkUser) {
//     return Response.json({ message: "No Clerk user" }, { status: 401 });
//   }

//   // Save or update MongoDB record
//   const user = await User.findOneAndUpdate(
//     { _id: clerkUser.id },
//     {
//      name: clerkUser.firstName + "" +clerkUser.lastName || "No Name" ,
//      email: clerkUser.emailAddresses[0].emailAddress ,
//      imageUrl: clerkUser.imageUrl || "non" ,
//      cartItems: clerkUser.cartItems || {} ,
//     },
//     { upsert: true, new: true }
//   );
//     return Response.json({ ok: true });

// }

