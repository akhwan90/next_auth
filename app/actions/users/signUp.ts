'use server';

import prisma from "@/app/lib/prisma";
import bcrypt from 'bcryptjs';

export const signUp = async (email: string, password: string) => {
    const user = await prisma.user.findUnique({
        where: {
            email,
        }
    });

    if (email.length < 3) {
        return "Email tidak valid";
    }

    if(user) {
        return "Email telah digunakan";
    }

    const passwordHash = bcrypt.hashSync(password, 10);

    await prisma.user.create({
        data: {
            email: email,
            password: passwordHash,
        }
    });

    return "User berhasil dibuat";
}