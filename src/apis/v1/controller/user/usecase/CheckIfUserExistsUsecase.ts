import { HttpException } from "../../../../../exceptions"
import { findById } from "../../../infra/genericDao"

const checkIfUserExistsUsecase = async(idUsuario: number) => {
  const user = await findById('users', idUsuario)
  if (!user) throw new HttpException(400, 'User not found.')
  return user
}
export { checkIfUserExistsUsecase }