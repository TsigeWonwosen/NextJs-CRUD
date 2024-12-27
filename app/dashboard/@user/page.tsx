'use server';
import Link from 'next/link';
import { wait } from '@/app/utils/wait';
import ListUsers from '@/app/components/ListUsers';
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
      {users.length &&
        users?.map((user: User) => (
          <ListUsers
            key={user.id}
            {...user}
          />
        ))}
    </div>
  );
}

export default Users;
