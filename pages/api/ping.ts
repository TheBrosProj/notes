// This is present for illustration 
// and might be used to check for active internet connection
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  online: boolean
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ online : true })
}
