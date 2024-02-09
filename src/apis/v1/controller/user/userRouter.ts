import { Router } from "express"
import { deleteUserByIdService, getAllUsersService, getUserByIdService, insertUserService, updateUserService } from "./services";
import { findUserService } from "./services/FindUserService";

const userRouter = Router()

userRouter.get('/', getAllUsersService)
userRouter.get('/search', findUserService)
userRouter.get('/:idUsuario', getUserByIdService)
userRouter.post('/', insertUserService)
userRouter.put('/:idUsuario', updateUserService)
userRouter.delete('/:idUsuario', deleteUserByIdService)

export { userRouter }