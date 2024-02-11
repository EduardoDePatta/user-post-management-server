import { HTTP } from "../../../../../helpers/HttpRequest";
import { catchAsync } from "../../../../../helpers/catchAsync";
import { validateMissingParam } from "../../../../../helpers/validators";
import { insertIntoTable } from "../../../infra";
import { IPost } from "../../post/model/IPost";
import { checkIfUserExistsUsecase } from "../usecase";

const insertPostService = catchAsync(async (req: HTTP.Req<Omit<IPost, 'id' | 'created_at' | 'user_id'>, { idUsuario: number }>) => {
  validateMissingParam(req.params, ['idUsuario'])
  const { idUsuario } = req.params  
  await checkIfUserExistsUsecase(idUsuario)

  validateMissingParam(req.body, ['title', 'private', 'content'])
  const {
    content,
    private: privatePost,
    title
   } = req.body

  const newPost = await insertIntoTable('posts', {
    content,
    private: privatePost,
    title,
    user_id: idUsuario
  })

  return {
    status: 201,
    message: 'Post successfully created.',
    data: newPost
  }

})

export { insertPostService }