import { HTTP } from "../../../../../helpers/HttpRequest"
import { catchAsync } from "../../../../../helpers/catchAsync"
import { findByField, insertIntoTable } from "../../../infra"
import { validateMissingParam } from "../../../../../helpers/validators"
import { IUser } from "../model/IUser"
import { HttpException } from "../../../../../exceptions"
import { checkDuplicatedUserUsecase } from "../usecase"

const insertUserService = catchAsync<IUser>(
  async (req: HTTP.Req<Omit<IUser, 'id'>>) => {
    validateMissingParam(req.body, ['email', 'first_name', 'last_name', 'login', 'password'])
    const { email, first_name, last_name, login, password } = req.body

    await checkDuplicatedUserUsecase({ email, login })

    const user = await insertIntoTable("users", {
      email,
      first_name,
      last_name,
      login,
      password,
    })

    return {
      status: 201,
      message: "User successfully created.",
      data: user,
    }
  }
)
export { insertUserService }
