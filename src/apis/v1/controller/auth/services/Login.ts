import { HttpException } from "../../../../../exceptions";
import { HTTP } from "../../../../../helpers/HttpRequest";
import { catchAsync } from "../../../../../helpers/catchAsync";
import { findByField } from "../../../infra";
import bcrypt from 'bcrypt'
import { AuthHelper } from "../helpers/AuthHelper";

const login = catchAsync(async (req: HTTP.Req<{ login: string, password: string }>) => {
  const { login, password } = req.body
  const response = await findByField('users', [{ fieldName: 'login', value: login }])
  if (response.dataSource.length === 0) throw new HttpException(403, 'User not found.')
  if (response.dataSource.length > 1) throw new HttpException(500, 'Something was wrong. Contact adm.')

  const validPassword = await bcrypt.compare(password, response.dataSource[0].password)
  const user = response.dataSource[0]
  if (!validPassword) throw new HttpException(403, 'Invalid password.')

  const token = AuthHelper.generateJwtToken(user)
  return {
    status: 200,
    message: 'Login successful',
    data: { token }
  }
})


export { login }