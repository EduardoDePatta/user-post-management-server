import { HTTP } from "../../../../../helpers/HttpRequest"
import { catchAsync } from "../../../../../helpers/catchAsync"
import {  findById } from "../../../../../helpers/genericDao"
import { validateMissingParam } from "../../../../../helpers/validators"

const getUserByIdService = catchAsync(async (req: HTTP.Req<void, { idUsuario: number }>) => {
  validateMissingParam(req.params, ['idUsuario'])

  const { idUsuario } = req.params
  const users = await findById('users', idUsuario)

  return {
    status: 200,
    message: 'Successfully acquired user.',
    data: users
  }
})

export { getUserByIdService }