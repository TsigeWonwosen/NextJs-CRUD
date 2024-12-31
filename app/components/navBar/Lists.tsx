'use client';
import React  from 'react';
import Link from 'next/link';
import { navLists } from './navLists';
import Links from './Links';
import styles from './nav.module.css';
import { getSession, signOut, useSession } from 'next-auth/react';
import LogoutForm from '../LogoutForm';

const Lists = () => {

  const { data: session } = useSession();

  return (
    <div className='px-10 py-8 flex justify-between items-center h-25 w-full'>
      <Link
        href='/dashboard'
        className='hover:text-white'
      >
        Dashboard
      </Link>
      <ul className='flex justify-center w-auto text-center space-x-2'>
        {navLists?.map((list) => (
          <Links
            {...list}
            key={list.name}
          />
        ))}
        {session?.user ? (
          <>
            {session?.user?.role ==="Admin" ? (
                 <>
                <Links
                  name='Admin'
                  path='/admin'
               />
                <LogoutForm />
              </>
                )
              :(<LogoutForm />)
            }
          </>
        ) : (
          <Links
            name='Login'
            path='/login'
          />
        )}
      </ul>
    </div>
  );
};

export default Lists;
