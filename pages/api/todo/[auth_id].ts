import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // auth_id is used as query instead of body for convience in our other projects
  // where showing we might not even use body for apis. 
  const { auth_id } = req.query;
// get todos
  if (req.method === 'GET') {
    try {
      const todos = await prisma.todos.findMany({
        where: {
          user_id: auth_id as string,
        },
      });

      res.status(200).json(todos);
    } catch (error) {
      console.error('Error fetching todos', error);
      res.status(500).end();
    }
  } 
  // create todo
  else if (req.method === 'POST') {
    const { details, state } = req.body;
    try {
      const newTodo = await prisma.todos.create({
        data: {
          user_id: auth_id as string,
          details,
          state,
        },
      });

      res.status(201).json(newTodo);
    } catch (error) {
      console.error('Error adding todo', error);
      res.status(500).end();
    }
  }
  // delete todo
  else if (req.method === 'DELETE') {
    const { todo_id } = req.body;
    try {
      await prisma.todos.delete({
        where: {
          id: parseInt(todo_id as string),
        },
      });

      res.status(204).end();
    } catch (error) {
      console.error('Error deleting todo', error);
      res.status(500).end();
    }
  } 
  // update todo state
  else if (req.method === 'PUT') {
    const { todo_id, state } = req.body;
    try {
      const updatedTodo = await prisma.todos.update({
        where: {
          id: parseInt(todo_id as string),
        },
        data: {
          state,
        },
      });

      res.status(200).json(updatedTodo);
    } catch (error) {
      console.error('Error updating todo', error);
      res.status(500).end();
    }
  }
  // bad request
  else {
    res.status(405).end();
  }
}