import { Router } from "express"
import { getAllUsersService, getUserByIdService, insertUserService } from "./services";

const userRouter = Router()

userRouter.get('/', getAllUsersService)
userRouter.get('/:idUsuario', getUserByIdService)
userRouter.post('/', insertUserService)

export { userRouter }