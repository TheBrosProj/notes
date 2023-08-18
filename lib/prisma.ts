import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createUser = async (email: string, uid: string) => {
    try {
        const user = await prisma.users.create({
            data: {
                user_id: uid,
                email: email,
                last_online: new Date(),
                blocklist: ['google.com'],
            },
        });
        return user;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

export default prisma;
