import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import prisma from '@/lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { auth_id } = req.query;

  if (req.method === 'GET') {
    try {
      const notes = await prisma.notes.findMany({
        where: {
          user_id: auth_id as string,
        },
      });

      res.status(200).json(notes);
    } catch (error) {
      console.error('Error fetching notes', error);
      res.status(500).end();
    }
  } else if (req.method === 'POST') {
    const { details, src } = req.body;
    try {
      const newNote = await prisma.notes.create({
        data: {
          user_id: auth_id as string,
          details,
          src,
        },
      });

      res.status(201).json(newNote);
    } catch (error) {
      console.error('Error adding note', error);
      res.status(500).end();
    }
  } else if (req.method === 'DELETE') {
    const { note_id } = req.body;
    try {
      await prisma.notes.delete({
        where: {
          id: parseInt(note_id as string),
        },
      });

      res.status(204).end();
    } catch (error) {
      console.error('Error deleting note', error);
      res.status(500).end();
    }
  } else {
    res.status(405).end();
  }
}
