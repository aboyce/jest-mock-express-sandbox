// Domain Objects
import User from '../models/User'

const users = [
  new User({ id: '1', forename: 'James', surname: 'Smith' }),
  new User({ id: '2', forename: 'Sally', surname: 'Green' }),
  new User({ id: '3', forename: 'Greg', surname: 'Spent' }),
]

export const getCount = async (): Promise<number> => {
  return users.length
}

export const getAll = async (): Promise<User[]> => {
  return [...users]
}

export const getById = async (id: string): Promise<User> => {
  const user = users.find((user) => user.id === id)
  if (!user) throw new Error('User does not exist')
  return user
}
