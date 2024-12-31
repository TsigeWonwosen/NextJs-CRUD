'use server';

import { revalidatePath } from 'next/cache';
// import { Post, User } from './models';
// import { connectToDb } from './utils';
// import { signIn, signOut } from './auth';
import bcrypt from 'bcryptjs';
import User from '../models/userModel';
import connectToDatabase from '../utils/mongoose';
import { signIn } from 'next-auth/react';

export const login = async (prevState, formData) => {
  const { username, password } = Object.fromEntries(formData);

  try {
    const response = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
      credentials: 'include', // Ensures cookies are handled correctly
    });
    if (!response.ok) {
      return { error: 'Invalid username or password' };
    }
    const result = await response.json();
    console.log('Result: ', result);

    return { success: true, result };
  } catch (err) {
    console.log(err);

    if (err.message.includes('CredentialsSignin')) {
      return { error: 'Invalid username or password' };
    }
    throw err;
  }
};

export const sighOut = async () => {
  await signOut();
};

export const addUser = async (formData) => {
  await connectToDatabase();
  const name = formData.get('name');
  const email = formData.get('email');

  const newUser = new User({ name, email });
  await newUser.save();
};

export const handleSignIn = async () => {
  console.log('From Login Server Action.');
  // await signIn('github', { callbackUrl: '/' });
};

export const deleteUser = async () => {
  return true;
};
