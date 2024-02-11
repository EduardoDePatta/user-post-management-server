import { Router } from "express"
import { deletePostByIdService } from "./services"

const postRouter = Router()

postRouter.delete('/:postId', deletePostByIdService)

export { postRouter }