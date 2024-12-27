import React from 'react';
import { signOut } from 'next-auth/react';
import { revalidatePath } from 'next/cache';

function LogoutForm() {
  const handleLogout = async (event) => {
    event.preventDefault(); // Prevent form default behavior
    await signOut(); // Perform logout
    revalidatePath('/');
  };

  return (
    <form onSubmit={handleLogout}>
      <button type='submit'>Logout</button>
    </form>
  );
}

export default LogoutForm;
