import { Options } from '@/app/libs/auth';
import { getServerSession } from 'next-auth';

async function Services() {
  const session = await getServerSession(Options);
  if (!session) {
    console.log('Please Login ');
  }
  session && console.log('Session -> ' + session?.user?.email);
  return <div>Services</div>;
}

export default Services;
