import { HttpException } from "../../../../../exceptions"
import { findById } from "../../../infra/genericDao"

const checkIfPostExistsUsecase = async(postId: number) => {
  const post = await findById('posts', postId)
  if (!post) throw new HttpException(400, 'Post not found.')
  return post
}
export { checkIfPostExistsUsecase }