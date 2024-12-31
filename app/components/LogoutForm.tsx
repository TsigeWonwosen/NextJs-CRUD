import React from 'react';
import { signOut } from 'next-auth/react';
import { revalidatePath } from 'next/cache';

function LogoutForm() {
  const handleLogout = async (even:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent form default behavior
    await signOut(); // Perform logout
    revalidatePath('/');
  };

  return (
    <form onSubmit={handleLogout} className='flex center hover:text-gray-200'>
      <button type='submit' className='navButton'>Logout</button>
    </form>
  );
}

export default LogoutForm;
