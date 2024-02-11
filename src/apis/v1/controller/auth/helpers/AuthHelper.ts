import environments from "../../../../../environments";
import { IUser } from "../../user/model/IUser";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export namespace AuthHelper {
  export const generateJwtToken = (user: IUser) => {
    return jwt.sign({ id: user.id, login: user.login }, environments.APP_SECRET, { expiresIn: '24h' })
  }

  export const hashPassword = async (password: string) => {
    const saltRounds = 10
    return await bcrypt.hash(password, saltRounds)
  }
}