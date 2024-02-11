import { HTTP } from "../../../../../helpers/HttpRequest"
import { catchAsync } from "../../../../../helpers/catchAsync"
import { insertIntoTable } from "../../../infra"
import { validateMissingParam } from "../../../../../helpers/validators"
import { IUser } from "../model/IUser"
import { checkDuplicatedUserUsecase } from "../usecase"
import { AuthHelper } from "../../auth/helpers/AuthHelper"

const insertUserService = catchAsync<IUser>(
  async (req: HTTP.Req<Omit<IUser, 'id'>>) => {
    validateMissingParam(req.body, ['email', 'first_name', 'last_name', 'login', 'password'])
    const { email, first_name, last_name, login, password } = req.body

    await checkDuplicatedUserUsecase({ email, login })

    const hashedPassword = await AuthHelper.hashPassword(password)

    const user = await insertIntoTable("users", {
      email,
      first_name,
      last_name,
      login,
      password: hashedPassword,
    })

    return {
      status: 201,
      message: "User successfully created.",
      data: user,
    }
  }
)
export { insertUserService }
