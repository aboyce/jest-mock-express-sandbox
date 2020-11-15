export class User {
  id: string | null
  forename: string
  surname: string
  email: string

  constructor(provided: Partial<User> = {}) {
    this.id = provided.id || null
    this.forename = provided.forename || ''
    this.surname = provided.surname || ''
    this.email = provided.email || ''
  }
}

export default User
