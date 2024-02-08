import { IPost } from "../apis/v1/controller/post/interfaces/IPost";
import { IUser } from "../apis/v1/controller/user/interfaces/IUser";
import pool from "../db";

type Tables = 'users' | 'posts'

interface TableMap {
  users: IUser
  posts: IPost
}

async function findAll(tableName: Tables, config?: string) {
  try {
    const { rows: users } = await pool.query(`select * from ${tableName} ${config}`)
    return users
  } catch (error) {
    throw error
  }
}

async function insertIntoTable<T extends Tables>(tableName: T, data:  Partial<TableMap[T]>): Promise<void> {
  try {
    const fields = Object.keys(data).map(field => `"${field}"`).join(', ')
    const values = Object.values(data).map(value => {
      if (typeof value === 'string') {
        return `'${value.replace(/'/g, "''")}'`
      }
      return value;
    });

    const valuePlaceholders = values.map((_, index) => `$${index + 1}`).join(', ')

    const query = `INSERT INTO ${tableName} (${fields}) VALUES (${valuePlaceholders}) RETURNING *;`

    const { rows } = await pool.query(query, values)
    console.log(rows)
  } catch (error) {
    throw error
  }
}

export {
  findAll,
  insertIntoTable
}