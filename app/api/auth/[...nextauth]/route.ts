import prisma from "@/app/lib/prisma";
import { AuthOptions } from "next-auth";
import { CredentialsProvider } from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'text',
                    placeholder: 'your@email.com',
                },
                password: {
                    label: 'Password',
                    type: 'password'
                }
            },
            authorize: async (credentials) => {
                if (!credentials) {
                    return null;
                }

                const { email, password } = credentials;

                const user = await prisma.user.findUnique({
                    where: {
                        email
                    }
                });

                if (!user) {
                    return null;
                }

                const userPassword = user.password;
                const isValidPassword = bcrypt.compareSync(password, userPassword);

                if (!isValidPassword) {
                    return null;
                }

                return user;
            }
        })
    ],
    pages: {
        signIn: '/auth/signin',
        signOut: '/auth/signout',
    },
    secret: process.env.NEXTAUTH_SECRET,
    jwt: {
        async encode({secret, token}) {
            if (!token) {
                throw new Error("No token to encode");
            }

            return jwt.sign(token, secret);
        },
        async decode({secret, token}) {
            if (!token) {
                throw new Error("No token to decode");
            }

            const decodedToken = jwt.verify(token, secret);
            if (typeof decodedToken === 'string') {
                return JSON.parse(decodedToken)
            } else {
                return decodedToken;
            }
        }
    },
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60,
        updateAge: 24 * 60 * 60,
    }
}