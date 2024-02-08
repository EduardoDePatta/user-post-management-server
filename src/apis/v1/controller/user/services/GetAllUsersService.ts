import { catchAsync } from "../../../../../helpers/catchAsync"
import { findAll } from "../../../../../helpers/genericDao"

const getAllUsersService = catchAsync(async () => {
  const users = await findAll('users')

  return {
    status: 200,
    message: 'Successfully acquired users.',
    data: users
  }
})

export { getAllUsersService }