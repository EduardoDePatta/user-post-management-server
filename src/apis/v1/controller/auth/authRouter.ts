import { Router } from "express";
import { login } from "./services";

const authRouter = Router()

authRouter.post('/login', login)

export { authRouter }