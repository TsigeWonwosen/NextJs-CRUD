import React from 'react';
import Link from 'next/link';
import { wait } from '@/app/utils/wait';
import ListUsers from '@/app/components/ListUsers';

type User = {
  id: number;
  name: string;
  email: string;
};
async function UsersDefault() {
  let { users }: User = await getData();
  return (
    <div className='flex flex-col text-start'>
      <h3>Default</h3>
      {users?.map((user: User) => (
        <ListUsers
          key={user.id}
          {...user}
        />
      ))}
    </div>
  );
}

export default Users;

// This function runs on the server before the page is rendered.
export async function getData() {
  const res = await fetch('http://localhost:3000/users/api', { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}
