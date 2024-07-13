import { User } from '@/types'
import { readData, writeData } from '@/utils'
import { NextApiRequest, NextApiResponse } from 'next'
import { v4 as uuidv4 } from 'uuid'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req
  const data = readData()

  switch (method) {
    case 'GET':
      const { id } = req.query

      if (id) {
        // 특정 사용자 조회
        const user = data.users.find((user: any) => user.id === id)
        if (user) {
          res.status(200).json(user)
        } else {
          res.status(404).json({ message: 'User not found' })
        }
      } else {
        // 모든 사용자 조회
        res.status(200).json(data.users)
      }
      break

    case 'POST':
      try {
        const { name, email } = req.body
        const newUser: User = {
          id: uuidv4(),
          name,
          email
        }
        data.users.push(newUser)
        writeData(data)

        res.status(201).json(newUser)
      } catch (error) {
        console.error('Failed to save the user:', error)
        res.status(500).json({ message: 'Failed to save the user' })
      }
      break

    case 'PUT':
      try {
        const { id, name, email } = req.body
        const userIndex = data.users.findIndex((user: any) => user.id === id)
        if (userIndex !== -1) {
          data.users[userIndex] = { id, name, email }
          writeData(data)
          res.status(200).json(data.users[userIndex])
        } else {
          res.status(404).json({ message: 'User not found' })
        }
      } catch (error) {
        console.error('Failed to update the user:', error)
        res.status(500).json({ message: 'Failed to update the user' })
      }
      break

    case 'DELETE':
      try {
        const { id } = req.query
        const userIndex = data.users.findIndex((user: any) => user.id === id)
        if (userIndex !== -1) {
          const deletedUser = data.users.splice(userIndex, 1)
          writeData(data)
          res.status(200).json(deletedUser[0])
        } else {
          res.status(404).json({ message: 'User not found' })
        }
      } catch (error) {
        console.error('Failed to delete the user:', error)
        res.status(500).json({ message: 'Failed to delete the user' })
      }
      break

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '2mb'
    }
  }
}
