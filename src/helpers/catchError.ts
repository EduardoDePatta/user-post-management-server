// REMOVERRRRRRRRRRRRR
interface CustomError extends Error {
  code?: string
}

// CONFERIR mais codigos? lib erros sql? pgp pg pg-primise nao por default --ver
const errorMap: Record<string, string> = {
  '42P01': 'Table not found.',
  '42P18': 'Duplicate key violates unique constraint',
  '23502': 'Column cannot be null.',
  '23505': 'Unique constraint violation.'
}

// procurar onde ifs => maps
const catchSQLError = (error: any): string => {
  let errorMessage = error.message

  const sqlError = error as CustomError
  const errorCode = sqlError.code
  if (errorCode && errorMap[errorCode]) {
    errorMessage = errorMap[errorCode]
  }
  return errorMessage
}

export { catchSQLError }
