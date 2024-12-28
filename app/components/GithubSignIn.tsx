'use client';

import React from 'react';
import { signIn } from 'next-auth/react'; // Import the signIn function
import { useRouter } from 'next/router';
import { revalidatePath } from 'next/cache';

export default function GithubSignIn() {
  const navigate = useRouter;
  const handleSignIn = async () => {
    try {
      console.log('Initiating GitHub Sign-In...');
      await signIn('github');
      revalidatePath('/');
      navigate.push('/'); // Triggers GitHub authentication
    } catch (error) {
      console.error('GitHub Sign-In Failed:', error);
    }
  };

  return (
    <form>
      <button
        type='button'
        className='p-3 bg-lime-500 text-white rounded hover:bg-lime-600'
        onClick={handleSignIn}
      >
        Login With GitHub
      </button>
    </form>
  );
}
