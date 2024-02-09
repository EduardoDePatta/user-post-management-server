import db from "../../../db";
import { IUser } from "../controller/user/model/IUser";

// soh 2 tipos...no máximo add foreignKey... => 0..* para os posts.. aí só fazer um join. ver erros (instanceof) e a classe
async function searchUsers (
  searchTerm: string,
  page: number = 1,
  limit: number = 10,
  orderBy: string = 'id'
): Promise<{ dataSource: IUser[], total: number }> {
  try {
    const offset = (page - 1) * limit;
    const searchTermFormatted = `%${searchTerm}%`

    const dataQuery = `
      SELECT * FROM users 
      WHERE first_name LIKE $1 OR last_name LIKE $1 OR email LIKE $1
      ORDER BY ${orderBy} LIMIT $2 OFFSET $3
    `;
    const data = await db.manyOrNone(dataQuery, [searchTermFormatted, limit, offset])

    const totalQuery = `
      SELECT COUNT(*) FROM users 
      WHERE first_name LIKE $1 OR last_name LIKE $1 OR email LIKE $1
    `
    const totalResult = await db.one(totalQuery, [searchTermFormatted])
    const total = parseInt(totalResult.count, 10)

    return {
      dataSource: data as IUser[],
      total
    }
  } catch (error) {
    throw error
  }
}

export { searchUsers }