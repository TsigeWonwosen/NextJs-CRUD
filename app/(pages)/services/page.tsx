import { Options } from '@/app/libs/auth';
import { getServerSession } from 'next-auth';

async function Services() {
  const session = await getServerSession(Options);
 
  return <div>Services</div>;
}

export default Services;
