import { Router } from "express"
import { getAllUsersService, insertUserService } from "./services";

const userRouter = Router()

userRouter.get('/', getAllUsersService)
userRouter.post('/', insertUserService)

export { userRouter }