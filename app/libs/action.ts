"use server";

import { revalidatePath } from "next/cache";
import { Staff } from "../models/userModel";
import connectToDatabase from "../utils/mongoose";
import { signOut } from "next-auth/react";
import { StaffType } from "./types";

export const login = async (prevState: string, formData: FormData) => {
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
  } catch (err: any) {
    if (err.message.includes("CredentialsSignin")) {
      return { error: "Invalid username or password" };
    }
    throw err;
  }
};

export const sighOut = async () => {
  await signOut();
};

type UserType = {
  username: string;
  email: string;
  password: string;
  role: string;
};
// ADD staff to the database
export const addUser = async (
  prevState: { error?: string | null; success?: boolean | null } | null,
  formData: UserType,
): Promise<{ error: string | null; success: boolean | null } | null> => {
  try {
    await connectToDatabase();

    // let { username, email, password, role } = Object.fromEntries(formData);
    let { username, email, password, role } = formData;
    const user = await Staff.findOne({ email });
    if (user) {
      return { error: "User already exists", success: false };
    }
    if (typeof username === "string") {
      username = username.toLowerCase();
    }

    const newStaff = new Staff({ username, email, password, role });
    await newStaff.save();

    revalidatePath("/admin");
    revalidatePath("/services");
    return { success: true, error: null };
  } catch (error) {
    return { error: "Invalid username or password", success: false };
  }
};

export const getStaffs = async () => {
  try {
    await connectToDatabase();
    const users: StaffType[] | any = await Staff.find().lean();

    console.log("Users", users);
    let serializedData = await users.sort((a: any, b: any) => {
      return b.createdAt - a.createdAt;
    });

    // Serialize the data for client
    serializedData = users.map((item: StaffType) => ({
      ...item,
      _id: item?._id.toString(),
    }));

    if (!users) {
      return { error: "No staff found" };
    }

    return serializedData;
  } catch (error) {
    return { error: "Error finding user." };
  }
};

export const deleteStaff = async (
  formData: FormData,
): Promise<{ error: string | null } | null | undefined> => {
  try {
    await connectToDatabase();

    const { _id } = Object.fromEntries(formData);
    const user: StaffType | any = await Staff.findOne({ _id });

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
