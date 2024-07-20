import { readData, writeData } from '@/utils/data'
import { NextApiRequest, NextApiResponse } from 'next'
import { User } from '@/types'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  switch (method) {
    case 'GET':
      return handleGet(req, res)
    case 'DELETE':
      return handleDelete(req, res)
    case 'PUT':
      return handleUpdate(req, res)
    default:
      res.setHeader('Allow', ['GET', 'DELETE', 'PUT'])
      return res.status(405).end(`Method ${method} Not Allowed`)
  }
}

const handleGet = (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query
  const data = readData()
  const user = data.users.find((user: User) => user.id === id)
  if (user) {
    res.status(200).json(user)
  } else {
    res.status(404).json({ message: 'User not found' })
  }
}

const handleDelete = (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query
  let data = readData()
  const userIndex = data.users.findIndex((user: User) => user.id === id)
  if (userIndex !== -1) {
    data.users.splice(userIndex, 1)
    writeData(data)
    res.status(200).json({ message: `User ${id} deleted` })
  } else {
    res.status(404).json({ message: 'User not found' })
  }
}

const handleUpdate = (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query
  const { name, email } = req.body
  if (!name || !email) {
    return res.status(400).json({ message: 'Missing user data' })
  }
  let data = readData()
  const userIndex = data.users.findIndex((user: User) => user.id === id)
  if (userIndex !== -1) {
    const updatedUser = { id, name, email }
    data.users.splice(userIndex, 1)
    data.users.unshift(updatedUser)
    writeData(data)
    res.status(200).json({ message: `User ${id} updated`, id, name, email })
  } else {
    res.status(404).json({ message: 'User not found' })
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '2mb',
    },
  },
}
