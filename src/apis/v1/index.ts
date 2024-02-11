import { Router } from "express";
import { userRouter } from "./controller/user/userRouter";
import { postRouter } from "./controller/post/userRouter";
import { authRouter } from "./controller/auth/authRouter";
import { verifyToken } from "../../middlewares";

const routerV1 = Router()

routerV1.use('/users', verifyToken, userRouter)
routerV1.use('/posts', verifyToken, postRouter)
routerV1.use('/auth', authRouter)

export { routerV1 }