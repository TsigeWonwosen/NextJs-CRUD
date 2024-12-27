//export {GET,POST} from '@/lib/auth'

import { Options } from '@/app/libs/auth';
import NextAuth from 'next-auth';

// import {Options} from "./"
const handler = NextAuth(Options);

export { handler as GET, handler as POST };
