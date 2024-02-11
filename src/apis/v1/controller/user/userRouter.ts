import { Router } from "express"
import {
  deleteUserByIdService,
  findUserService,
  getAllPostsFromUserService,
  getAllUsersService,
  getUserByIdService,
  insertPostService,
  insertUserService,
  updatePostService,
  updateUserService,
} from "./services";

const userRouter = Router()

userRouter.get('/', getAllUsersService)
userRouter.get('/search', findUserService)
userRouter.get('/:idUsuario', getUserByIdService)
userRouter.post('/', insertUserService)
userRouter.put('/:idUsuario', updateUserService)
userRouter.delete('/:idUsuario', deleteUserByIdService)

userRouter.get('/:idUsuario/posts', getAllPostsFromUserService)
userRouter.post('/:idUsuario/posts', insertPostService)
userRouter.put('/:idUsuario/posts/:postId', updatePostService)

export { userRouter }