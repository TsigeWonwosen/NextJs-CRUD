// import mongoose from "mongoose";

// const MONGODB_URI = process.env.MONGODB_URI as string;

// const connection = {};
// async function connectToDatabase() {
//   try {
//     if (connection && connection?.isConnected) {
//       console.log("Use Existing Connection");
//       return;
//     }

//     const db = await mongoose.connect(MONGODB_URI);

//     connection.isConnected = (await db).connections[0].readyState;
//   } catch (error) {
//     console.log("Connection Error");
//   }
// }

// export default connectToDatabase;

import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("⚠️ MongoDB URI is missing in environment variables");
}

let isConnected = false; // Track connection status

const connectToDatabase = async () => {
  if (isConnected) {
    console.log("✅ Using existing MongoDB connection");
    return;
  }

  try {
    const db = await mongoose.connect(MONGODB_URI, {
      dbName: "dashboard",
    });

    isConnected = db.connections[0].readyState === 1;
    console.log("🚀 Connected to MongoDB Atlas");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
  }
};

export default connectToDatabase;
