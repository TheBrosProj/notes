import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { auth_id } = req.query;
    if (req.method === 'GET') {

        try {
            const user = await prisma.users.findUnique({
                where: { user_id: auth_id as string },
            });

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            return res.status(200).json(user.blocklist);
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' });
        }
    } else if (req.method === 'PUT') {
        const { blocklist } = req.body;

        try {
            // Update the user's blocklist
            const updatedUser = await prisma.users.update({
                where: { user_id: auth_id as string },
                data: { blocklist },
            });

            return res.status(200).json(updatedUser);
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' });
        }
    } else if (req.method === 'DELETE') {
        const { item } = req.body;

        try {
            const user = await prisma.users.findUnique({
                where: { user_id: auth_id as string },
            });

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            const updatedBlocklist = user.blocklist.filter((blocklistItem) => blocklistItem !== item);

            const updatedUser = await prisma.users.update({
                where: { user_id: auth_id as string },
                data: { blocklist: updatedBlocklist },
            });

            return res.status(200).json(updatedUser);
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        return res.status(405).json({ error: 'Method not allowed' });
    }
};

export default handler;
