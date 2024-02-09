import { HTTP } from "../../../../../helpers/HttpRequest"
import { catchAsync } from "../../../../../helpers/catchAsync"
import { searchUsers } from "../../../../../helpers/genericDao"


const findUserService = catchAsync(async (req: HTTP.Req<void, void, { page: number, total: number, term: string }>) => {
  const { page = 1, total = 10, term = '' } = req.query;
  
  const result = await searchUsers(term, page, total, 'id')

  return {
    status: 200,
    message: 'Users successfully fetched.',
    data: result
  };
});

export { findUserService }