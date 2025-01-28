import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import prismadb from '@/lib/prismadb';
import { compare } from 'bcryptjs';
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from 'next-auth/providers/google';
import {PrismaAdapter} from '@next-auth/prisma-adapter';
export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID || '',
            clientSecret: process.env.GOOGLE_SECRET || '',
            authorization: {
                params: {
                  prompt: "consent",
                  access_type: "offline",
                  response_type: "code"
                }
            }
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID ||'',
            clientSecret: process.env.GITHUB_SECRET || ''
          }),
        Credentials({
            id: 'credentials',
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) {
                    throw new Error("Email and Password Required");
                }

                const user = await prismadb.user.findUnique({
                    where: { email: credentials.email }
                });

                if (!user || !user.hashedPassword) {
                    throw new Error("Email does not exist");
                }

                const isCorrectPassword = await compare(
                    credentials.password,
                    user.hashedPassword
                );

                if (!isCorrectPassword) {
                    throw new Error('Incorrect password');
                }

                return user;
            }
        })
    ],
    pages: {
        signIn: '/auth',
    },
    debug: process.env.NODE_ENV !== 'production',
    adapter: PrismaAdapter(prismadb),
    session: {
        strategy: 'jwt'
    },
    jwt: {
        secret: process.env.NEXTAUTH_JWT_SECRET,
    },
    secret: process.env.NEXTAUTH_SECRET,
});
