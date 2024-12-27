'use client';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React from 'react';
import { getData } from '../page';

async function page() {
  const params = useParams();
  const { users } = await getData();
  let filteredUser = await users.find((user) => user.id === parseInt(params.id));
  return (
    <div className='flex flex-col text-center'>
      Selected Id : {params.id}
      <h5>Name :{filteredUser.name}</h5>
      <p>Email : {filteredUser.email}</p>
      <Link href='/users'>Go Back</Link>
    </div>
  );
}

export default page;
