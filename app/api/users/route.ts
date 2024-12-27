import User from '@/app/models/userModel';
import connectToDatabase from '@/app/utils/mongoose';
import { NextResponse } from 'next/server';

// GET Request Handler (Fetching data)
export async function GET(request) {
  await connectToDatabase();
  try {
    const users = await User.find({});

    return NextResponse.json({ users });
  } catch (error) {
    return NextResponse.json({ error: 'Error Connect DB.' });
  }
}

// POST Request Handler (Creating data)
export async function POST(request) {
  // Parse the request body as JSON
  await connectToDatabase();

  const body = await request.json();
  const { name, email } = body;

  // Simulate saving to a database (mock response)

  const newUser = User.create({ name, email });

  return NextResponse.json({ message: 'User created', user: newUser });
}

// PUT Request Handler (Updating data)
export async function PUT(request) {
  const body = await request.json();
  const { id, name, email } = body;

  // Simulate updating the user in a database
  const updatedUser = { id, name, email };

  return NextResponse.json({ message: 'User updated', user: updatedUser });
}

// DELETE Request Handler (Deleting data)
export async function DELETE(request) {
  // In a real-world scenario, you would extract the user id from the request
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  // Simulate deletion from a database
  return NextResponse.json({ message: `User with id ${id} deleted` });
}
