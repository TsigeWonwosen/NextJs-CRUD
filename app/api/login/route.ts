import connectToDatabase from '@/app/utils/mongoose';
import { signIn } from 'next-auth/react';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  // Parse the request body as JSON
  // await connectToDatabase();

  const body = await request.json();
  const { username, password } = body;

  if (username) {
    return NextResponse.json({ success: true, message: 'Logged in successfully', user: { username, password } });
  } else {
    return NextResponse.json({ success: false, message: 'Invalid credentials' });
  }
}
