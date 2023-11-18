import { compare } from 'bcrypt';
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "./db";


export const authOptions:NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_URL,
    pages: {
        signIn: '/login'
    },
    providers: [
        CredentialsProvider({
          name: "Credentials",
          credentials: {
            email: { label: "Email", type: "text", placeholder: "ksawery@mail.com" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials) {
            if(!credentials?.email || !credentials.password){
                return null
            }

            const existingUser = await prisma.users.findUnique({where: {email: credentials?.email}})
            if(!existingUser){
                return null
            }

            const passwordMatch = await compare(credentials.password, existingUser.password)
            if(!passwordMatch){
                return null
            }

            return {
                id: existingUser.id.toString(),
                username: existingUser.username,
                email: existingUser.email
            }
          }
        })
    ],
    callbacks: {
        async jwt({token, user, session}){
            if (user){
                return {
                    ...token,
                    id: user.id,
                    // username: user.username,
                }
            }
            return token
        },
        async session({ session, user, token }){
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    username: token.username
                }
            }
        }
    }
}
