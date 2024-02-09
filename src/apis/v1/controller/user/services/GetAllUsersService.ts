import { HTTP } from "../../../../../helpers/HttpRequest"
import { catchAsync } from "../../../../../helpers/catchAsync"
import { findAll } from "../../../../../helpers/genericDao"

const getAllUsersService = catchAsync(async (req: HTTP.Req<void, void, { page: number, total: number }>) => {
  const { page = 0, total = 10 } = req.query
  const users = await findAll('users', page, total, 'id')

  return {
    status: 200,
    message: 'Successfully acquired users.',
    data: users
  }
})

export { getAllUsersService }