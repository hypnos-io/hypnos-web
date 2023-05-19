import {ID} from './common'

export enum RolesEnum {
  EMPLOYEE = 0,
  SUPERVISOR = 1,
  LEADER = 2,
  ADMIN = 3,
}

export interface User {
  _id?: ID
  registration: string
  name: string
  password: string
  imageURL?: string
  role: RolesEnum
  createdAt?: Date
  updatedAt?: Date
}
