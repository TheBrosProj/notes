import { NextApiRequest, NextApiResponse } from 'next';
import { createUser } from '@/lib/prisma';

type NextApiRequestWithUser = NextApiRequest & {
  user: {
    email: string;
    uid: string;
  };
};

// create user entry in database

const createUserHandler = async (
  req: NextApiRequestWithUser,
  res: NextApiResponse
) => {
  try {
    const { email, uid } = req.body.user;

    if (!email || !uid) {
      return res.status(400).json({ error: 'Invalid data' });
    }
    console.log(email);
    console.log(uid);
    const user = await createUser(email, uid);

    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Error creating user' });
  }
};

export default createUserHandler;
