import { Request, Response } from "express"
import { ParamsDictionary, Query } from 'express-serve-static-core'

export namespace HTTP {
  export interface Req<B = any, P = ParamsDictionary, Q = Query> extends Request<P, any, B, Q> {
    body: B
    params: P
    query: Q
  }
  export interface Res<T = any> extends Response {
    data?: T
    error?: string
    message?: string
  }
}
