"use server";

import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { User, Staff } from "../models/userModel";
import connectToDatabase from "../utils/mongoose";
import { signIn, signOut } from "next-auth/react";
import superjson from "superjson";
import Users from "../dashboard/@user/default";

export const login = async (prevState, formData) => {
  const { username, password } = Object.fromEntries(formData);

  try {
    const response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
      credentials: "include", // Ensures cookies are handled correctly
    });
    if (!response.ok) {
      return { error: "Invalid username or password" };
    }
    const result = await response.json();

    return { success: true, result };
  } catch (err) {
    if (err.message.includes("CredentialsSignin")) {
      return { error: "Invalid username or password" };
    }
    throw err;
  }
};

export const sighOut = async () => {
  await signOut();
};

// ADD staff to the database
export const addUser = async (prevState, formData: FormData) => {
  try {
    await connectToDatabase();

    await new Promise((resolve) => setTimeout(resolve, 2000));
    const { username, email, password, role } = Object.fromEntries(formData);
    const user = await Staff.findOne({ email });
    if (user) {
      return { error: "User already exists" };
    }
    const newStaff = new Staff({ username, email, password, role });
    await newStaff.save();

    revalidatePath("/admin");
    revalidatePath("/services");
  } catch (error) {
    return { error: "Invalid username or password" };
  }
};

export const getStaffs = async () => {
  try {
    await connectToDatabase();
    const users = await Staff.find().lean();

    // Serialize the data for client
    const serializedData = users.map((item) => ({
      ...item,
      _id: item._id.toString(),
    }));

    if (!users) {
      return { error: "No staff found" };
    }

    return serializedData;
  } catch (error) {
    return { error: "Error finding user." };
  }
};

export const deleteStaff = async (formData: FormData) => {
  try {
    await connectToDatabase();

    const { _id } = Object.fromEntries(formData);
    const user = await Staff.findOne({ _id });
    console.log("User : ", user);

    if (!user) {
      return { error: "User not found" };
    }

    await Staff.findByIdAndDelete({ _id });
    revalidatePath("/services");
    revalidatePath("/admin");
  } catch (error) {
    return { error: "Error deleting user." };
  }
};

export const handleSignIn = async () => {
  console.log("From Login Server Action.");
  // await signIn('github', { callbackUrl: '/' });
};

export const deleteUser = async () => {
  return true;
};
