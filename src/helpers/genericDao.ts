import { IPost } from "../apis/v1/controller/post/interfaces/IPost";
import { IUser } from "../apis/v1/controller/user/model/IUser";
import db from "../db";

type Tables = 'users' | 'posts'

interface TableMap {
  users: IUser
  posts: IPost
}

async function findAll<T extends Tables>(tableName: T, config: string = ''): Promise<TableMap[T]> {
  try {
    const result = await db.manyOrNone(`SELECT * FROM ${tableName} ${config}`)
    return result as unknown as TableMap[T]
  } catch (error) {
    throw error
  }
}

async function insertIntoTable<T extends Tables>(tableName: T, data: Omit<Partial<TableMap[T]>, 'id'>): Promise<TableMap[T]> {
  try {
    const fields = Object.keys(data).map(field => `"${field}"`).join(', ')
    const placeholders = Object.keys(data).map((_, index) => `$${index + 1}`).join(', ')
    const values = Object.values(data)

    const query = `INSERT INTO ${tableName} (${fields}) VALUES (${placeholders}) RETURNING *;`

    const insertedRow = await db.one(query, values)
    return insertedRow
  } catch (error) {
    throw error
  }
}

export {
  findAll,
  insertIntoTable
}