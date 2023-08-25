/**
 * We use prisma as our sql oem
 * dont ever initialize another PrismaClient
 * use this or preferably use Cookies (with consent) for temps
 */


import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createUser = async (email: string, uid: string) => {
    try {
        const user = await prisma.users.create({
            data: {
                user_id: uid,
                email: email,
                last_online: new Date(),
                blocklist: [],
            },
        });
        return user;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

// TODO: add function to update last_online on every logins 

export default prisma;
