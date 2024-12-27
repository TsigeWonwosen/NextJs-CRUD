'use client';

import React from 'react';
import { signIn } from 'next-auth/react';

export default async function GithubSignIn() {
  console.log('Clicked.');

  const handleSignIn = () => {
    console.log('From Client Component.');
    signIn('github', { callbackUrl: '/' });
  };
  return (
    <div>
      <form onSubmit={handleSignIn}>
        <button
          type='submit'
          className='p-3 bg-lime-500'
        >
          Login With Github
        </button>
      </form>
    </div>
  );
}
