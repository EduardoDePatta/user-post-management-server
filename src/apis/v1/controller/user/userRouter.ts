import { NextFunction, Request, Response, Router } from "express";
import { findAll, insertIntoTable } from "../../../../helpers/genericDao";
import asyncHandler from "../../../../helpers/asyncHandler";
import { IUser } from "./interfaces/IUser";

const userRouter = Router()

const getAllUsers = asyncHandler<IUser>(async (req: Request, res: Response, next: NextFunction) => {
  const users = await findAll('users')
  console.log("🚀 ~ getAllUsers ~ users:", users)
  return {
    message: 'a',
    status: 200
  }
})

const insertUser = asyncHandler<IUser>(async (req: Request, res: Response, next: NextFunction) => {
  const bla = await insertIntoTable('users', { email: 'bla', first_name: 'a', last_name: 'b', login: 'adas', password: '8ASD9ADYA9Y' })
  console.log("🚀 ~ insertUser ~ bla:", bla)
  return {
    message: '20',
    status: 200 
  }
})

userRouter.get('/', getAllUsers)
userRouter.post('/', insertUser)

export { userRouter }