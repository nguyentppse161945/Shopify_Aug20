// import mongoose from "mongoose";

// let cached = global.mongoose;

// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null };
// }

// async function connectDB() {
//   if (cached.conn) {
//     return cached.conn;
//   }

//   if (!cached.promise) {
//     const opts = {
//       bufferCommands: false,
//     };

//     // Reuse the existing connection if it's already open
//     cached.promise = mongoose.connect(process.env.MONGODB_URI, opts).then((mongoose) => {
//       if(mongoose.connection.name != "shopify"){
//         throw new Error("Connected to the wrong database. Expected 'shopify' database.");
//       }
//       console.log("✅ Connected to DB:", mongoose.connection.name); // should log "shopify"

//       return mongoose;
//     });
//   }

//   cached.conn = await cached.promise;
//   return cached.conn;
// }

// export default connectDB;
import mongoose from "mongoose";

let isConnected = false;

export default async function connectDB() {
  if (isConnected) return;

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = conn.connections[0].readyState === 1;
    console.log("✅ MongoDB Connected:", conn.connection.name);
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
  }
}
