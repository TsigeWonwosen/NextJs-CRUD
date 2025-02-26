import { NextResponse } from "next/server";
import { isValidObjectId } from "mongoose";

import connectToDatabase from "@/app/utils/mongoose";
import { User } from "@/app/models/userModel";

export async function GET(
  request: Request,
  {
    params: { id },
  }: {
    params: { id: string };
  },
) {
  const userId = id;

  // Validate the user ID format
  if (!isValidObjectId(userId)) {
    return NextResponse.json(
      { error: "Invalid user ID format" },
      { status: 400 },
    );
  }

  try {
    // Connect to the database
    await connectToDatabase();

    // Find the user by ID
    const user = await User.findById(userId);

    // Check if the user exists
    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    // Return the user
    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Error connecting to the database." },
      { status: 500 },
    );
  }
}
