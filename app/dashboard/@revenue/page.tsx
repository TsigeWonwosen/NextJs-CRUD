import { wait } from '@/app/utils/wait';
import React from 'react';

export default async function RevenuePage() {
  try {
    await wait(3000);
  } catch (error) {
    throw new Error('Error fetch data');
  }

  return <div>RevenuePage</div>;
}
