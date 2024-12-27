import React from 'react';

export default function Card({ children }) {
  return <section className='min-h-70 min-w-60  h-full w-full flex justify-center items-center rounded-md p-20  bg-zinc-900'>{children}</section>;
}
