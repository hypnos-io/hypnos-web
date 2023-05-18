import {ID} from './common'

export enum RolesEnum {
  EMPLOYEE = 0,
  SUPERVISOR = 1,
  LEADER = 2,
}

export interface User {
  _id?: ID
  registration: string
  name: string
  password: string
  role: RolesEnum
  imageURL: string
  createdAt?: Date
  updatedAt?: Date
}
