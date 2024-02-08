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

async function updateInTable<T extends Tables>(
  tableName: T,  id: number,  data: Partial<Omit<TableMap[T], 'id'>>
): Promise<TableMap[T]> {
  try {
    const entries = Object.entries(data).filter(([_, value]) => value !== undefined)

    const setClause = entries.map(([key], index) => `"${key}" = $${index + 1}`).join(', ')
    const values = entries.map(([_, value]) => value)

    values.push(id)

    const query = `UPDATE ${tableName} SET ${setClause} WHERE id = $${values.length} RETURNING *;`

    const updatedRow = await db.one(query, values)
    return updatedRow as TableMap[T]
  } catch (error) {
    throw error
  }
}

async function findById<T extends Tables>(tableName: T, id: number): Promise<TableMap[T] | null> {
  try {
    const query = `SELECT * FROM ${tableName} WHERE id = $1`
    const row = await db.oneOrNone(query, [id])
    return row as TableMap[T] | null
  } catch (error) {
    throw error
  }
}

async function deleteById<T extends Tables>(
  tableName: T, 
  id: number | string
): Promise<IUser> {
  try {
    const query = `DELETE FROM ${tableName} WHERE id = $1 RETURNING *;`
    const deletedRow = await db.oneOrNone(query, [id])    
    return deletedRow
  } catch (error) {
    throw error
  }
}

export {
  findAll,
  insertIntoTable,
  updateInTable,
  findById,
  deleteById
}