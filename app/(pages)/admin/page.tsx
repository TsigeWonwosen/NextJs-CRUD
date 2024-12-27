'use client';
import React from 'react';
import { addUser } from '@/app/libs/action';
import styles from './admin.module.css';
import { getSession, signIn } from 'next-auth/react';

async function Admin() {
  const handleLoginWithGithub = () => {
    signIn('github', { callbackUrl: '/' });
  };

  const session = await getSession();
  console.log('session : ' + session);

  return (
    <div className={styles.container}>
      <h2>Add Users</h2>
      <button onClick={handleLoginWithGithub}>Login With GitHub</button>
      <form action={addUser}>
        <input
          type='text'
          name='name'
        />
        <input
          type='text'
          name='email'
        />
        <button type='submit'> Add User</button>
      </form>
    </div>
  );
}

export default Admin;
