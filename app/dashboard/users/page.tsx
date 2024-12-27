import { link } from 'fs';
import React from 'react';
import ListUsers from '../../components/ListUsers';
import { fetchUsers } from '@/app/libs/fetchUsers';

type User = {
  id: number;
  name: string;
  email: string;
};
async function Users() {
  let { users }: User = await fetchUsers();
  return (
    <div className='flex flex-col text-start'>
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
