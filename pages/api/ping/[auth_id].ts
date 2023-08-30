import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // auth_id is used as query instead of body for convience in our other projects
  // where showing we might not even use body for apis. 
  const { auth_id } = req.query;
  // get notes
  if (req.method === 'GET') {
    try {
      const user_data = await prisma.users.update({
        where: {
          user_id: auth_id as string,
        },
        data: {
          last_online: new Date()
        },
      });
      res.status(200).json(user_data);
    } catch (error) {
      console.error('Error updating time', error);
      res.status(500).end();
    }
  }
  // bad request
  else {
    res.status(405).end();
  }
}
