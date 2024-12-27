import { NextResponse } from 'next/server';

// GET Request Handler (Fetching data)
export async function GET(request) {
  // Simulate fetching users from a database or any other data source
  const newUsers = await fetch('https://jsonplaceholder.typicode.com/users');
  const users = await newUsers.json();

  // Respond with JSON data
  return NextResponse.json({ users });
}

// POST Request Handler (Creating data)
export async function POST(request) {
  // Parse the request body as JSON
  const body = await request.json();
  const { name, email } = body;

  // Simulate saving to a database (mock response)
  const newUser = { id: Date.now(), name, email };

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
