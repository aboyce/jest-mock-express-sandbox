// Domain Objects
import Job, { Grade } from '../models/Job'

const jobs = [
  new Job({ id: '1', title: 'job title one', grade: Grade.A01 }),
  new Job({ id: '2', title: 'job title two', grade: Grade.B02 }),
  new Job({ id: '3', title: 'job title three', grade: Grade.C03 }),
  new Job({ id: '4', title: 'job title four', grade: Grade.D04 }),
  new Job({ id: '5', title: 'job title five', grade: Grade.E05 }),
]

export const getCount = async (): Promise<number> => {
  return jobs.length
}

export const getAll = async (): Promise<Job[]> => {
  return [...jobs]
}

export const getById = async (id: string): Promise<Job> => {
  const job = jobs.find((job) => job.id === id)
  if (!job) throw new Error('Job does not exist')
  return job
}
