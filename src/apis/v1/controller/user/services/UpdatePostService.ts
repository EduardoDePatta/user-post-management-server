import { HTTP } from "../../../../../helpers/HttpRequest"
import { catchAsync } from "../../../../../helpers/catchAsync"
import { updateInTable } from "../../../infra"
import { validateMissingParam } from "../../../../../helpers/validators"
import { checkIfUserExistsUsecase } from "../usecase"
import { IPost } from "../../post/model/IPost"
import { checkIfPostExistsUsecase } from "../../post/usecase"

const updatePostService = catchAsync(async (req: HTTP.Req<Omit<IPost, 'id' | 'created_at' | 'user_id'>, { idUsuario: number, postId: number }>) => {
  validateMissingParam(req.params, ['idUsuario', 'postId'])
  const { idUsuario, postId } = req.params

  await checkIfUserExistsUsecase(idUsuario)
  await checkIfPostExistsUsecase(postId)

  const { content, private: privatePost, title } = req.body

  const udpatedPost = await updateInTable('posts', postId, { content, private: privatePost, title })
  
  return {
    status: 201,
    message: 'Post successfully updated.',
    data: udpatedPost
  }
})
export { updatePostService }