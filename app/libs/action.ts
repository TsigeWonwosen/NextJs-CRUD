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
    await signIn('credentials', { username, password });
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
  await signIn('github', { callbackUrl: '/' });
};

export const addUser = async () => {
  return true;
};
