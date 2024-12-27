import Link from 'next/link';
import React from 'react';

function ListUsers({ id, name, email }) {
  return (
    <Link
      href={`/dashboard/user/${id}`}
      className='list-none text-left'
    >
      {name}
    </Link>
  );
}

export default ListUsers;
