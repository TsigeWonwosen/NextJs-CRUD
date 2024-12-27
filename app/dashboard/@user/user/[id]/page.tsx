'use client';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { fetchUsers } from '@/app/libs/fetchUsers';

async function page() {
  const params = useParams();
  const { users } = await fetchUsers();
  let filteredUser = await users.find((user) => user.id === parseInt(params.id));
  return (
    <div className='flex flex-col text-center'>
      <h5>Name :{filteredUser.name}</h5>
      <p>Email : {filteredUser.email}</p>
      <Link href='/dashboard'>Go Back</Link>
    </div>
  );
}

export default page;
