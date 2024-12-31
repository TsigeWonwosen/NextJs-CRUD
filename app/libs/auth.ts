import type { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProviders from 'next-auth/providers/google';
import CredentialsProvider  from 'next-auth/providers/credentials';

export const Options: NextAuthOptions = {
  providers: [
    GoogleProviders({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    CredentialsProvider({
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
        const { username, password } = credentials;

        const userInfos:{id:string,email:string,name:string,password:string,isAdmin:boolean}[] =[ { id: '1', email: 'wondeshi@gmail.com', name: 'wondeshi', password: 'wonde', role: 'Admin' },
          { id: '2', email: 'wondwosen.shi@gmail.com', name: 'wondwosen', password: 'wonde', role: 'Developer' },
          { id: '3', email: 'chuchu@gmail.com', name: 'chuchu', password: 'wonde', role: 'Guest' },
        ];

        const user = await userInfos.findIndex((user) => user.name === username && user.password === password);
        console.log("User db: ",user)
        if (user !== -1) {
          return userInfos[user];
        } else {
          return null;
        }
      },
    }),
  ],

  // Custom session behavior
  session: {
    strategy: 'jwt', // Ensure you're using the 'jwt' strategy if required
  },

  // Optional: Include custom logic on sign in
  callbacks: {
    async signIn({ user, account, profile }) {
      // This callback is optional for custom logic during sign-in
      return true; // Allow sign-in
    },
    async jwt({ token, user}) {
      
      if (user) {
        token.id= user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user?.email === 'wondwosen.shi@gmail.com' ? 'Admin' : 'GitHub user';
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id:token.id, 
        name: token.name, 
        email: token.email, 
        role: token.role,
      };  

      console.log('Session :', session);
      return session;
    },
  },

  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
      },
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
};
