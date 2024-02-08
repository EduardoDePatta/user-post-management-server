import { HTTP } from "../../../../../helpers/HttpRequest"
import { catchAsync } from "../../../../../helpers/catchAsync"
import { insertIntoTable } from "../../../../../helpers/genericDao"
import { validateMissingParam } from "../../../../../helpers/validators"
import { IUser } from "../model/IUser"

const insertUserService = catchAsync<IUser>(async (req: HTTP.Req<Omit<IUser, 'id'>>) => {
  validateMissingParam(req.body, ['email', 'first_name', 'last_name', 'login', 'password'])
  const { email, first_name, last_name, login, password } = req.body

  const user = await insertIntoTable('users', { email, first_name, last_name, login, password })

  return {
    status: 201,
    message: 'User successfully created.',
    data: user
  }
})
export { insertUserService }