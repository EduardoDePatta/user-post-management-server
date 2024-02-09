import { HttpException } from "../../../../../exceptions";
import { findByField } from "../../../infra";

type CheckDuplicatedUserUsecaseProps = {
  email: string
  login: string
}

const checkDuplicatedUserUsecase = async ({ email, login }: CheckDuplicatedUserUsecaseProps) => {
  const existingUserByEmail = await findByField('users', [{ fieldName: 'email', value: email }])
  const existingUserByLogin = await findByField('users', [{ fieldName: 'login', value: login }])
  
  let errorMessage = null

  if (existingUserByEmail.length > 0 && existingUserByLogin.length > 0) {
    errorMessage = 'User with the same email and login already exists.'
  } else if (existingUserByEmail.length > 0) {
    errorMessage = 'User with the same email already exists.'
  } else if (existingUserByLogin.length > 0) {
    errorMessage = 'User with the same login already exists.'
  }
  
  if (errorMessage) {
    console.log("🚀 ~ checkDuplicatedUserUsecase ~ errorMessage:", errorMessage)
    throw new HttpException(400, errorMessage);
  }
}

export { checkDuplicatedUserUsecase }
