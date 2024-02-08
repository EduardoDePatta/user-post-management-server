import { Router } from "express";
import { userRouter } from "./controller/user/userRouter";

const routerV1 = Router()

routerV1.use('/user', userRouter)

export { routerV1 }