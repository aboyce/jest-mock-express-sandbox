export enum Grade {
  'A01' = 'A01',
  'B02' = 'B02',
  'C03' = 'C03',
  'D04' = 'D04',
  'E05' = 'E05',
}

export class Job {
  id: string | null
  title: string
  grade: Grade

  constructor(provided: Partial<Job> = {}) {
    this.id = provided.id || null
    this.title = provided.title || ''
    this.grade = provided.grade || Grade.A01
  }
}

export default Job
