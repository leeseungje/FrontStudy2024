import { User } from '@/types'
import fs from 'fs'
import path from 'path'

export const readData = () => {
  const filePath = path.join(process.cwd(), 'public', 'users.json')
  const fileContents = fs.readFileSync(filePath, 'utf8')
  return JSON.parse(fileContents)
}

export const writeData = (data: { users: User[] }) => {
  const filePath = path.join(process.cwd(), 'public', 'users.json')
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
}
