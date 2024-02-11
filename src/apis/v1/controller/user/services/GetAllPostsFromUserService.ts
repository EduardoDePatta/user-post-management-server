import { HTTP } from "../../../../../helpers/HttpRequest";
import { catchAsync } from "../../../../../helpers/catchAsync";
import { validateMissingParam } from "../../../../../helpers/validators";
import { findAll, findByField } from "../../../infra";
import { IPost } from "../../post/model/IPost";
import { checkIfUserExistsUsecase } from "../usecase";
import { format } from 'date-fns'

const formatDates = (posts: IPost[]): IPost[] => {
  return posts.map(post => ({
    ...post,
    created_at: format(new Date(post.created_at), 'dd/MM/yyyy')
  }))
}

const getAllPostsFromUserService = catchAsync(async (req: HTTP.Req<void, { idUsuario: number }, { page: number, total: number }>) => {
  validateMissingParam(req.params, ['idUsuario'])

  const { idUsuario } = req.params
  
  const {first_name} = await checkIfUserExistsUsecase(idUsuario)

  const { page = 0, total = 10 } = req.query

  const postsFromUser = await findByField('posts',[{ fieldName: 'user_id', value: idUsuario}], undefined, { page, pageSize: total })
  const postsWithFormattedDates = formatDates(postsFromUser.dataSource)

  return {
    status: 200,
    message: `Posts from user ${first_name} successfully acquired.`,
    data: {
      dataSource: postsWithFormattedDates,
      total: postsFromUser.total
    }
  }

})

export { getAllPostsFromUserService }