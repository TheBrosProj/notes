import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

// Import your database functions or Prisma client here
// For example, if you're using Prisma:
const prisma = new PrismaClient();

type Todo = {
  id: number;
  user_id: string;
  details: string | null;
  state: string | null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Todo[]>
) {
  if (req.method !== 'GET') {
    return res.status(405).json([]);
  }
  let {auth_id} = req.query; 

  // Replace the following with your logic to fetch todos based on auth_id
  try {
    // Assuming you're using Prisma
    // const todos = await prisma.todos.findMany({
    //   where: {
    //     auth_id: auth_id,
    //   },
    // });

    // Mock data for demonstration purposes
    const todos: Todo[] = [
      { id: 1, user_id: 'example_auth_id', details: 'Todo 1', state: 'active' },
      { id: 2, user_id: 'example_auth_id', details: 'Todo 2', state: 'completed' },
    ];

    res.status(200).json(todos);
  } catch (error) {
    console.error('Error fetching todos', error);
    res.status(500).json([]);
  }
}
