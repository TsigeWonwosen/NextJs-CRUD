import type { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import GithubProvider from 'next-auth/providers/github';
import GoogleProviders from 'next-auth/providers/google';
import EmailProviders from 'next-auth/providers/credentials';

export const Options: NextAuthOptions = {
  providers: [
    GoogleProviders({
      profile(profile) {
        console.log('profile  GitHub: ' + profile);
        console.log('Auth Working ');
        let userRole = 'Google user';

        if (profile?.email == 'wondwosen.shi@gamil.com') {
          userRole = 'admin';
        }
        return { ...profile, id: profile.sub, role: userRole };
      },
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({
      profile(profile) {
        console.log('profile  GitHub: ' + profile);
        let userRole = 'GitHub user';

        if (profile?.email == 'wondwosen.shi@gamil.com') {
          userRole = 'admin';
        }
        return { ...profile, role: userRole };
      },
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    EmailProviders({
      name: 'Credentials',
      credentials: {
        username: {
          label: 'Username:',
          type: 'text',
          placeholder: 'your-cool-username',
        },
        password: {
          label: 'Password:',
          type: 'password',
          placeholder: 'your-awesome-password',
        },
      },
      async authorize(credentials) {
        // This is where you need to retrieve user data
        // to verify with credentials
        // Docs: https://next-auth.js.org/configuration/providers/credentials
        const user = { id: '42', email: 'wondeshi@gmail.com', name: 'wondeshi', password: 'wonde', isAdmin: true };

        if (credentials?.username === user.name && credentials?.password === user.password) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],

  // Custom session behavior
  // session: {
  //   strategy: 'jwt', // Ensure you're using the 'jwt' strategy if required
  // },

  // Optional: Include custom logic on sign in
  callbacks: {
    async jwt({ token, user, account, profile }) {
      console.log('JWT Token:', token);
      console.log('User:', user);
      console.log('Account:', account);
      console.log('Profile:', profile);
      return token;
    },
    async session({ session, token }) {
      console.log('Session Token:', token);
      console.log('Session :', session);
      session.user.id = token.sub; // Ensure sub is set
      return session;
    },
  },

  // Configure custom pages
  // pages: {
  //   signIn: '/auth/signin', // Custom sign-in page
  //   signOut: '/auth/signout',
  //   error: '/auth/error', // Error page
  //   verifyRequest: '/auth/verify-request', // Verification request
  //   newUser: null, // Disabled new users page
  // },
  secret: process.env.NEXTAUTH_SECRET,
};
