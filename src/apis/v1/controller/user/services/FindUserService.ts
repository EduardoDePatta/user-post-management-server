import { HTTP } from "../../../../../helpers/HttpRequest"
import { catchAsync } from "../../../../../helpers/catchAsync"
import { searchUsers } from "../../../infra"


const findUserService = catchAsync(async (req: HTTP.Req<any, any, { page: number, total: number, term: string }>) => {
console.log(req)
  const { page = 1, total = 10, term = '' } = req.query;
  
  const result = await searchUsers(term, page, total, 'id')

  return {
    status: 200,
    message: 'Users successfully fetched.',
    data: result
  };
});

export { findUserService }