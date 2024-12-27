import userModel from '@/app/models/userModel';
import connectToDatabase from '@/app/utils/mongoose';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const { id } = params;
  await connectToDatabase();
  try {
    const users = await userModel.findById(id);

    return NextResponse.json({ users });
  } catch (error) {
    return NextResponse.json({ error: 'Error Connect DB.' });
  }
}
