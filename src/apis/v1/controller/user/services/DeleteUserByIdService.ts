import { HTTP } from "../../../../../helpers/HttpRequest"
import { catchAsync } from "../../../../../helpers/catchAsync"
import {  deleteById } from "../../../infra"
import { validateMissingParam } from "../../../../../helpers/validators"
import { checkIfUserExistsUsecase } from "../usecase"

const deleteUserByIdService = catchAsync(async (req: HTTP.Req<void, { idUsuario: number }>) => {
  validateMissingParam(req.params, ['idUsuario'])
  const { idUsuario } = req.params

  await checkIfUserExistsUsecase(idUsuario)

  const users = await deleteById('users', idUsuario)

  return {
    status: 200,
    message: 'User successfully removed.',
    data: users
  }
})

export { deleteUserByIdService }