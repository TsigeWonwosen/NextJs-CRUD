import { wait } from '@/app/utils/wait';
import React from 'react';

export default async function NotificationPage() {
  await wait(7000);

  return <div>NotificationPage</div>;
}
