import { HTTP } from "../../../../../helpers/HttpRequest"
import { catchAsync } from "../../../../../helpers/catchAsync"
import { updateInTable } from "../../../infra"
import { validateMissingParam } from "../../../../../helpers/validators"
import { IUser } from "../model/IUser"
import { checkIfUserExistsUsecase } from "../usecase"

const updateUserService = catchAsync<IUser>(async (req: HTTP.Req<Omit<IUser, 'id'>, { idUsuario: number }>) => {
  validateMissingParam(req.params, ['idUsuario'])
  const { email, first_name, last_name, login, password } = req.body
  const { idUsuario } = req.params

  await checkIfUserExistsUsecase(idUsuario)

  const updatedUser = await updateInTable('users', idUsuario, { email, first_name, last_name, login, password })
  
  return {
    status: 201,
    message: 'User successfully created.',
    data: updatedUser
  }
})
export { updateUserService }