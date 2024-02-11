import { HTTP } from "../../../../../helpers/HttpRequest"
import { catchAsync } from "../../../../../helpers/catchAsync"
import {  deleteById } from "../../../infra"
import { validateMissingParam } from "../../../../../helpers/validators"
import { checkIfPostExistsUsecase } from "../usecase"

const deletePostByIdService = catchAsync(async (req: HTTP.Req<void, { postId: number }>) => {
  validateMissingParam(req.params, ['postId'])
  const { postId } = req.params

  await checkIfPostExistsUsecase(postId)

  const post = await deleteById('posts', postId)

  return {
    status: 200,
    message: 'Post successfully removed.',
    data: post
  }
})

export { deletePostByIdService }