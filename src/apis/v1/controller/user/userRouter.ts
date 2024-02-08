import { Router } from "express"
import { deleteUserByIdService, getAllUsersService, getUserByIdService, insertUserService, updateUserService } from "./services";

const userRouter = Router()

userRouter.get('/', getAllUsersService)
userRouter.get('/:idUsuario', getUserByIdService)
userRouter.post('/', insertUserService)
userRouter.put('/:idUsuario', updateUserService)
userRouter.delete('/:idUsuario', deleteUserByIdService)

export { userRouter }